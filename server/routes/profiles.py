from flask import Blueprint, jsonify, request, make_response, g, session
from authlib.integrations.flask_client import OAuth
# from db import Users
from helpers.bcrypt import hash_password_bcrypt, check_password_bcrypt
from helpers.jwt import valid_jwt, encode_jwt



profiles_bp = Blueprint('profiles', __name__, url_prefix='/profiles')

#sign up
@profiles_bp.route('/', methods=['POST'])
def signup():
    data = request.json
    
    try:
        password = data.get("password")
        print(password)
        if not (password == data.get("confirmpassword")): return jsonify({"message": "Passwords must match"}), 400
        if len(password) < 8 : return jsonify({"message": "Password must be at least 8 characters"}), 400
        hashed_pass = hash_password_bcrypt(password)
        
        Users.insert_one({
            "email":data.get("email"),
            "password":hashed_pass,
            "tokens":0,
            "limit_tokens":20000,
            "stripe_customer_id": None
        })
        return jsonify({"message": f"User signed up successfully"}), 201
    except Exception as e:
        return jsonify({"message": f"Unexpected error has occured {e}"}), 500

@profiles_bp.route('/', methods=['PUT'])
def login():
    data = request.json
    try:
        User = Users.find_one({
            "email":data.get("email"),
        })
        User = User["data"]['document']
        print(User)
        if not (check_password_bcrypt(data.get("password"),User["password"])):
            return jsonify({"message": "Incorrect password"}), 401
        access_token = encode_jwt(User)
        response = make_response(jsonify({'message': 'Login successful'}), 200)
        response.set_cookie('access_token', access_token, httponly=True)
        return response
    except Exception as e:
        return jsonify({"message": f"Unexpected error has occured {e}"}), 500


@profiles_bp.route('/', methods=['DELETE'])
@valid_jwt
def logout():
    try:
        response = make_response(jsonify({'message': 'Logout successful'}), 200)
        response.set_cookie('access_token', "", httponly=True)
    except Exception as e:
        return jsonify({"message": f"Unexpected error has occured {e}"}), 500
    
@profiles_bp.route('/user', methods=['GET'])
@valid_jwt
def user():
    try:
        return jsonify(g.User), 200
    except Exception as e:
        return jsonify({"message": f"Unexpected error has occured {e}"}), 500

