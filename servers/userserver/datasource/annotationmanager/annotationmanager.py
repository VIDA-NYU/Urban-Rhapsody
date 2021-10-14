from utils.dbutils import DBUtils
import rocksdb
import os
import json

class AnnotationManager:

    '''
        annotationsdb saves the following key-value pair: { frameid: list of labels }
        inverseAnnotationsdb saves { label: list of frameids }
    '''

    def __init__(self):

        ## db ref
        self.annotationsdb = None
        self.inverseAnnotationsdb = None

        ## initializing db
        self.__init_annotation_db()

    def get_frame_annotations( self, uids ):

        uids = list(map( lambda uid: str(uid).encode("utf-8") , uids))
        queryResponse = self.annotationsdb.multi_get(uids)

        annotations = {}
        for uid in uids:

            if( not queryResponse[uid] == None ):
                currentAnnotations = queryResponse[uid].decode("utf-8")
                currentAnnotations = currentAnnotations.split(',')
                annotations[ uid.decode('utf-8') ] = currentAnnotations

        return annotations

    def get_frames_per_annotation( self, annotation: str ) -> list[str]:

        frames = self.inverseAnnotationsdb.get( annotation.encode('utf-8') )
        
        if( not frames == None ):
            frames = frames.decode('utf-8')
            frames = json.loads(frames)
        
        return frames

    def set_frame_annotations( self, uids: dict[str, any], annotations: list[str] ):

        # ## casting to byte-strings
        encodeduidslist = list(map( lambda uid: str(uid).encode("utf-8") , list(uids.keys()) ))
        encodedannotations = ','.join(annotations).encode("utf-8")

        batch = rocksdb.WriteBatch()
        for uid in encodeduidslist:
            batch.put( uid, encodedannotations )
        self.annotationsdb.write(batch)

        ## setting inverse annotation
        self.set_frame_per_annotations( uids, annotations )

    def set_frame_per_annotations( self, uids: dict[str, any], annotations: list[str] ):

        ## saving inverse frame annotations
        batch = rocksdb.WriteBatch()

        ## looping over annotations
        for annotation in annotations:

            annotatedFrames = self.inverseAnnotationsdb.get( annotation.encode('utf-8') )

            if( annotatedFrames == None ):

                # json.dumps(record).encode('utf-8')
                encodedobjs = list(map( lambda snippet: json.dumps(snippet) , list(uids.values()) ))
                encodedobjs = f"[{','.join(encodedobjs)}]".encode("utf-8")
                batch.put( annotation.encode('utf-8'), encodedobjs  )

            else:
                previouslyAnnotatedFrames = self.get_frames_per_annotation( annotation )
                previouslyAnnotatedFrames.extend(  list(uids.values()) )
                previouslyAnnotatedFrames = DBUtils.remove_list_duplicates( previouslyAnnotatedFrames )
                previouslyAnnotatedFrames = f"[{','.join(previouslyAnnotatedFrames)}]".encode("utf-8")
                batch.put( annotation.encode('utf-8'), previouslyAnnotatedFrames  )

        self.inverseAnnotationsdb.write( batch )
        
    def get_all_labels(self):

        iterator = self.inverseAnnotationsdb.iteritems()
        iterator.seek_to_first()

        labels = list(map(lambda label: label.decode('utf-8'), list(dict(iterator).keys()) ))
        return labels

    def __init_annotation_db(self):

        if( os.path.isfile('../../data/sonyc/annotations/annotationsdb.db/LOCK')):
            os.system('rm ../../data/sonyc/annotations/annotationsdb.db/LOCK')

        if( os.path.isfile('../../data/sonyc/annotations/inverseAnnotationsdb.db/LOCK')):
            os.system('rm ../../data/sonyc/annotations/inverseAnnotationsdb.db/LOCK')

        self.annotationsdb = rocksdb.DB('../../data/sonyc/annotations/annotationsdb.db', rocksdb.Options(create_if_missing=True))
        self.inverseAnnotationsdb = rocksdb.DB('../../data/sonyc/annotations/inverseAnnotationsdb.db', rocksdb.Options(create_if_missing=True))
