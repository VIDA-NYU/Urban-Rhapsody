## consts
from config.constants import SONYCCONSTS

## native
import os
import numpy as np

class SONYCDatasource:

    @staticmethod
    def get_embeddings( uids, embeddingModel ):
        
        ## basepath
        basepath = SONYCCONSTS['EMBEDDINGS_BASEPATH'][embeddingModel]

        ## returning embeddings
        embeddingList = {}

        ## helper set to avoid getting repeated audio embeddings
        snippetSetHelper = {}

        for frameuid, frameinfo in uids.items():

            sensorID = uids[frameuid]['sensorID']
            snippetUID = f'{frameuid.split("_")[0]}_{frameuid.split("_")[1]}'
            snippetEmbeddingPath = f'{basepath}{sensorID}/{snippetUID}.npz'

            if( not (snippetUID in snippetSetHelper) ):
                snippetSetHelper[snippetUID] = SONYCDatasource.open_embedding_file( snippetEmbeddingPath )
       
            ## returning embedding index
            ## TODO: figure out if it's better to pass embedding index or just calculate it here
            embeddingIndex = frameinfo['embeddingIndex']
            if(embeddingIndex > 10):
                print('Maior')
                embeddingIndex = 0
            embeddingList[frameuid] = snippetSetHelper[snippetUID][embeddingIndex].tolist()
            

        return embeddingList


    @staticmethod
    def get_frame_classification( uids ):

        ## basepath
        basepath = SONYCCONSTS['CLASS_PREDICTIONS']

        predictionsList = {}
        for uid in uids:

            predictionPath = f'{basepath}/{uid["sensorID"]}/{uid["snippetuid"]}.npy'
            predictionsList[uid["frameuid"]] = SONYCDatasource.open_classification_file( predictionPath )

        return predictionsList

    @staticmethod
    def open_classification_file( classificationPath ):
        return np.load( classificationPath ).tolist()


    @staticmethod
    def open_embedding_file( embeddingpath ):

        if( os.path.isfile(embeddingpath) ):
            return np.load(embeddingpath)['embedding']
        return None

