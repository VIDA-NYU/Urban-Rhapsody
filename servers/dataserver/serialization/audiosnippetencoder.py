import json

class AudioSnippetEncoder(json.JSONEncoder):

    def default(self, obj):
        return obj.__dict__