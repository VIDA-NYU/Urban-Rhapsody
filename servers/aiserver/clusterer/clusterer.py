from sklearn.cluster import DBSCAN
import hdbscan
import numpy as np
from cuml.cluster import HDBSCAN


class Clusterer:

    # @staticmethod
    # def calculate_representatives( embeddings ):

    #     listOfEmbeddings = np.array(list(embeddings.values()))
    #     clustering = DBSCAN(eps=8, min_samples=10).fit( listOfEmbeddings )
        
    #     ## calculating centroids
    #     centroids = []
    #     clusterID = 0
    #     while( True ):

    #         currentClusterPoints = listOfEmbeddings[ clustering.labels_ == clusterID, : ]

    #         if(currentClusterPoints.shape[0] == 0):
    #             break
            
    #         currentCentroid = np.mean(currentClusterPoints, axis=0)
    #         centroids.append(currentCentroid)

    #         clusterID += 1
            
    #     return centroids


    @staticmethod
    def calculate_representatives_hdbscan( embeddings ):

        listOfEmbeddings = np.array( list(embeddings.values()), dtype="float32" )

        clusterer = HDBSCAN(min_samples=10, gen_min_span_tree=True)
        cluster_labels = clusterer.fit_predict(listOfEmbeddings)

        ##clusterer = hdbscan.HDBSCAN(min_cluster_size=10)
        ##cluster_labels = clusterer.fit_predict(listOfEmbeddings)

        ## checking if no cluster was created
        currentClusterPoints = listOfEmbeddings[ cluster_labels == -1, : ]
        if( currentClusterPoints.shape[0] == listOfEmbeddings.shape[0] ):
            currentCentroid = np.mean(currentClusterPoints, axis=0)
            return [currentCentroid]
        

        ## calculating centroids
        centroids = []
        clusterID = 0

        while( True ):

            currentClusterPoints = listOfEmbeddings[ cluster_labels == clusterID, : ]

            if(currentClusterPoints.shape[0] == 0):
                break
            
            currentCentroid = np.mean(currentClusterPoints, axis=0)
            centroids.append(currentCentroid)

            clusterID += 1
            
        return centroids
