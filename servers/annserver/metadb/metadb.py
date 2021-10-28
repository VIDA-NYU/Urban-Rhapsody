from config.constants import METADB
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
        os.system(f"rm {METADB['saf7']}/LOCK")
        self.db = rocksdb.DB(METADB['saf7'], rocksdb.Options(create_if_missing=True))


    def get_daily_count( self, indices: list[int] ):

        dailyCount = {}

        for idx in indices:

            currentobj = self.db.get(str(idx).encode("utf-8"))
            currentobj = json.loads(currentobj.decode("utf-8"))

            if( not (currentobj['day'] in dailyCount) ):
                dailyCount[currentobj['day']] = { 'count': 0, 'frames': [], 'paths': [] }

            ## creating frameuid
            frameuid = f"{currentobj['filename'].split('.wav')[0]}_{currentobj['index']}"

            dailyCount[currentobj['day']]['count'] += 1
            dailyCount[currentobj['day']]['frames'].append(frameuid)

            # frame path
            framePath = { 'embeddingIndex': currentobj['index'], 'sensorID': currentobj['sensorid'], 'day': currentobj['day'], 'snippetID': currentobj['filename'].split('.')[0] }
            dailyCount[currentobj['day']]['paths'].append(framePath)


        return dailyCount
            

