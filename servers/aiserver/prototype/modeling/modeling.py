from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split


import numpy as np
from cuml.ensemble import RandomForestClassifier as cuRFC


class Modeling:

    @staticmethod
    def build_training_dataset( positiveDict, randomDict, negativeDict ):

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

        ## making np array
        X = np.array(X, dtype="float32")
        y = np.array(y, dtype="float32")

        return X, y

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
    def train_random_forest( X, y ):

        ## splitting
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

        ## training model
        cuml_model = cuRFC(max_features='auto', n_bins=8, n_estimators=40)
        cuml_model.fit(X_train,y_train)

        ## calculating score
        score = cuml_model.score(X_test, y_test)
        
        return cuml_model, score
        

