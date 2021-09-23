from flask import Flask, jsonify, request
from flask_cors import CORS ## remove in production
from core.engine import Engine

app = Flask(__name__)
cors = CORS(app) ## remove in production
app.config['CORS_HEADERS'] = 'Content-Type' ## remove in production

engine = None

@app.route('/getann', methods=['POST'])
def get_ann():

    ## reading params
    requestParams = request.get_json()

    ## calculating ann
    return engine.get_daily_ann( requestParams['vector'] )

if __name__ == '__main__':

    engine = Engine()

    ## Starting Server
    print('Server is online...')
    app.run(host='0.0.0.0', port=5003, debug=True)