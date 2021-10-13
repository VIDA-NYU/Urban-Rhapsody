import requests
import json
from datasource.datasource import Datasource

class PrototypeManager:

    def __init__(self):        
        pass

    def set_prototype( self, prototypeName: str, labels: list[str] ):

        ## getting all uids
        uids = []
        for label in labels:
            response = requests.post('http://localhost:5002/getframesperannotation', json={ 'annotation': label } )
            response = json.loads(response.text)
            uids.extend(response[label])

        ## getting embeddings
        # embeddingList = Datasource.get_embeddings( dataset='SONYC', uids=uids, embeddingModel='openl3' )

        Datasource.get_random_sample( 20 )
        
    #     prototypeFrames = self.prototypeManager.get_prototype_frames( dataset=dataset, prototypeName=prototypeName )
    #     prototypeEmbeddings = Datasource.get_embeddings( dataset=dataset, uids=prototypeFrames, embeddingModel='openl3' )
    #     prototypeEmbeddings = prototypeEmbeddings.values()

    #     ## calculating distances
    #     return self.prototypeManager.calculate_prototype( dataset=dataset, prototypeEmbeddings=prototypeEmbeddings, requestEmbeddings=embeddingList ) 

        pass

    def get_available_prototypes( self, dataset ):
        return self.managers[dataset].get_available_prototypes()

    def get_prototype_frames( self, dataset, prototypeName ):
        return self.managers[dataset].get_prototype_frames( prototypeName )

    def calculate_prototype( self, dataset, prototypeEmbeddings, requestEmbeddings ):
        return self.managers[dataset].calculate_prototype( prototypeEmbeddings, requestEmbeddings )
