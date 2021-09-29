
## CONSTANTS
from models.audioframe import AudioFrame
from config.constants import USTCONSTS
from config.constants import QUERYEXAMPLES

## third-party
import pandas as pd
import glob

## helpers
from datasource.ust.ustfilter import USTFilter

## model
from models.audiosnippet import AudioSnippet
from models.audiosnippetmetadata import AudioSnippetMetadata

## IMPORTANT NOTES
'''
    ID of frames audiofile_frameindex. eg: 12_12345_0
'''
class USTLoader:


    @staticmethod
    def load( params ):

        ## list of available embeddings
        availableEmbeddings = USTLoader.get_available_embeddings()

        ## list of audio snippets that will be returned
        listOfAudioSnippets: list[AudioSnippet] = []

        ## filterd uids
        snippets = USTFilter.filter_snippets( params['filters'], USTLoader.load_dataframe() )

        for snippet in snippets:

            if( not( snippet['uid'] in availableEmbeddings ) ):
                continue

            ## current audio snippet being parsed
            currentAudioSnippet = AudioSnippet( uid=snippet['uid'], length=USTCONSTS['SNIPPETCONSTS']['LENGTH'] )
            currentAudioSnippet.metadata = AudioSnippetMetadata( sensorID=snippet['sensorID'], recordingHour=snippet['recordingHour'], sensorHeight=snippet['sensorHeight'] )

            snippetFrames = USTLoader.create_frames( currentAudioSnippet )
            currentAudioSnippet.frames = snippetFrames
        
            ## list of audio snippets
            listOfAudioSnippets.append(currentAudioSnippet)


        return listOfAudioSnippets


    @staticmethod
    def load_dataframe():
        return pd.read_csv(USTCONSTS['METADATA'])

    @staticmethod
    def create_frames( audioSnippet: AudioSnippet ):

        snippetFrames: list[AudioFrame] = []

        for frameIndex in range( USTCONSTS['FRAMECONSTS']['FRAMESPERAUDIO'] ):

            ## creating frame obj
            embeddingIndex = (frameIndex * 2) + 1
            currentFrame = AudioFrame( audioSnippet.uid, frameIndex=frameIndex, embeddingIndex=embeddingIndex)   

            ## appending to list of frames
            snippetFrames.append(currentFrame)

        return snippetFrames

    @staticmethod
    def get_available_embeddings( ):

        embeddings = glob.glob('../../data/ust/features/l3-mel256-env-512/48k/*')
        embeddings = list( map(lambda embeddingPath: embeddingPath.split('/')[-1].split('.npz')[0], embeddings ))
        embeddings = set(embeddings)

        return embeddings