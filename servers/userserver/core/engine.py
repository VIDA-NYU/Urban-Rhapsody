from datasource.annotationmanager.annotationmanager import AnnotationManager
# from datasource.dataloader import DataLoader
import json

class Engine:

    def __init__( self ):

        self.annotationsManager = AnnotationManager()

    def get_frame_annotations( self, uids: list[str] ):
        return json.dumps(self.annotationsManager.get_frame_annotations( uids )) 


    def set_frame_annotations( self, uids: list[str], annotations: list[str] ):
        self.annotationsManager.set_frame_annotations( uids, annotations )
        return json.dumps({'response': 'success'})
       