from datasource.annotationmanager.annotationmanager import AnnotationManager
# from datasource.dataloader import DataLoader
import json


# uids: { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } }

class Engine:

    def __init__( self ):

        self.annotationsManager = AnnotationManager()

    def get_frame_annotations( self, uids: list[str] ):
        return json.dumps(self.annotationsManager.get_frame_annotations( uids )) 

    def get_frames_per_annotation( self, annotation: str ):
        return json.dumps( { annotation: self.annotationsManager.get_frames_per_annotation( annotation ) })

    def set_frame_annotations( self, uids: dict[ str, any ], annotations: list[str] ):
        self.annotationsManager.set_frame_annotations( uids, annotations )
        return json.dumps({'response': 'success'})

    def get_all_labels( self ):
        return json.dumps({'labels': self.annotationsManager.get_all_labels() })
       