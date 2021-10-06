from utils.distancecalculator import DistanceCalculator
from config.constants import SONYCCONSTS
import json

class SONYCPrototypeManager:

    def __init__(self):

        self.prototypeDatabase = {}
        
        ## initializing database
        self.__init_manager()

    def set_prototype( self, prototypeName: str, uids ):

        for uid, frameinfo in uids.items():
            
            if( not (prototypeName in self.prototypeDatabase) ):
                self.prototypeDatabase[prototypeName] = {}

            embeddingRef = { 'embeddingIndex': frameinfo['embeddingIndex'], 'sensorID': frameinfo['sensorID'] }
            self.prototypeDatabase[prototypeName][uid] = embeddingRef

        self.__persist_database()

    def get_available_prototypes( self ):
        return list(self.prototypeDatabase.keys())

    def get_prototype_frames( self, prototypeName ):
        return self.prototypeDatabase[prototypeName]

    def calculate_prototype( self, prototypeEmbeddings, requestEmbeddings ):

        distancesByUID = {}
        for uid, embedding in requestEmbeddings.items():
            currentDistance = DistanceCalculator.calculate_min_distance( embedding, prototypeEmbeddings )
            distancesByUID[uid] = currentDistance

        return distancesByUID

    def __persist_database( self ):

        ## filepath
        filepath = SONYCCONSTS['PROTOTYPES']

        with open(filepath, 'w') as databasefile:
            json.dump(self.prototypeDatabase, databasefile)


    def __init_manager( self ):

        ## filepath
        filepath = SONYCCONSTS['PROTOTYPES']

        with open(filepath) as databasefile:
            self.prototypeDatabase = json.load(databasefile)
