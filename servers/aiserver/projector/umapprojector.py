import umap 

class UMAPProjector:

    @staticmethod
    def project_points( embeddings, params ):

        params = UMAPProjector.__parse_params( params )

        umap_projection = umap.UMAP(
            random_state=42, 
            n_neighbors=params['n_neighbors'],
            min_dist=params['min_dist'],
            metric=params['metric']).fit_transform(embeddings)

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
        
