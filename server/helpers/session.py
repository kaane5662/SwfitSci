from flask import request, jsonify, session
import os
import jwt
from datetime import datetime, timedelta
from functools import wraps

def valid_session(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Access request cookies
        # print(session["user"])

        if session and  ('id' in session["user"]):
            return func(*args, **kwargs)
        else:
            return jsonify( {"message":"Unauthorized session"}), 403
    return wrapper
        # try:
        # # Decode JWT token with secret key
        #     token = request.cookies.get("access_token")
        #     print(token)
        #     if(token == None): return jsonify({"message":"Token required"}), 401
        #     decoded_token = jwt.decode(token, os.environ.get("JWT_SECRET"), algorithms=["HS256"])
        #     print("Decode success")
        #     g.User = decoded_token["User"]
        #     # Execute code before request
        #     print("Before Request")
        #     # Execute code after request
        #     print("After Request")
            
        #     return func(*args, **kwargs)
        # except Exception as e:
        #     return jsonify( {"message":f"Error processing token {e}"}), 403