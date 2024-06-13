from flask import Blueprint, jsonify, request, make_response, g, session
from models.profile import Profile
import os

import stripe
stripe.api_key = os.environ.get("STRIPE_API_KEY")
endpoint_secret = os.environ.get("STRIPE_ENDPOINT_SECRET")
print(endpoint_secret)
webhooks_bp = Blueprint('webhooks', __name__, url_prefix='/webhooks')

@webhooks_bp.route("/stripe", methods=["POST"])
def stripe_webhook():
    # print("Webhook in")
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')
    

    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        return 'Invalid payload', 400
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return 'Invalid signature', 400

    # Handle the event
    if event['type'] == 'checkout.session.completed':
        # print("Invoice sucecceed")
        checkout = event['data']['object']
        line_items = stripe.checkout.Session.list_line_items(checkout["id"])
        customer_id = checkout["customer"]
        metadata = checkout["metadata"]
        print(customer_id)
        print(metadata)
        user = None
        
       
        user = Profile.objects(id=metadata["profile_id"]).first()
        if user:
            price_id = line_items['data'][0]["price"]["id"]
            user.stripe_customer_id = customer_id
            # testing
            if price_id == 'price_1PJQ3ZBNnyjrtwsjTdRejVGz':  # Replace with your price ID
                user.tokens = 0
                user.limit_tokens = 100000  # Add 100000 credits for this price ID
                user.subscribed = True
            user.save()
        # Handle successful payment (e.g., update subscription status in your database)
    if event["type"] == 'invoice.payment_succeeded':
        invoice = event['data']['object']
        customer_id = invoice["customer"]
        user = Profile.objects(stripe_customer_id=customer_id).first()
        if user and user.subscribed:
            price_id = invoice['lines']['data'][0]["price"]["id"]
            # testing
            if price_id == "price_1PJQ3ZBNnyjrtwsjTdRejVGz":
                user.tokens = 0
                user.save()

    if event["type"] == "customer.subscription.deleted":
        subscription = event['data']['object']
        subscription = stripe.Subscription.retrieve(subscription.id)
        user = Profile.objects(stripe_customer_id=subscription["customer"]).first()
        if user:
            user.subscribed = False
            user.limit_tokens = 10000
            user.tokens = 0
            user.save()

        

    # Return a 200 response to acknowledge receipt of the event
    return jsonify(success=True)