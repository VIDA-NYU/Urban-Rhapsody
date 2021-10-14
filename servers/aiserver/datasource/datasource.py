from utils.responseformatter import ResponseFormatter
from datasource.sonyc.sonycdatasource import SONYCDatasource

## native
import glob
import random

## consts
from config.constants import SONYCCONSTS


class Datasource:

    '''
        returns a list of uids
    '''
    def get_random_sample( nsamples: int ):

        pathregex = f"{SONYCCONSTS['EMBEDDINGS_BASEPATH']['openl3']}/*/*/*"
        files = glob.glob(pathregex)
        files = random.sample( files, nsamples )
        return ResponseFormatter.format_random_sample( files )


    def get_embeddings( uids, embeddingModel ):
        return SONYCDatasource.get_embeddings( uids, embeddingModel=embeddingModel )