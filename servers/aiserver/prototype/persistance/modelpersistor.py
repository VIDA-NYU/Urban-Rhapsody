import pickle

class ModelPersistor:

    def save_model( model ):

        filename = 'finalized_model.sav'
        pickle.dump(model, open(filename, 'wb'))
        # pickle.dumps( model )

    def load_model():
        # model = pickle.loads(s)
        pass

    def save_representatives():
        pass

    def load_representatives():
        pass