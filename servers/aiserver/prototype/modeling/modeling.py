from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

import numpy as np
from cuml.ensemble import RandomForestClassifier as cuRFC


class Modeling:

    @staticmethod
    def train_logistic_regression( positiveDict, randomDict, negativeDict ):

        X, y = [], []
        for frameuid, vector in randomDict.items():
            X.append( vector.tolist() )
            y.append(0)

        for frameuid, vector in negativeDict.items():
            X.append( vector.tolist() )
            y.append(0)

        for frameuid, vector in positiveDict.items():
            X.append( vector.tolist() )
            y.append(1)

        print('Training model')
        print('Len X: ', len(X))
        print('Len X: ', len(y))
        clf = LogisticRegression(random_state=0).fit(X, y)
        return clf



    @staticmethod
    def train_random_forest( positiveDict, randomDict, negativeDict ):

        X, y = [], []
        for frameuid, vector in randomDict.items():
            X.append( vector.tolist() )
            y.append(0)

        for frameuid, vector in negativeDict.items():
            X.append( vector.tolist() )
            y.append(0)

        for frameuid, vector in positiveDict.items():
            X.append( vector.tolist() )
            y.append(1)

        print('Training model')
        print('Len X: ', len(X))
        print('Len y: ', len(y))

        X = np.array(X, dtype="float32")
        y = np.array(y, dtype="float32")

        cuml_model = cuRFC(max_features=1.0, n_bins=8, n_estimators=40)
        cuml_model.fit(X,y)
        
        return cuml_model
        

