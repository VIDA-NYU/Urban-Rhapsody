import base64
from media.pathsolver import PathSolver

class AudioEncoder:

    @staticmethod
    def get_encoded_audio( snippet ) -> str:
        return AudioEncoder.__audio_encoder( snippet=snippet )


    @staticmethod
    def __audio_encoder( snippet ):

        ## getting path for the audio file
        audiopath = PathSolver.get_audio_path( snippet=snippet )
        
        ## enconding audio
        with open(audiopath, 'rb') as binary:

            binaryAudio = binary.read()
            b64Audio = base64.b64encode(binaryAudio)
            b64AudioString = b64Audio.decode('utf-8')

        return f'data:audio/ogg;base64,{b64AudioString}'

