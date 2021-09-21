import base64
from media.pathsolver import PathSolver

class SpectrogramEncoder:

    @staticmethod 
    def get_encoded_spectrogram( dataset: str, snippetUid: str):

        if( dataset == 'UST' ):
            return SpectrogramEncoder.ust_encoder( snippetUid=snippetUid )
        elif( dataset == 'SONYC'):
            return SpectrogramEncoder.sonyc_encoder( snippetUid )
            
    ## private methods
    def sonyc_encoder( snippetUid: str ):

        ## getting spectrogram path
        spectrogrampath = PathSolver.get_spectrogram_path( 'SONYC',  snippetUid )

        with open(spectrogrampath, "rb") as image_file:
            return f'data:image/png;base64,{base64.b64encode(image_file.read()).decode("utf-8")}'


    @staticmethod
    def ust_encoder( snippetUid: str ):

        ## getting spectrogram path
        spectrogrampath = PathSolver.get_spectrogram_path( 'UST',  snippetUid )

        with open(spectrogrampath, "rb") as image_file:
            return f'data:image/png;base64,{base64.b64encode(image_file.read()).decode("utf-8")}'

    