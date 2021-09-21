from models.audiosnippet import AudioSnippet

## constants
from config.constants import USTCONSTS
from config.constants import SONYCCONSTS

class PathSolver:

    @staticmethod
    def get_spectrogram_path( datasetname: str, snippetuid: str ) ->  str:

        if(datasetname == 'UST'):
            return PathSolver.__get_spectrogram_path_UST( snippetuid )
        elif(datasetname == 'SONYC'):
            return PathSolver.__get_spectrogram_path_SONYC( snippetuid )
        return ''


    @staticmethod
    def get_audio_path( datasetname: str, snippetuid: str ) -> str:
        
        if(datasetname == 'UST'):
            return PathSolver.__get_audio_path_UST(  snippetuid )
        elif(datasetname == 'SONYC'):
            return PathSolver.__get_audio_path_SONYC ( snippetuid )
        return ''


    ## PRIVATE METHODS 
    @staticmethod
    def __get_spectrogram_path_UST( snippetuid: str ) -> str:

        ## basepath
        basepath: str = USTCONSTS['SPECTROGRAM_BASEPATH']
        spectrogramPath: str = f'{basepath}{snippetuid}.png'

        ## returning
        return spectrogramPath


    @staticmethod
    def __get_spectrogram_path_SONYC( snippetuid: str ) -> str:

        sensorID: str = snippetuid.split('_')[0]

        ## basepath
        basepath: str = SONYCCONSTS['SPECTROGRAM_BASEPATH']
        spectrogramPath: str = f'{basepath}{sensorID}/{snippetuid}.png'

        ## returning
        return spectrogramPath


    @staticmethod
    def __get_audio_path_UST( snippetuid: str ) -> str:

        ## basepath
        basepath: str = USTCONSTS['AUDIO_SNIPPETS_BASEPATH']
        audioPath: str = f'{basepath}{snippetuid}.wav'

        return audioPath

    @staticmethod
    def __get_audio_path_SONYC( snippetuid: str ) -> str:

        sensorID: str = snippetuid.split('_')[0]

        ## basepath
        basepath: str = SONYCCONSTS['AUDIO_SNIPPETS_BASEPATH']
        audioPath: str = f'{basepath}/{sensorID}/{snippetuid}.wav'

        return audioPath