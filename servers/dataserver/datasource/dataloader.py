from datasource.sonyc.sonycloader import SONYCLoader

class DataLoader:

    @staticmethod
    def load_data( params ):
        return SONYCLoader.load( params )
            

        