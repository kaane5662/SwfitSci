from mongoengine import Document, StringField,IntField,DecimalField, BooleanField

class Profile(Document):
    email = StringField(required=True,unique=True)
    password = StringField(required=True,unique=True)
    tokens = IntField(default=0)
    stripe_customer_id = StringField(default=None)
    verified = BooleanField(default=False)
    limit_tokens = IntField(default=10000)
    subscribed = BooleanField(default=False)
    
