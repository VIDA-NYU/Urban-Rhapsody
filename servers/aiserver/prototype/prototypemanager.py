from clusterer.clusterer import Clusterer
from prototype.persistance.modelpersistor import ModelPersistor
from prototype.modeling.modeling import Modeling
from utils.responseformatter import ResponseFormatter
import requests
import json
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
            response = requests.post('http://localhost:5002/getframesperannotation', json={ 'annotation': label } )
            response = json.loads(response.text)
            uids.extend(response[label])


        positiveFeatures = ResponseFormatter.format_labeled_frames( uids )
        positiveFeatures = Datasource.get_embeddings( uids=positiveFeatures, embeddingModel='openl3' )
        
        ## generating random sample
        randomSamples = Datasource.get_random_sample( len(positiveFeatures) * 2 )
        randomSamples = Datasource.get_embeddings( uids=randomSamples, embeddingModel='openl3' )

        ## calculating representatives
        # representativeVectors = Clusterer.calculate_representatives( positiveFeatures )
        representativeVectors = Clusterer.calculate_representatives_hdbscan( positiveFeatures )

        # training the model
        # model = Modeling.train_logistic_regression( positiveFeatures, randomSamples )
        model = Modeling.train_random_forest( positiveFeatures, randomSamples )

        # ## saving prototype
        ModelPersistor.save_model( prototypeName=prototypeName, model=model )
        ModelPersistor.save_representatives( prototypeName, representativeVectors )

        return

    def get_available_prototypes( self ):
        return ModelPersistor.get_available_models()

    def calculate_prototype( self, prototypeName: str, uids ):

        ## getting prototype model
        model = ModelPersistor.load_model( prototypeName )

        ## predicting
        # X = list( uids.values() )
        # predictions = model.predict_proba( X )

        for uid in uids:
            positiveLikelihood = model.predict_proba( [ uids[uid] ])[0][1]
            uids[uid] = positiveLikelihood
        
        return uids

    def get_prototype_representatives( self, prototypeName: str ):
        return ModelPersistor.load_representatives( prototypeName )


    # def get_prototype_frames( self, dataset, prototypeName ):
    #     return self.managers[dataset].get_prototype_frames( prototypeName )

    # def calculate_prototype( self, dataset, prototypeEmbeddings, requestEmbeddings ):
    #     return self.managers[dataset].calculate_prototype( prototypeEmbeddings, requestEmbeddings )
