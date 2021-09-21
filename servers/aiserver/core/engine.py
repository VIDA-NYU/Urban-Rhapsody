from spatial.spatialmanager import SpatialManager
from prototype.prototypemanager import PrototypeManager
from serialization.projectionencoder import ProjectionEncoder
from projector.projector import Projector
from flask import json
from datasource.datasource import Datasource

class Engine:

    def __init__(self):

        # self.prototypeManager = PrototypeManager()
        self.spatialManager = SpatialManager()
        pass

    ################## ANN ##################
    
    def get_nearest_neighbors( self, dataset, uids, embeddingModel: str ):

        embeddings = Datasource.get_embeddings( dataset='UST', uids=uids, embeddingModel='openl3'  )
        self.spatialManager.get_nearest_neighbors( featureVector=embeddings['04_012439_3'], k=10 )

        
    
    ################## PROJECTIONS ##################

    def project_points(self, dataset, projectionType, embeddingModel, uids, params={} ):
        
        embeddingList = Datasource.get_embeddings( dataset=dataset, uids=uids, embeddingModel=embeddingModel )
        embeddings = list( map(lambda uid: embeddingList[uid], embeddingList ))

        ## projecting
        x, y = Projector.project_points( embeddings, projectionType, params )

        for index, frameuid in enumerate(embeddingList):
            embeddingList[frameuid] = { 'x': f'{x[index].item():.3f}' , 'y': f'{y[index].item():.3f}' }

        return json.dumps( embeddingList, cls=ProjectionEncoder )


    ################## CLASSIFICATION ##################

    def get_frame_classification( self, dataset, uids ):

        ## parsing predictions
        classificationList = Datasource.get_frame_classification( dataset, uids )

        ## returning
        return json.dumps( classificationList )


    ################## PROTOTYPES ##################

    def set_prototype( self, dataset, prototypeName, uids ):
        self.prototypeManager.set_prototype( dataset, prototypeName, uids )
        return json.dumps({'response': 'success'})

    def get_available_prototypes( self, dataset ):
        prototypes = self.prototypeManager.get_available_prototypes( dataset )
        return json.dumps({'prototypes': prototypes }) 

    def apply_prototype( self, dataset, prototypeName, uids ):

        # print(uids)
        embeddingList = Datasource.get_embeddings( dataset=dataset, uids=uids, embeddingModel='openl3' )
        
        prototypeFrames = self.prototypeManager.get_prototype_frames( dataset=dataset, prototypeName=prototypeName )
        prototypeEmbeddings = Datasource.get_embeddings( dataset=dataset, uids=prototypeFrames, embeddingModel='openl3' )
        prototypeEmbeddings = prototypeEmbeddings.values()

        ## calculating distances
        return self.prototypeManager.calculate_prototype( dataset=dataset, prototypeEmbeddings=prototypeEmbeddings, requestEmbeddings=embeddingList )  