from datasource.sonyc.sonycloader import SONYCLoader
from datasource.ust.ustloader import USTLoader

class DataLoader:

    @staticmethod
    def load_data( params ):
        return SONYCLoader.load( params )
            

        