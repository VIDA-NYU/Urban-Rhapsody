# import nmslib
from config.constants import INDEXCONSTS
from faiss import read_index
import numpy as np


class Indexing:

    def __init__(self):

        ## indices ref
        self.storedIndices = None

        ## initializing
        self.initialize_stored_indices()
    
    def initialize_stored_indices(self):

        ## initializing stored indices
        print('initializing index...')
        print(INDEXCONSTS['saf7'])
        self.storedIndices = read_index(INDEXCONSTS['saf7'])

        ##storedIndices = nmslib.init(method='hnsw', space='l2')
        ##storedIndices.loadIndex('../../data/sonyc/indices/ann/b827eb0d8af7.bin')
        print('done!')

        ## saving stored indices ref
        ## self.storedIndices = storedIndices


    def get_multiple_nearest_neighbors( self, featureVectors: list[float], k: int = 5 ):

        queryVector = np.array(featureVectors, dtype='float32')
        distances, ids = self.storedIndices.search(queryVector, k)
        return ids    

    def get_nearest_neighbors( self, featureVector: list[float], k: int = 10000 ):

        # ids, distances = self.storedIndices.knnQuery(featureVector, k=k)
        queryVector = np.array([featureVector], dtype='float32')
        distances, ids = self.storedIndices.search(queryVector, k)
        return ids[0]

