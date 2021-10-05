import base64
from media.pathsolver import PathSolver

class SpectrogramEncoder:

    @staticmethod 
    def get_encoded_spectrogram( snippet: str):
        return SpectrogramEncoder.sonyc_encoder( snippet )
            
    ## private methods
    def sonyc_encoder( snippet ):

        ## getting spectrogram path
        spectrogrampath = PathSolver.get_spectrogram_path(  snippet )

        with open(spectrogrampath, "rb") as image_file:
            return f'data:image/png;base64,{base64.b64encode(image_file.read()).decode("utf-8")}'

    