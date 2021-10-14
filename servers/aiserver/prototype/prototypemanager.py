from prototype.persistance.modelpersistor import ModelPersistor
from prototype.modeling.modeling import Modeling
from utils.responseformatter import ResponseFormatter
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

        positiveFeatures = ResponseFormatter.format_labeled_frames( uids )
        positiveFeatures = Datasource.get_embeddings( uids=positiveFeatures, embeddingModel='openl3' )
        
        ## generating random sample
        print( len(positiveFeatures) )
        randomSamples = Datasource.get_random_sample( len(positiveFeatures) )
        randomSamples = Datasource.get_embeddings( uids=randomSamples, embeddingModel='openl3' )

        # training the model
        model = Modeling.train_logistic_regression( positiveFeatures, randomSamples )
        ModelPersistor.save_model( model )

        ## saving prototype
        # ModelPersistor.save_model( model )

        ## extracting representatives
        # representatives = 

        pass

    # def get_available_prototypes( self, dataset ):
    #     return self.managers[dataset].get_available_prototypes()

    # def get_prototype_frames( self, dataset, prototypeName ):
    #     return self.managers[dataset].get_prototype_frames( prototypeName )

    # def calculate_prototype( self, dataset, prototypeEmbeddings, requestEmbeddings ):
    #     return self.managers[dataset].calculate_prototype( prototypeEmbeddings, requestEmbeddings )
