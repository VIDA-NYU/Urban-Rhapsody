class AudioFrame:

    def __init__( self, snippetuid, frameIndex, embeddingIndex: int):

        ## setting uid
        self.uid = f'{snippetuid}_{frameIndex}'

        ## frameindex
        self.frameIndex  = frameIndex

        ## embedding index
        self.embeddingIndex = embeddingIndex


