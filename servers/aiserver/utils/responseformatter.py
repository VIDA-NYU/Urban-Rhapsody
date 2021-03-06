from os import stat
import random

class ResponseFormatter:


    @staticmethod
    def format_ann_response( indexNeighbors ):

        embeddings = {}

        for day in indexNeighbors:
            for index, path in enumerate(indexNeighbors[day]['paths']):
                
                frameuid = indexNeighbors[day]['frames'][index]
                embeddings[frameuid] = path
                
        return embeddings
    
    # @staticmethod
    # def format_ann_response( responseList ):

    #     datesCounter = {}
    #     for file in responseList:
            
    #         day = file.split('/')[-2]

    #         if(day in datesCounter):
    #             datesCounter[day] = 0
    #         datesCounter[day] += 1

    #     return datesCounter


    @staticmethod
    def format_labeled_frames( paths ):

        indexedPaths = {}
        for path in paths:
            frameuid = f"{path['snippetID']}_{path['embeddingIndex']}"
            indexedPaths[frameuid] = path

        return indexedPaths


    '''
        paths: list[str]
    '''
    @staticmethod
    def format_random_sample( paths ):

        randomSamples = {}
        for path in paths:

            embeddingIndex = random.randint(0,9)
            sensorID = path.split('/')[-3]
            day = path.split('/')[-2]
            snippetID = path.split('/')[-1].split('.')[0]
            frameuid = f'{snippetID}_{embeddingIndex}'

            randomSamples[frameuid] = { 
                'embeddingIndex': embeddingIndex, 
                'sensorID': sensorID, 
                'day': day, 
                'snippetID': snippetID }

        return randomSamples