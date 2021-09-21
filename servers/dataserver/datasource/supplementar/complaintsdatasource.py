from config.constants import SUPPLEMENTARDATASETS

import pandas as pd
import json
import numpy as np
from datetime import datetime

class ComplaintsDataSource:

    @staticmethod
    def get_noise_complaints():

        ## reading dataset
        df = pd.read_csv( SUPPLEMENTARDATASETS['NOISECOMPLAINTS'] )
        df['Incident Address'] = df['Incident Address'].replace(np.nan, 'Not Provided')
        df.sort_values(by='Created Date', inplace=True)

        complaints = []
        for rowindex in range(df.shape[0]):
            complaints.append(ComplaintsDataSource.format_complaint_row( df.iloc[rowindex] ))

        return json.dumps({'complaints': complaints})

    @staticmethod
    def format_complaint_row( row ):

        currentDatetime = datetime.strptime(row['Created Date'], '%Y-%m-%d %H:%M:%S')
        currentDate = currentDatetime.strftime('%Y-%m-%d')
        currentTime = currentDatetime.strftime('%H:%M:%S')

        return {
            'date': currentDate,
            'time': currentTime,
            'type': row['Descriptor'],
            'lat': row['Latitude'],
            'lng': row['Longitude'],
            'address': row["Incident Address"]
        }