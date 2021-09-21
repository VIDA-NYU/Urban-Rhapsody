import json

class ProjectionEncoder(json.JSONEncoder):

    def default(self, obj):
        return obj.__dict__