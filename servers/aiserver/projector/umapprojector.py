import umap 
from cuml.manifold.umap import UMAP
# from tsnecuda import TSNE

import numpy as np

class UMAPProjector:

    @staticmethod
    def project_points( embeddings, params ):

        params = UMAPProjector.__parse_params( params )

        embeddings = np.array(embeddings, dtype=np.float32)
        umap_projection = UMAP( 
            random_state=42, 
            n_neighbors=params['n_neighbors'],
            min_dist=params['min_dist']).fit_transform(embeddings)

        # umap_projection = umap.UMAP(
        #     random_state=42, 
        #     n_neighbors=params['n_neighbors'],
        #     min_dist=params['min_dist'],
        #     metric=params['metric'],
        #     n_jobs=5).fit_transform(embeddings)

        return umap_projection[:,0], umap_projection[:,1]


    @staticmethod
    def __parse_params( params ):

        parsedParams = {
            'n_neighbors': 20,
            'min_dist': 0.2,
            'metric': 'euclidean'
        }
        
        if( 'n_neighbors' in params ):
            parsedParams['n_neighbors'] = params['n_neighbors']
        if( 'min_dist' in params ):
            parsedParams['min_dist'] = params['min_dist']
        if( 'metric' in params ):
            parsedParams['metric'] = params['metric']

        return parsedParams
        
