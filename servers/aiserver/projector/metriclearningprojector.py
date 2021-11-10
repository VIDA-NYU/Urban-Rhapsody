from cuml.manifold.umap import UMAP
import numpy as np
import random
from ivis import Ivis
## import metric_learn


class MetricLearningProjector:

    @staticmethod
    def project_points( embeddings, params ):

        projectionIndices = np.zeros( len(params['labels']), dtype=np.int8 )
        helperset = {}
        
        for index, label in enumerate(params['labels']):

            if( len(label) == 0 ):
                projectionIndices[index] = -1
                continue

            if( not (label[0] in helperset) ):
                helperset[label[0]] = len(helperset)
            projectionIndices[index] = helperset[label[0]]
            

        embeddings = np.array(embeddings, dtype=np.float32)
        ##umap_projection = UMAP( random_state=42 ).fit_transform(embeddings, y=projectionIndices)
        model = Ivis(n_epochs_without_progress=5, supervision_weight=0.9)
        model.fit(embeddings, projectionIndices)
        umap_projection = model.transform( embeddings )

        # umap_projection = umap.UMAP(
        #     random_state=42, 
        #     n_neighbors=params['n_neighbors'],
        #     min_dist=params['min_dist'],
        #     metric=params['metric'],
        #     n_jobs=5).fit_transform(embeddings)

        return umap_projection[:,0], umap_projection[:,1]