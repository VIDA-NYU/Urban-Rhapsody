import rocksdb
import os


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

    def set_frame_annotations( self, uids, annotations ):

        ## casting to byte-strings
        uids = list(map( lambda uid: str(uid).encode("utf-8") , uids))
        annotations = ','.join(annotations).encode("utf-8")

        for uid in uids:
            self.annotationsdb.put( uid, annotations )
        
    def __init_annotation_db(self):

        os.system('rm ../../data/sonyc/annotations/annotationsdb.db/LOCK')
        os.system('rm ../../data/sonyc/annotations/inverseAnnotationsdb.db/LOCK')
        self.annotationsdb = rocksdb.DB('../../data/sonyc/annotations/annotationsdb.db', rocksdb.Options(create_if_missing=True))
        self.inverseAnnotationsdb = rocksdb.DB('../../data/sonyc/annotations/inverseAnnotationsdb.db', rocksdb.Options(create_if_missing=True))
