from sklearn.linear_model import LogisticRegression

class Modeling:

    @staticmethod
    def train_logistic_regression( positiveDict, negativeDict ):

        X, y = [], []
        for frameuid, vector in negativeDict.items():
            X.append( vector.tolist() )
            y.append(0)

        for frameuid, vector in positiveDict.items():
            X.append( vector.tolist() )
            y.append(1)

        print('Training model')
        clf = LogisticRegression(random_state=0).fit(X, y)
        return clf
        

