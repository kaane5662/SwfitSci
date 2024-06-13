import json
from bson import ObjectId

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            # Convert ObjectId to string
            return str(obj)
        if isinstance(obj, dict):
            # Recursively handle dictionaries
            return {key: self.default(value) for key, value in obj.items()}
        if isinstance(obj, list):
            # Recursively handle lists
            return [self.default(element) for element in obj]
        # For other types, use the default JSON encoder behavior
        return super().default(obj)