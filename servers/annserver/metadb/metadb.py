import rocksdb
import json
import os

class MetaDB:

    def __init__(self):
        
        ## db ref
        self.db = None

        ## initializing db
        self.initialize_db()

    def initialize_db( self ):
        os.system('rm ../../data/sonyc/indices/ann/b827eb0d8af7.db/LOCK')
        self.db = rocksdb.DB('../../data/sonyc/indices/ann/b827eb0d8af7.db', rocksdb.Options(create_if_missing=True))


    def get_daily_count( self, indices: list[int] ):

        dailyCount = {}

        for idx in indices:

            currentobj = self.db.get(str(idx).encode("utf-8"))
            currentobj = json.loads(currentobj.decode("utf-8"))

            if( not (currentobj['day'] in dailyCount) ):
                dailyCount[currentobj['day']] = 0
            dailyCount[currentobj['day']] += 1


        return dailyCount
            

