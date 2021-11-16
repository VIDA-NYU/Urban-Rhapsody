from config.constants import SONYCCONSTS
import json
import requests

class SpatialManager:

    def __init__(self): 
        pass
    
    '''
        featureVector: list[float]
        k: int
    '''

    def get_nearest_neighbors( self, featureVector, k ):

        ## params
        data = {
            'vector': featureVector, 
            'k': k 
        }

        ## making request
        response = requests.post('http://localhost:5003/getann', json=data )
        return json.loads(response.text)


    def get_representative_neighbors( self, featureVectors, k ):

        ## params
        data = {
            'vector': featureVectors, 
            'k': 1 
        }

        ## making request
        response = requests.post('http://localhost:5003/getmultipleann', json=data )
        return json.loads(response.text)