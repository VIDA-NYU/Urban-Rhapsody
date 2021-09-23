from werkzeug.wrappers import response
from config.constants import SONYCCONSTS
import json
import requests

class SpatialManager:

    def __init__(self): 
        pass

    def get_nearest_neighbors( self, featureVector: list[float], k: int ):

        ## params
        data = {
            'vector': featureVector, 
            'k': k 
        }

        ## making request
        response = requests.post('http://localhost:5003/getann', json=data )
        return json.loads(response.text)