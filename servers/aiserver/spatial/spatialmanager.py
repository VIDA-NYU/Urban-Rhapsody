from config.constants import SONYCCONSTS
import nmslib
import json

class SpatialManager:

    def __init__(self):

        self.storedIndices = None
        self.fileMapper = None

        ## initializing
        self.initialize_stored_indices()
        self.initialize_file_mapper()
    

    def initialize_file_mapper(self):

        print('Initializing file mapper...')

        ## reading json from file
        with open(SONYCCONSTS['INDICES']['MAPPER']) as mapperFile:
            self.fileMapper = json.load(mapperFile)


    def initialize_stored_indices(self):

        print('Initializing stored indices...')

        ## initializing stored indices
        storedIndices = nmslib.init(method='hnsw', space='l2')
        storedIndices.loadIndex(SONYCCONSTS['INDICES']['NMSLIB_INDICES'])

        ## saving stored indices ref
        self.storedIndices = storedIndices
    


    def get_nearest_neighbors( self, featureVector: list[float], k: int ):

        ids, distances = self.storedIndices.knnQuery(featureVector, k=k)

        # for id in ids:
        #     print( self.fileMapper['indices'][id])
        
        response = [
            {'file': '/home/joaorulff/Workspace/SONYC/urban-rhapsody/urban-rhapsody-4/data/sonyc/audio/2017/sonycnode-b827eb0d8af7.sonyc/2017-07-30/1501464401.wav', 'index': 5},
            {'file': '/home/joaorulff/Workspace/SONYC/urban-rhapsody/urban-rhapsody-4/data/sonyc/audio/2017/sonycnode-b827eb0d8af7.sonyc/2017-07-30/1501399677.wav', 'index': 8},
            {'file': '/home/joaorulff/Workspace/SONYC/urban-rhapsody/urban-rhapsody-4/data/sonyc/audio/2017/sonycnode-b827eb0d8af7.sonyc/2017-07-30/1501451512.wav', 'index': 5},
            {'file': '/home/joaorulff/Workspace/SONYC/urban-rhapsody/urban-rhapsody-4/data/sonyc/audio/2017/sonycnode-b827eb0d8af7.sonyc/2017-07-30/1501416810.wav', 'index': 9},
            {'file': '/home/joaorulff/Workspace/SONYC/urban-rhapsody/urban-rhapsody-4/data/sonyc/audio/2017/sonycnode-b827eb0d8af7.sonyc/2017-07-30/1501446328.wav', 'index': 4},
            {'file': '/home/joaorulff/Workspace/SONYC/urban-rhapsody/urban-rhapsody-4/data/sonyc/audio/2017/sonycnode-b827eb0d8af7.sonyc/2017-07-30/1501416810.wav', 'index': 6},
            {'file': '/home/joaorulff/Workspace/SONYC/urban-rhapsody/urban-rhapsody-4/data/sonyc/audio/2017/sonycnode-b827eb0d8af7.sonyc/2017-07-30/1501416322.wav', 'index': 6},
            {'file': '/home/joaorulff/Workspace/SONYC/urban-rhapsody/urban-rhapsody-4/data/sonyc/audio/2017/sonycnode-b827eb0d8af7.sonyc/2017-07-30/1501447289.wav', 'index': 4},
            {'file': '/home/joaorulff/Workspace/SONYC/urban-rhapsody/urban-rhapsody-4/data/sonyc/audio/2017/sonycnode-b827eb0d8af7.sonyc/2017-07-30/1501403715.wav', 'index': 2},
            {'file': '/home/joaorulff/Workspace/SONYC/urban-rhapsody/urban-rhapsody-4/data/sonyc/audio/2017/sonycnode-b827eb0d8af7.sonyc/2017-07-30/1501461715.wav', 'index': 7}
        ]


        return response




