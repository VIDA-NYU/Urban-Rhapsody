from datetime import datetime
from os import stat
# import pandas as pd
from config.constants import SONYCCONSTS
# import glob
import json
import requests

class SONYCLoaderUtils:

    @staticmethod
    def request_frame_anntations( uids: list[str] ):
                
        ## making request
        response = requests.post('http://localhost:5002/getframeannotations', json={'uids': uids} )
        return json.loads(response.text)

    @staticmethod
    def request_frame_negative_annotations( uids: list[str] ):

        ## making request
        response = requests.post('http://localhost:5002/getframenegativeannotations', json={'uids': uids} )
        return json.loads(response.text)


    @staticmethod
    def format_date( incomingdate: str ) -> str:

        formattedDate = datetime.strptime(incomingdate, '%Y-%m-%dT%H:%M')
        formattedDate = formattedDate.strftime('%Y-%m-%d %H:%M:%S')
        return formattedDate

