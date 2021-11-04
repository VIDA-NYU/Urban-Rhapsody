class AudioFrameMetadata:

    def __init__( self, annotations = [], negativeAnnotations = [] ):

        ## user annotations
        self.annotations = annotations
        self.negativeAnnotations = negativeAnnotations