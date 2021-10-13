from core.engine import Engine
from flask import Flask, send_from_directory, jsonify, request, Response
from flask_cors import CORS, cross_origin ## remove in production

app = Flask(__name__)
cors = CORS(app) ## remove in production
app.config['CORS_HEADERS'] = 'Content-Type' ## remove in production

## API ENGINE
engine = None

@app.route('/getframeannotations', methods=['POST'])
def get_frame_annotations():

    ## reading parameters
    requestParams = request.get_json()

    ## return list of annotations per frame
    return engine.get_frame_annotations( requestParams['uids'] )

@app.route('/getframesperannotation', methods=['POST'])
def get_frames_per_annotation():

    ## reading parameters
    requestParams = request.get_json()

    ## return list of annotations per frame
    return engine.get_frames_per_annotation( requestParams['annotation'] )


@app.route('/setframeannotations', methods=['POST'])
def set_frame_annotations():

    ## reading parameters
    requestParams = request.get_json()

    return engine.set_frame_annotations( requestParams['uids'], requestParams['annotations'] )

@app.route('/getalllabels', methods=['POST'])
def get_all_labels():

    return engine.get_all_labels()


if __name__ == '__main__':

    ## creating engine
    engine = Engine()

    ## Starting Server
    print('Server is online...')
    app.run(host='0.0.0.0', port=5002, debug=True)