## consts
from config.constants import SONYCCONSTS

## native
import os
import numpy as np

class SONYCDatasource:

    @staticmethod
    def get_embeddings( uids, embeddingModel ):
        
        ## returning embeddings
        embeddingList = {}

        for key, value in uids.items():
            
            embeddingPath = f"{SONYCCONSTS['EMBEDDINGS_BASEPATH'][embeddingModel]}/{value['sensorID']}/{value['day']}/{value['snippetID']}.npz"
            embeddingVector = SONYCDatasource.open_embedding_file(embeddingPath)

            ## TODO: recompute UST embeddings to only 10 feature vectors
            if( embeddingVector.shape[0] == 20 ):
                value['embeddingIndex'] = 1 + (value['embeddingIndex'] * 2)

            embeddingList[key] = embeddingVector[value['embeddingIndex']]

        return embeddingList


    @staticmethod
    def open_embedding_file( embeddingpath ):

        if( os.path.isfile(embeddingpath) ):
            return np.load(embeddingpath)['embedding']
        return None

