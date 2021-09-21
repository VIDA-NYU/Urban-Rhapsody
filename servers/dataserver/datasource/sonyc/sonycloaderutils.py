from datetime import datetime
import pandas as pd
from config.constants import SONYCCONSTS
import glob

class SONYCLoaderUtils:

    @staticmethod
    def format_date( incomingdate: str ) -> str:

        formattedDate = datetime.strptime(incomingdate, '%Y-%m-%dT%H:%M')
        formattedDate = formattedDate.strftime('%Y-%m-%d %H:%M:%S')
        return formattedDate


    @staticmethod
    def open_dataframe():
        return pd.read_csv(SONYCCONSTS['METADATA'])

