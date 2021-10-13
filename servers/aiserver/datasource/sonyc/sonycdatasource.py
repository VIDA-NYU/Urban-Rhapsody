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
            embeddingList[key] = embeddingVector[value['embeddingIndex']]

        return embeddingList


    # @staticmethod
    # def get_frame_classification( uids ):

    #     ## basepath
    #     basepath = SONYCCONSTS['CLASS_PREDICTIONS']

    #     predictionsList = {}
    #     for uid in uids:

    #         predictionPath = f'{basepath}/{uid["sensorID"]}/{uid["snippetuid"]}.npy'
    #         predictionsList[uid["frameuid"]] = SONYCDatasource.open_classification_file( predictionPath )

    #     return predictionsList

    # @staticmethod
    # def open_classification_file( classificationPath ):
    #     return np.load( classificationPath ).tolist()


    @staticmethod
    def open_embedding_file( embeddingpath ):

        if( os.path.isfile(embeddingpath) ):
            return np.load(embeddingpath)['embedding']
        return None

