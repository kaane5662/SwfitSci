from flask import Flask, jsonify, request, make_response, session, url_for, redirect
from flask_cors import CORS
from routes.profiles import profiles_bp
from routes.papers import papers_bp
from routes.webhooks import webhooks_bp
from authlib.integrations.flask_client import OAuth
import os
from connections.mongoconnect import connect_mongo
from helpers.profiles import get_profile, create_profile, profile_exists
from helpers.session import valid_session
from models.profile import Profile
import stripe
from helpers.plans import plans
stripe.api_key = os.environ.get("STRIPE_API_KEY")
# connect_mongo()

app = Flask(__name__)
app.register_blueprint(profiles_bp)
app.register_blueprint(papers_bp)
app.register_blueprint(webhooks_bp)
app.secret_key = os.environ.get("SERVER_SECRET")

app.config.update(
    SESSION_COOKIE_SECURE=False,  # Set to True if using HTTPS
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE='Lax'  # Adjust based on your needs
)

# app.json_encoder = CustomJSONEncoder


oauth = OAuth(app)
oauth.register(
    name='google',
    client_id= os.environ.get("GOOGLE_CLIENT_ID"),
    client_secret=os.environ.get("GOOGLE_CLIENT_SECRET"),
    # authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    # access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    refresh_token_url=None,
    redirect_uri='${process.env.SERVER_DOMAIN}/auth/google',
    client_kwargs={'scope': 'openid profile email'},
    # api_base_url="https://www.googleapis.com/oauth2/v1/",
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
)

CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

@app.route('/login/<provider>')
def oauth_login(provider):
    redirect_uri = url_for('authorize', provider=provider, _external=True)
    return oauth.create_client(provider).authorize_redirect(redirect_uri)

@app.route('/auth/<provider>')
def authorize(provider):
    print(provider)
    client = oauth.create_client(provider)
    token = client.authorize_access_token() 
    user_info = token.get("userinfo")
    print(user_info["email"])
    does_profile_exist = profile_exists(user_info["email"])
    print(does_profile_exist)
    if(does_profile_exist):
        get_profile(user_info["email"], "test123589")
    else:
        create_profile(user_info["email"],"test123589","test123589",True)
    # session["user"] = user_info
    return redirect("http://localhost:3000/papers")
    # return jsonify({"message":"Authorization success!"}), 201
    # user = client.parse_id_token(token,claims_options={
    #             'iss': {'values': ['https://accounts.google.com']}
    #         }) if provider == 'google' else client.get('me?fields=id,name,email').json()
    # print(user)
    # session['user'] = user

@app.route('/auth/user', methods=["GET"])
@valid_session
def user():
    user = Profile.objects(id=session["user"]["id"]).first()
    user = user.to_mongo().to_dict()
    user["_id"] = str(user["_id"])
    return jsonify(user),200

@app.route('/logout', methods=["DELETE"])
@valid_session
def logout():
    print("Logging out")
    session.clear()
    # redirect("http://localhost:3000/login")   
    return jsonify({"message":"Logged out successfully"}),200

@app.route('/subscribe/<string:plan>', methods=["GET"])
@valid_session
def subscribe(plan):
    try:
        print(plan)
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': plans[plan],  # Replace with your price ID
                'quantity': 1,
            }],
            client_reference_id=session["user"]["id"],
            mode='subscription',
            success_url=f'{os.environ.get("CLIENT_DOMAIN")}/generate',
            cancel_url=f'{os.environ.get("CLIENT_DOMAIN")}/generate',
            metadata={
                "profile_id": session["user"]["id"]
            }
        )
        # print(checkout_session["customer"])
        return jsonify({"url": checkout_session.url}), 201
        # return jsonify({"message": "Plan not found"}), 404
    except Exception as e:
        print(e)
        return jsonify({"message": "Unexpected error has occured {e}"}), 500

@app.route('/billing-portal', methods=["GET"])
@valid_session
def billing_portal():
    user = Profile.objects(id=session["user"]["id"]).first()
    try:
        if not user.stripe_customer_id: return jsonify({"message": "Customer id not found"}), 400
        customer_portal = stripe.billing_portal.Session.create(
            customer=user.stripe_customer_id,
            return_url=f'{os.environ.get("CLIENT_DOMAIN")}/settings',
        )
        # print(checkout_session["customer"])
        return jsonify({"url": customer_portal.url}), 201
        # return jsonify({"message": "Plan not found"}), 404
    except Exception as e:
        print(e)
        return jsonify({"message": "Unexpected error has occured {e}"}), 500


if __name__ == '__main__':
    app.run(debug=True)