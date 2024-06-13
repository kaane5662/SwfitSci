# from jwt import JWT, jwt
from flask import request, jsonify, g
import os
import jwt
from datetime import datetime, timedelta
from functools import wraps


def encode_jwt(User):
    expiration_time = datetime.utcnow() + timedelta(minutes=300)
    payload = {
        'exp': expiration_time,
        'User': User
    }

    token = jwt.encode(payload,os.environ.get("JWT_SECRET"), algorithm='HS256')
    return token

def valid_jwt(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Access request cookies
        
        try:
        # Decode JWT token with secret key
            token = request.cookies.get("access_token")
            print(token)
            if(token == None): return jsonify({"message":"Token required"}), 401
            decoded_token = jwt.decode(token, os.environ.get("JWT_SECRET"), algorithms=["HS256"])
            print("Decode success")
            g.User = decoded_token["User"]
            # Execute code before request
            print("Before Request")
            # Execute code after request
            print("After Request")
            
            return func(*args, **kwargs)
        except Exception as e:
            return jsonify( {"message":f"Error processing token {e}"}), 403
        

        
    return wrapper