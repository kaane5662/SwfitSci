from flask import jsonify,session
from helpers.bcrypt import hash_password_bcrypt, check_password_bcrypt
from models.profile import Profile
from connections.mongoconnect import connect_mongo
import os

connect_mongo()

def create_profile(email, password, confirmpassword,verified):
    if password != confirmpassword: return jsonify({"message": "Passwords must match"}), 400
    if len(password) < 8 : return jsonify({"message": "Password must be at least 8 characters"}), 400
    hashed_pass = hash_password_bcrypt(password)
    new_profile = Profile(
        email=email,
        password=hashed_pass,
        verified=verified
    )
    saved_profile = new_profile.save()
    user_data = {
            'id': str(saved_profile.id),
            'email': saved_profile.email,
    }
    print(user_data)
    session["user"] = user_data
    return jsonify({"message": "Account created successfully"}), 201

def get_profile(email, password):
    profile = Profile.objects(email=email).first()
    if not (check_password_bcrypt(password,profile.password)):return jsonify({"message": "Incorrect password"}), 401
    user_data = {
            'id': str(profile.id),
            'email': profile.email,
            'tokens': profile.tokens
    }
    session["user"] = user_data
    return jsonify({"message": "Account logged in successfully"}), 201

def profile_exists(email):
    profile = Profile.objects(email=email).first()
    print(profile)
    return True if profile else False