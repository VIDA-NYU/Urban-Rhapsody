from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier


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
    def train_random_forest( positiveDict, negativeDict ):

        X, y = [], []
        for frameuid, vector in negativeDict.items():
            X.append( vector.tolist() )
            y.append(0)

        for frameuid, vector in positiveDict.items():
            X.append( vector.tolist() )
            y.append(1)

        print('Training model')
        print('Len X: ', len(X))
        print('Len X: ', len(y))

        clf = RandomForestClassifier(max_depth=3, random_state=0)
        clf.fit(X, y)
        return clf
        

