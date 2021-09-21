from datasource.sonyc.sonycdatasource import SONYCDatasource
from datasource.ust.ustdatasource import USTDatasource


class Datasource:

    def get_embeddings( dataset: str, uids: list[str], embeddingModel ):

        if( dataset == 'UST'):
            return USTDatasource.get_embeddings( uids, embeddingModel='openl3')
        elif( dataset == 'SONYC'):
            return SONYCDatasource.get_embeddings( uids, embeddingModel=embeddingModel )


    def get_frame_classification( dataset: str, uids ):

        if( dataset == 'UST' ):
            return USTDatasource.get_frame_classification(  uids )
        elif( dataset == 'SONYC' ):
            return SONYCDatasource.get_frame_classification( uids )