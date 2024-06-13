from mongoengine import Document, StringField,IntField,DecimalField, BooleanField

class Paper(Document):
    owner_id = StringField(required=True)
    title = StringField(required=True)
    background = StringField(required=True)
    research_question = StringField(required=True)
    data_collection = StringField(required=True)
    findings = StringField(required=True)
    variables = StringField(required=True)
    type = StringField(required=True)
    # experimental stuff
    blindness = StringField(required=False)
    control_groups = StringField(required=False)
    participants = StringField(required=False)
    sampling_method = StringField(required=False)
    
    
    
    introduction = StringField(required=True)
    methodology = StringField(required=True)
    # analysis = StringField(required=True)
    results = StringField(required=True)
    discussion = StringField(required=True)
    conclusion = StringField(required=True)
    references = StringField( default="")
