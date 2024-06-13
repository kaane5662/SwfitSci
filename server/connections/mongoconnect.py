from mongoengine import connect
import os

mongodb_uri = os.environ.get("MONGO_DB_URI")

def connect_mongo():
    try:
        connect(host=mongodb_uri)
        print("Connected successfully")
    except Exception as e:
        print(f"Error occured connecting to MongoDB")