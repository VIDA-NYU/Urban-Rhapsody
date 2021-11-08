## consts
from config.constants import SONYCCONSTS

## third-party
import numpy as np

## native
import pickle
import glob
import os
import json
import random

class ModelPersistor:

    @staticmethod
    def flush_model( prototypeName: str ):
        filepath = f"{SONYCCONSTS['PROTOTYPES']['MODELS']}{prototypeName}.pkl"

        if os.path.exists(filepath):
            os.remove(filepath)

    @staticmethod
    def flush_representatives( prototypeName: str ):

        filepath = f"{SONYCCONSTS['PROTOTYPES']['REPRESENTATIVES']}/{prototypeName}"
        if( os.path.isdir(filepath) ):

            representatives = glob.glob( f"{filepath}/*")
            for npfile in representatives:
                os.remove(npfile)

        os.rmdir(filepath)
        

    @staticmethod
    def save_model( prototypeName: str, model ):

        filepath = f"{SONYCCONSTS['PROTOTYPES']['MODELS']}{prototypeName}.pkl"
        with open(filepath, 'wb') as file:
            pickle.dump(model, file)

    @staticmethod
    def load_model( prototypeName: str ):

        # model = pickle.loads(s)
        filepath = f"{SONYCCONSTS['PROTOTYPES']['MODELS']}{prototypeName}.pkl"
        model = pickle.load(open(filepath, 'rb'))
        return model

    @staticmethod
    def save_representatives( prototypeName: str, listOfEmbeddings ):

        filepath = f"{SONYCCONSTS['PROTOTYPES']['REPRESENTATIVES']}/{prototypeName}"
        if( not os.path.isdir(filepath) ):
            os.mkdir( filepath )

        for clusterIndex, embedding in enumerate(listOfEmbeddings):
            
            representativePath = f"{filepath}/{clusterIndex}"
            np.save( representativePath, embedding )

    @staticmethod
    def load_representatives( prototypeName: str ):

        filepath = f"{SONYCCONSTS['PROTOTYPES']['REPRESENTATIVES']}/{prototypeName}"
        files = glob.glob( f"{filepath}/*" )

        representatives = {}
        for index, file in enumerate(files):
            currentEmbedding = np.load( file )
            representatives[index] = currentEmbedding

        return representatives

    @staticmethod
    def update_model_summary( prototypeName: str ):

        currentSummary = ModelPersistor.load_model_summary( prototypeName=prototypeName )
        currentSummary['accuracy'].append(random.uniform(0,1))

        ## saving model summary as json
        filepath = f"{SONYCCONSTS['PROTOTYPES']['SUMMARIES']}{prototypeName}.json"
        with open(filepath, 'w') as file:
            json.dump(currentSummary, file)


    @staticmethod
    def save_model_summary( prototypeName: str, labels: 'list[str]' ):

        ## creating model summary
        modelSummary = {
            'name': prototypeName,
            'labels': labels,
            'accuracy': [random.uniform(0,1)]
        }

        ## saving model summary as json
        filepath = f"{SONYCCONSTS['PROTOTYPES']['SUMMARIES']}{prototypeName}.json"
        with open(filepath, 'w') as file:
            json.dump(modelSummary, file)
        

    @staticmethod
    def load_model_summary( prototypeName: str ):

        filepath = f"{SONYCCONSTS['PROTOTYPES']['SUMMARIES']}{prototypeName}.json"
        with open(filepath) as file:
            return json.load(file)

    @staticmethod
    def get_available_models():

        modelsfolder = f"{SONYCCONSTS['PROTOTYPES']['MODELS']}*"
        models = glob.glob(modelsfolder)
        models = list(map( lambda modelpath: os.path.basename(modelpath).split('.')[0], models ))
        return models

