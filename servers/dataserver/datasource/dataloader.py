from datasource.sonyc.sonycloader import SONYCLoader
from datasource.ust.ustloader import USTLoader

class DataLoader:

    @staticmethod
    def load_data( params ):
        
        if( params['datasetname'] == 'UST' ):
            return USTLoader.load( params )

        if( params['datasetname'] == 'sonyc' ):
            return SONYCLoader.load( params )

        