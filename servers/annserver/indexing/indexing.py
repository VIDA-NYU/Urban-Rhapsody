import nmslib
import glob

class Indexing:

    def __init__(self):

        ## indices ref
        self.storedIndices = None

        ## initializing
        self.initialize_stored_indices()
    
    def initialize_stored_indices(self):

        ## initializing stored indices
        print('initializing index...')
        storedIndices = nmslib.init(method='hnsw', space='l2')
        storedIndices.loadIndex('../../data/sonyc/indices/ann/b827eb0d8af7.bin')
        print('done!')

        ## saving stored indices ref
        self.storedIndices = storedIndices
    

    def get_nearest_neighbors( self, featureVector: list[float], k: int = 10000 ):

        ids, distances = self.storedIndices.knnQuery(featureVector, k=k)
        return ids

