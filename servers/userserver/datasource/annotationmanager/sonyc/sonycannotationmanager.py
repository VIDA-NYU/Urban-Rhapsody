import json
from config.constants import SONYCCONSTS

class SONYCAnnotationManager:

    def __init__(self):

        ## initializing database
        self.__init_database()
    

    def get_annotations( self, uids ):

        selectedUIDs = {}
        for uid in uids:
            if(uid in self.annotationsDatabase):
                selectedUIDs[uid] = self.annotationsDatabase[uid]

        return selectedUIDs

    def set_annotations( self, uids, annotations ):

        ## looping over uids
        for uid in uids:
            self.annotationsDatabase[uid] = annotations

        ## saving annotations to file
        self.__persist_database()

    def __persist_database( self ):

        ## filepath
        filepath = SONYCCONSTS['ANNOTATIONS']

        with open(filepath, 'w') as databasefile:
            json.dump(self.annotationsDatabase, databasefile)
    
    def __init_database( self ):
        
        ## filepath
        filepath = SONYCCONSTS['ANNOTATIONS']

        with open(filepath) as databasefile:
            self.annotationsDatabase = json.load(databasefile)

