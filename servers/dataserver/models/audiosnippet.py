from models.audiosnippetmetadata import AudioSnippetMetadata


class AudioSnippet:

    def __init__( self, uid: str, length: int = 10 ):

        ## setting uids
        self.uid = uid

        ## audiosnippet's frames
        self.frames = []

        ## snippet metadata
        self.metadata: AudioSnippetMetadata = None