##from sklearn.cluster import DBSCAN
#3import hdbscan
import numpy as np
from cuml.cluster import HDBSCAN
from scipy.cluster.hierarchy import linkage
from scipy.cluster import hierarchy
from cuml.cluster import AgglomerativeClustering as CUMLAgglomerativeClustering


##from matplotlib import pyplot as plt
from scipy.cluster.hierarchy import dendrogram
##from sklearn.datasets import load_iris
from sklearn.cluster import AgglomerativeClustering


class Clusterer:

    @staticmethod
    def generate_cluster_tree( frames ):

        embeddings = list( map(lambda uid: frames[uid], frames ))
        frames = list( frames.keys() )

        clustering = linkage(embeddings, 'ward')
        rootnode, nodelist = hierarchy.to_tree(clustering, rd=True)

        ##np_embeddings = np.array( embeddings, dtype='float32')
        ##cumodel = CUMLAgglomerativeClustering()
        ##cumodel.fit(np_embeddings)

        ## formatting output
        output = {}
        output['depth'] = 0
        output['indices'] = None
        output['children'] = [ Clusterer.get_branch(rootnode.left, rootnode.get_count(), 1, 5, frames), Clusterer.get_branch(rootnode.right, rootnode.get_count(), 1, 3, frames) ]
        
        return output


    
    ## tree utils
    @staticmethod
    def get_branch(node, nsamples, currentdepth, maxdepth, frames):
    
        if(currentdepth >= maxdepth or node.id < nsamples):
            return { 
                'depth': currentdepth, 
                'children': [], 
                'indices': Clusterer.get_all_below(node, nsamples, frames)
            }
        
        else:
            return { 
                'depth': currentdepth,
                'children': [
                    Clusterer.get_branch(node.left, nsamples, currentdepth+1, maxdepth, frames),
                    Clusterer.get_branch(node.right, nsamples, currentdepth+1, maxdepth, frames)
                ],
                'indices': None }

    @staticmethod
    def get_all_below(node, nsamples, frames):
    
        if(node.id < nsamples):
            return [ frames[node.id] ]
        
        else:
            left_list =  Clusterer.get_all_below(node.left, nsamples, frames)
            right_list = Clusterer.get_all_below(node.right, nsamples, frames)
            
            return left_list + right_list

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
