import json

class DBUtils:

    @staticmethod
    def remove_list_duplicates( listOfFrames ):

        listOfFrames = list( map( lambda frame: json.dumps(frame), listOfFrames ))
        helperSet = set(listOfFrames)
        listOfFrames = list(helperSet)
        return listOfFrames
