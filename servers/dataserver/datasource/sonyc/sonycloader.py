## constants
from config.constants import SONYCCONSTS

## model
from models.audiosnippetmetadata import AudioSnippetMetadata
from models.audioframe import AudioFrame
from models.audiosnippet import AudioSnippet

from datasource.sonyc.sonycfilter import SONYCFilter
from datasource.sonyc.sonycloaderutils import SONYCLoaderUtils

class SONYCLoader:

    @staticmethod
    def load( params ):

        # list of audio snippets that will be returned
        listOfAudioSnippets: list[AudioSnippet] = []

        ## list of filtered snippets
        filteredSnippets = SONYCFilter.filter_snippets( params['filters'] )
        
        for snippet in filteredSnippets:

            ## current audio snippet being parsed
            currentAudioSnippet = AudioSnippet( uid=snippet['uid'], length=SONYCCONSTS['SNIPPETCONSTS']['LENGTH'] )
            currentAudioSnippet.metadata = AudioSnippetMetadata( sensorID=snippet['sensorID'], recordingHour=snippet['recordingHour'], localtime=snippet['localtime'], localdate=snippet['localdate'] )

            snippetFrames = SONYCLoader.create_frames( currentAudioSnippet )
            currentAudioSnippet.frames = snippetFrames
        
            ## list of audio snippets
            listOfAudioSnippets.append(currentAudioSnippet)
 
        return listOfAudioSnippets 


    @staticmethod
    def create_frames( audioSnippet: AudioSnippet ):

        ## frames
        snippetFrames: list[AudioFrame] = []

        for frameIndex in range( SONYCCONSTS['FRAMECONSTS']['FRAMESPERAUDIO'] ):

            ## creating frame obj
            embeddingIndex = frameIndex ##(frameIndex * 2) + 1
            currentFrame = AudioFrame( audioSnippet.uid, frameIndex=frameIndex, embeddingIndex=embeddingIndex)   

            ## appending to list of frames
            snippetFrames.append(currentFrame)

        return snippetFrames
           