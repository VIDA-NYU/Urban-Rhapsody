from core.engine import Engine
from flask import Flask, send_from_directory, jsonify, request, Response
from flask_cors import CORS, cross_origin ## remove in production

app = Flask(__name__)
cors = CORS(app) ## remove in production
app.config['CORS_HEADERS'] = 'Content-Type' ## remove in production

## API ENGINE
engine = None

################## ANN ##################
@app.route('/getyeardistribution', methods=['POST'])
def get_year_distribution():

    ## reading parameters
    requestParams = request.get_json()

    return engine.get_nearest_neighbors(  uids=requestParams['uids'] )

@app.route('/getprototypeyeardistribution', methods=['POST'])
def get_prototype_year_distribution():

    ## reading parameters
    requestParams = request.get_json()

    return engine.get_prototype_nearest_neighbors(  prototypeName=requestParams['prototypeName'] )


# ################## PROJECTIONS ##################
@app.route('/projectpoints', methods=['POST'])
def project_points():

    ## reading parameters
    requestParams = request.get_json()

    ## return projection
    return engine.project_points( 
        projectionType=requestParams['projectionType'], 
        embeddingModel=requestParams['embeddingModel'], 
        uids=requestParams['uids'],
        params=requestParams['projectionParams'] )


# ################## CLASSIFICATION ##################
# @app.route('/getframeclassification', methods=['POST'])
# def get_frame_classification():

#     ## reading params
#     requestParams = request.get_json()

#     return engine.get_frame_classification(dataset=requestParams['dataset'], uids=requestParams['uids'] )


# ################## PROTOTYPES ##################
@app.route('/createprototype', methods=['POST'])
def create_prototype():

    ## reading params
    requestParams = request.get_json()

    return engine.set_prototype( requestParams['prototypeName'], requestParams['labels'] )

@app.route('/getallprototypes', methods=['POST'])
def get_all_prototypes():    
    return engine.get_available_prototypes()

@app.route('/applyprototype', methods=['POST'])
def apply_prototype():

    ## reading params
    requestParams = request.get_json()

    return engine.apply_prototype( requestParams['prototypeName'], requestParams['uids'] )
    
if __name__ == '__main__':

    ## creating engine
    engine = Engine()

    ## Starting Server
    print('Server is online...')
    app.run(host='0.0.0.0', port=5001, debug=True)