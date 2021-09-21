from sklearn.decomposition import PCA

class PCAProjector:

    @staticmethod
    def project_points( embeddings, params ):

        pca = PCA(n_components=2)
        projection = pca.fit_transform( embeddings )
        return projection[:, 0], projection[:, 1]


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