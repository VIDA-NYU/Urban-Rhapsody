from models.audioframemetadata import AudioFrameMetadata

class AudioFrame:

    def __init__( self, snippetuid, frameIndex, embeddingIndex: int ):

        ## setting uid
        self.uid = f'{snippetuid}_{frameIndex}'

        ## frameindex
        self.frameIndex  = frameIndex

        ## embedding index
        self.embeddingIndex = embeddingIndex

        ## frame metadata
        self.metadata = None


    def attach_metadata( self, frameMetadata: AudioFrameMetadata):

        self.metadata = frameMetadata


