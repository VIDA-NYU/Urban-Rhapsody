from clusterer.clusterer import Clusterer
from prototype.persistance.modelpersistor import ModelPersistor
from prototype.modeling.modeling import Modeling
from utils.responseformatter import ResponseFormatter
import requests
import json
import numpy as np
from datasource.datasource import Datasource

class PrototypeManager:

    def __init__(self):        
        pass

    '''
        prototypeName: str, 
        labels: list[str]
    '''

    def set_prototype( self, prototypeName, labels ):

        ## getting all uids
        uids = []
        for label in labels:
            response = requests.post('http://216.165.113.162:5002/getframesperannotation', json={ 'annotation': label } )
            response = json.loads(response.text)
            uids.extend(response[label])

        negativeUids = []
        for label in labels: 
            response = requests.post('http://216.165.113.162:5002/getframespernegativeannotation', json={ 'annotation': label } )
            response = json.loads(response.text)

            if(response[label] != None):
                negativeUids.extend(response[label])

        negativeFeatures = ResponseFormatter.format_labeled_frames( negativeUids )
        negativeFeatures = Datasource.get_embeddings( uids=negativeFeatures, embeddingModel='openl3' )

        positiveFeatures = ResponseFormatter.format_labeled_frames( uids )
        positiveFeatures = Datasource.get_embeddings( uids=positiveFeatures, embeddingModel='openl3' )
        
        ## generating random sample
        randomSamples = Datasource.get_random_sample( len(positiveFeatures) * 2 )
        randomSamples = Datasource.get_embeddings( uids=randomSamples, embeddingModel='openl3' )

        ## calculating representatives
        # representativeVectors = Clusterer.calculate_representatives( positiveFeatures )
        representativeVectors = Clusterer.calculate_representatives_hdbscan( positiveFeatures )

        # training the model
        # model = Modeling.train_logistic_regression( positiveDict=positiveFeatures, randomDict=randomSamples, negativeDict=negativeFeatures )
        model = Modeling.train_random_forest( positiveDict=positiveFeatures, randomDict=randomSamples, negativeDict=negativeFeatures )

        ## saving prototype
        ModelPersistor.save_model( prototypeName=prototypeName, model=model )
        ModelPersistor.save_representatives( prototypeName, representativeVectors )
        ModelPersistor.save_model_summary( prototypeName=prototypeName, labels=labels )

        return

    def refine_prototype( self, prototypeName, labels ):

        ## flusing previous models
        ModelPersistor.flush_model( prototypeName )
        ModelPersistor.flush_representatives( prototypeName )

        ## getting all uids
        uids = []
        for label in labels:
            response = requests.post('http://216.165.113.162:5002/getframesperannotation', json={ 'annotation': label } )
            response = json.loads(response.text)
            uids.extend(response[label])

        negativeUids = []
        for label in labels: 
            response = requests.post('http://216.165.113.162:5002/getframespernegativeannotation', json={ 'annotation': label } )
            response = json.loads(response.text)

            if(response[label] != None):
                negativeUids.extend(response[label])

        negativeFeatures = ResponseFormatter.format_labeled_frames( negativeUids )
        negativeFeatures = Datasource.get_embeddings( uids=negativeFeatures, embeddingModel='openl3' )

        positiveFeatures = ResponseFormatter.format_labeled_frames( uids )
        positiveFeatures = Datasource.get_embeddings( uids=positiveFeatures, embeddingModel='openl3' )
        
        ## generating random sample
        randomSamples = Datasource.get_random_sample( len(positiveFeatures) * 2 )
        randomSamples = Datasource.get_embeddings( uids=randomSamples, embeddingModel='openl3' )

        ## calculating representatives
        # representativeVectors = Clusterer.calculate_representatives( positiveFeatures )
        representativeVectors = Clusterer.calculate_representatives_hdbscan( positiveFeatures )

        # training the model
        # model = Modeling.train_logistic_regression( positiveDict=positiveFeatures, randomDict=randomSamples, negativeDict=negativeFeatures )
        model = Modeling.train_random_forest( positiveDict=positiveFeatures, randomDict=randomSamples, negativeDict=negativeFeatures )

        ## saving prototype
        ModelPersistor.save_model( prototypeName=prototypeName, model=model )
        ModelPersistor.save_representatives( prototypeName, representativeVectors )
        # ModelPersistor.save_model_summary( prototypeName=prototypeName, labels=labels )

        return

    def get_available_prototypes( self ):
        return ModelPersistor.get_available_models()

    def get_prototype_summary( self, prototypeName: str ):
        return ModelPersistor.load_model_summary( prototypeName )

    def calculate_prototype( self, prototypeName: str, uids ):

        ## getting prototype model
        model = ModelPersistor.load_model( prototypeName )

        ## predicting
        X = list( uids.values() )
        X = np.array(X, dtype="float32")
        predictions = model.predict_proba(X)

        for index, uid in enumerate(uids):
            uids[uid] = predictions[index][1].item()
        
        return uids

    def get_prototype_representatives( self, prototypeName: str ):
        return ModelPersistor.load_representatives( prototypeName )


    # def get_prototype_frames( self, dataset, prototypeName ):
    #     return self.managers[dataset].get_prototype_frames( prototypeName )

    # def calculate_prototype( self, dataset, prototypeEmbeddings, requestEmbeddings ):
    #     return self.managers[dataset].calculate_prototype( prototypeEmbeddings, requestEmbeddings )
