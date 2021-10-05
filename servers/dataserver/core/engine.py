## data loaders
from datasource.dataloader import DataLoader
from media.spectrogram.spectrogramencoder import SpectrogramEncoder
from media.audio.audioencoder import AudioEncoder
from media.pathsolver import PathSolver

## serialization
from serialization.audiosnippetencoder import AudioSnippetEncoder

import json

class Engine:

    def __init__(self):
        pass

    ## OBJECTS
    def get_snippets( self, params ):
        return json.dumps(  DataLoader.load_data( params ) , cls=AudioSnippetEncoder )

    ## MEDIA 
    def get_spectrogram( self, snippet ):

        ## returning
        return json.dumps(
            {
                'base64': SpectrogramEncoder.get_encoded_spectrogram( snippet ), 
                'uid': snippet['snippetID']
            })

    def get_audiosnippet( self, snippet ):
        
        return json.dumps({
            'base64': AudioEncoder.get_encoded_audio( snippet=snippet ), 
            'uid': snippet['snippetID'] 
        })
    