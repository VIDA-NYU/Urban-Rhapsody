from config.constants import USTCONSTS

## native
import os
import numpy as np
import json

class USTDatasource:
    
    @staticmethod
    def get_embeddings( uids, embeddingModel ):
        
        ## basepath
        basepath = USTCONSTS['EMBEDDINGS_BASEPATH'][embeddingModel]

        ## returning embeddings
        embeddingList = {}

        ## helper set to avoid getting repeated audio embeddings
        snippetSetHelper = {}

        for frameuid, frameinfo in uids.items():
            
            snippetUID = f'{frameuid.split("_")[0]}_{frameuid.split("_")[1]}'
            snippetEmbeddingPath = f'{basepath}{snippetUID}.npz'

            if( not (snippetUID in snippetSetHelper) ):
                snippetSetHelper[snippetUID] = USTDatasource.open_embedding_file( snippetEmbeddingPath )
       
            # ## returning embedding index
            # ## TODO: figure out if it's better to pass embedding index or just calculate it here
            embeddingIndex = frameinfo['embeddingIndex']
            embeddingList[frameuid] = snippetSetHelper[snippetUID][embeddingIndex].tolist()
            

        return embeddingList  


    @staticmethod
    def get_frame_classification( uids ):  

        ## classification filepath
        filepath = USTCONSTS['CLASSIFICATION_BASEPATH']
        classifications = USTDatasource.open_classification_file( filepath )

        classificationList = {}
        for uid in uids:

            if( uid['snippetuid'] in classifications ):
                # print(classifications[uid['snippetuid']])
                classificationList[uid['frameuid']] = classifications[uid['snippetuid']][int(uid['embeddingindex'])]
            else:
                [0 for i in range(8)]

        return classificationList
        

    @staticmethod
    def open_classification_file( classificationPath ):
        with open( classificationPath ) as classificationPath:
            return json.load(classificationPath)
            

    @staticmethod
    def open_embedding_file( embeddingpath ):

        if( os.path.isfile(embeddingpath) ):
            return np.load(embeddingpath)['embedding']
        return None