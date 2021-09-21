from projector.pcaprojector import PCAProjector
from projector.umapprojector import UMAPProjector

class Projector:


    @staticmethod
    def project_points( embeddings, projectionType: str, params={} ):

        if(projectionType == 'umap'):
            return UMAPProjector.project_points( embeddings, params )
        elif(projectionType == 'pca'):
            return PCAProjector.project_points( embeddings, params )