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

        ## The purpose of this dictionary is to accelerate this loading process
        embeddingAcceleratorHelper = {}

        for key, value in uids.items():
            
            embeddingPath = f"{SONYCCONSTS['EMBEDDINGS_BASEPATH'][embeddingModel]}/{value['sensorID']}/{value['day']}/{value['snippetID']}.npz"

            if( not embeddingPath in embeddingAcceleratorHelper ):
                embeddingAcceleratorHelper[embeddingPath] = SONYCDatasource.open_embedding_file(embeddingPath)

            ## TODO: recompute UST embeddings to only 10 feature vectors
            if( embeddingAcceleratorHelper[embeddingPath].shape[0] == 20 ):
                value['embeddingIndex'] = 1 + (value['embeddingIndex'] * 2)

            embeddingList[key] = embeddingAcceleratorHelper[embeddingPath][value['embeddingIndex']]

        return embeddingList


    @staticmethod
    def open_embedding_file( embeddingpath ):

        if( os.path.isfile(embeddingpath) ):
            return np.load(embeddingpath)['embedding']
        return None

