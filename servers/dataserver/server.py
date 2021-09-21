from datasource.supplementar.complaintsdatasource import ComplaintsDataSource
from core.engine import Engine
from flask import Flask, send_from_directory, jsonify, request, Response
from flask_cors import CORS, cross_origin ## remove in production

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
    return engine.get_spectrogram( dataset=requestParams['dataset'], snippetuid=requestParams['snippetuid'] )

@app.route('/getencodedaudio', methods=['POST'])
def get_encoded_audio():

    ## reading parameters
    requestParams = request.get_json()
    
    return engine.get_audiosnippet( dataset=requestParams['dataset'], snippetuid=requestParams['snippetuid'])

@app.route('/getdata', methods=['POST'])
def get_snippets():

    ## loading data request
    return engine.get_snippets( request.get_json() )


@app.route('/getsuplementardatasets', methods=['POST'])
def get_suplementar_datasets():
    return ComplaintsDataSource.get_noise_complaints()


if __name__ == '__main__':

    ## creating engine
    engine = Engine()

    ## Starting Server
    print('Server is online...')
    app.run(host='0.0.0.0', port=5000, debug=True)