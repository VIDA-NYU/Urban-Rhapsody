class FilterHelper:

    @staticmethod
    def filter_frames_by_model_confidence( indexNeighbors, frameConfidence, confidenceThreshold ):

        neighborsPerDay = {}

        for day in indexNeighbors:
            
            for frameuid in indexNeighbors[day]['frames']:
                
                if( frameConfidence[frameuid] >= confidenceThreshold ):

                    if( not( day in neighborsPerDay ) ):
                        
                        ## creating new day entry
                        neighborsPerDay[day] = { 'count': 0, 'frames': [] }

                    neighborsPerDay[day]['frames'].append( frameuid )
                    neighborsPerDay[day]['count'] += 1
                
                
        return neighborsPerDay