from models.audiosnippet import AudioSnippet

## constants
from config.constants import USTCONSTS
from config.constants import SONYCCONSTS

class PathSolver:

    @staticmethod
    def get_spectrogram_path( snippet ) ->  str:
        return PathSolver.__get_spectrogram_path( snippet )

    @staticmethod
    def __get_spectrogram_path( snippet ) -> str:

        '''
        
        Format of snippetuids is: {'sensorID': str, 'day': str, 'snippetID': str }
        Example:  {'sensorID': 'sonycnode-b827eb0d8af7.sonyc', 'day': '2017-06-04', 'snippetID': '1496608880'}

        '''

        sensorID: str = snippet['sensorID']
        day: str = snippet['day']
        snippetuid: str = snippet['snippetID']

        ## basepath
        basepath: str = SONYCCONSTS['SPECTROGRAM_BASEPATH']
        spectrogramPath: str = f'{basepath}/{sensorID}/{day}/{snippetuid}.png'        

        ## returning
        return spectrogramPath


    @staticmethod
    def get_audio_path( snippet ) -> str:
        return PathSolver.__get_audio_path ( snippet )


    @staticmethod
    def __get_audio_path( snippet ) -> str:

        sensorID: str = snippet['sensorID']
        day: str = snippet['day']
        snippetuid: str = snippet['snippetID']

        ## basepath
        basepath: str = SONYCCONSTS['AUDIO_SNIPPETS_BASEPATH']
        audioPath: str = f'{basepath}/{sensorID}/{day}/{snippetuid}.wav'

        return audioPath