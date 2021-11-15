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

        ## creating folder if doesn't exist
        basepath = f"{SONYCCONSTS['PROTOTYPES']['MODELS']}/{prototypeName}"
        if(not os.path.isdir(basepath)):
            os.makedirs(basepath)

        ## getting model number id
        modelPaths = glob.glob(f"{basepath}/*") 
        nModels = len(modelPaths)
        
        ## saving model
        filepath = f"{basepath}/{nModels}_{prototypeName}.pkl"
        with open(filepath, 'wb') as file:
            pickle.dump(model, file)

    @staticmethod
    def load_model( prototypeName: str ):

        ## getting last model's id
        basepath = f"{SONYCCONSTS['PROTOTYPES']['MODELS']}/{prototypeName}"
        nModels = len(glob.glob(f"{basepath}/*"))

        ## loading
        filepath = f"{basepath}/{nModels - 1}_{prototypeName}.pkl"
        model = pickle.load(open(filepath, 'rb'))
        return model

    @staticmethod
    def load_all_models( prototypeName: str ):

        ## getting last model's id
        basepath = f"{SONYCCONSTS['PROTOTYPES']['MODELS']}/{prototypeName}"
        modelspaths = len(glob.glob(f"{basepath}/*"))

        ## loading
        models = []
        for modelIndex in range(modelspaths):
            filepath = f"{basepath}/{modelIndex}_{prototypeName}.pkl"
            model = pickle.load(open(filepath, 'rb'))
            models.append(model)

        return models

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
    def update_model_summary( prototypeName: str, currentScore: float, previousScores: 'list[float]' ):

        currentSummary = ModelPersistor.load_model_summary( prototypeName=prototypeName )

        ## appending previous scores
        for index, score in enumerate(previousScores):
            currentSummary['accuracy'][index].append(score)

        ## appending current score
        currentSummary['accuracy'].append([0]*len(previousScores))
        currentSummary['accuracy'][len(currentSummary['accuracy'])-1].append(currentScore)

        ## saving model summary as json
        filepath = f"{SONYCCONSTS['PROTOTYPES']['SUMMARIES']}{prototypeName}.json"
        with open(filepath, 'w') as file:
            json.dump(currentSummary, file)


    @staticmethod
    def save_model_summary( prototypeName: str, labels: 'list[str]', score ):

        ## creating model summary
        modelSummary = {
            'name': prototypeName,
            'labels': labels,
            'accuracy': [[score]]
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

        modelsfolder = f"{SONYCCONSTS['PROTOTYPES']['MODELS']}/*"
        models = glob.glob(modelsfolder)
        models = list(map( lambda modelpath: os.path.basename(modelpath).split('.')[0], models ))
        return models

