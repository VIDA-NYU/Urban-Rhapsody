from sklearn.cluster import DBSCAN
import numpy as np

class Clusterer:

    @staticmethod
    def calculate_representatives( embeddings ):

        listOfEmbeddings = np.array(list(embeddings.values()))
        clustering = DBSCAN(eps=8, min_samples=10).fit( listOfEmbeddings )
        
        ## calculating centroids
        centroids = []
        clusterID = 0
        while( True ):

            currentClusterPoints = listOfEmbeddings[ clustering.labels_ == clusterID, : ]

            if(currentClusterPoints.shape[0] == 0):
                break
            
            currentCentroid = np.mean(currentClusterPoints, axis=0)
            centroids.append(currentCentroid)

            clusterID += 1
            
        return centroids
