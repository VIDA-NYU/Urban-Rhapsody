from prototype.sonyc.sonycprototypemanager import SONYCPrototypeManager


class PrototypeManager:

    def __init__(self):

        ## initializing managers
        self.managers = {}
        self.__init_managers()

    def __init_managers(self):
        self.managers['SONYC'] = SONYCPrototypeManager()
        # self.managers['UST'] = 

    def set_prototype( self, dataset, prototypeName: str, uids ):
        self.managers[dataset].set_prototype(prototypeName, uids)

    def get_available_prototypes( self, dataset ):
        return self.managers[dataset].get_available_prototypes()

    def get_prototype_frames( self, dataset, prototypeName ):
        return self.managers[dataset].get_prototype_frames( prototypeName )

    def calculate_prototype( self, dataset, prototypeEmbeddings, requestEmbeddings ):
        return self.managers[dataset].calculate_prototype( prototypeEmbeddings, requestEmbeddings )
