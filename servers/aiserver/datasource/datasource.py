from datasource.sonyc.sonycdatasource import SONYCDatasource
from datasource.ust.ustdatasource import USTDatasource
import glob
## consts
from config.constants import SONYCCONSTS


class Datasource:

    '''
        returns a list of uids
    '''
    def get_random_sample( nsamples: int ) -> list[str]:

        basepath = f"{SONYCCONSTS['EMBEDDINGS_BASEPATH']['openl3']}/*"
        
        print( 'BASEPATH: ', glob.glob(basepath) )

        pass

    def get_embeddings( dataset: str, uids, embeddingModel ):

        if( dataset == 'UST'):
            return USTDatasource.get_embeddings( uids, embeddingModel='openl3')
        elif( dataset == 'SONYC'):
            return SONYCDatasource.get_embeddings( uids, embeddingModel=embeddingModel )

    # def get_frame_classification( dataset: str, uids ):

    #     if( dataset == 'UST' ):
    #         return USTDatasource.get_frame_classification(  uids )
    #     elif( dataset == 'SONYC' ):
    #         return SONYCDatasource.get_frame_classification( uids )