import base64
from media.pathsolver import PathSolver

class AudioEncoder:

    @staticmethod
    def get_encoded_audio( dataset: str, snippetuid: str ) -> str:

        if( dataset == 'UST' ):
            return AudioEncoder.__ust_audio_encoder( snippetuid=snippetuid )
        elif( dataset == 'SONYC' ):
            return AudioEncoder.__sonyc_audio_encoder( snippetuid=snippetuid )
        return ''


    @staticmethod
    def __sonyc_audio_encoder( snippetuid ):

        ## getting path for the audio file
        audiopath = PathSolver.get_audio_path( datasetname='SONYC', snippetuid=snippetuid )
        
        ## enconding audio
        with open(audiopath, 'rb') as binary:

            binaryAudio = binary.read()
            b64Audio = base64.b64encode(binaryAudio)
            b64AudioString = b64Audio.decode('utf-8')

        return f'data:audio/ogg;base64,{b64AudioString}'



    @staticmethod
    def __ust_audio_encoder( snippetuid ):

        ## getting path for the audio file
        audiopath = PathSolver.get_audio_path( datasetname='UST', snippetuid=snippetuid )
        
        ## enconding audio
        with open(audiopath, 'rb') as binary:

            binaryAudio = binary.read()
            b64Audio = base64.b64encode(binaryAudio)
            b64AudioString = b64Audio.decode('utf-8')

        return f'data:audio/ogg;base64,{b64AudioString}'

