from core.engine import Engine
from flask import Flask, request
from flask_cors import CORS ## remove in production

app = Flask(__name__)
cors = CORS(app) ## remove in production
app.config['CORS_HEADERS'] = 'Content-Type' ## remove in production

## API ENGINE
engine = None

@app.route('/getencodedspectrogram', methods=['POST'])
def get_encoded_spectrogram():

    ## reading parameters
    requestParams = request.get_json()

    ## return base64 encoded spectrogram
    return engine.get_spectrogram( snippet=requestParams['snippet'] )

@app.route('/getencodedaudio', methods=['POST'])
def get_encoded_audio():

    ## reading parameters
    requestParams = request.get_json()
    
    return engine.get_audiosnippet( snippet=requestParams['snippetuid'])

@app.route('/getdata', methods=['POST'])
def get_snippets():

    ## loading data request
    return engine.get_snippets( request.get_json() )


if __name__ == '__main__':

    ## creating engine
    engine = Engine()

    ## Starting Server
    print('Server is online...')
    app.run(host='0.0.0.0', port=5000, debug=True)