

class Evaluator:

    @staticmethod
    def evaluate_previous_models( models, X, y ):
        
        scores = []
        for index in range(len(models)-1):
            currentScore = models[index].score(X, y)
            scores.append(currentScore)

        return scores

    @staticmethod
    def evaluate_all_models( models, X, y ):
        
        scores = []
        for index in range(len(models)):
            currentScore = models[index].score(X, y)
            scores.append(currentScore)

        return scores