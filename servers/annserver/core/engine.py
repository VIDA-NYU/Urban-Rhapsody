from indexing.indexing import Indexing
from metadb.metadb import MetaDB
import json
import numpy as np

class Engine:

    def __init__(self):

        self.indexdb = None
        self.metadb = None

        ## initializing engine
        self.init_engine()

    def init_engine(self):

        self.indexdb = Indexing()
        self.metadb = MetaDB()


    def get_daily_ann(self, featurevector, k ):

        indices = self.indexdb.get_nearest_neighbors( np.array(featurevector), k )
        dailyCount = self.metadb.get_daily_count( indices )
        return json.dumps(dailyCount)
