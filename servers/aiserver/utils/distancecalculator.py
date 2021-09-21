from scipy.spatial import distance

class DistanceCalculator:

    @staticmethod
    def calculate_min_distance( pivotEmbedding, embeddingSet ):

        minDist = float('inf')
        for embedding in embeddingSet: 

            currentDistance = distance.euclidean( embedding, pivotEmbedding )
            minDist = min( currentDistance, minDist )

        return minDist


