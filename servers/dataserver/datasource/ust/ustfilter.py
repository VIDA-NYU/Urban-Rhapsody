class USTFilter:

    @staticmethod
    def filter_snippets( filters, dataframe ):

        ## query parameters
        sensors = filters['sensors']
        userslabels = filters['userlabels']
        hours = filters['hours']
        snippets = filters['snippets']

        # building and running queries
        if( len(sensors) != 0 ):
            sensorquery = ' or '.join([ f'sensor_id == {sensorID}' for sensorID in sensors ])
            dataframe = dataframe.query(sensorquery)

        if( len(userslabels) != 0 ):
            labelquery = ' or '.join([ f'`{label}` == 1' for label in userslabels ])
            dataframe = dataframe.query(labelquery)

        if( len(hours) != 0) :
            hourquery = ' or '.join([ f'hour == {hour}' for hour in hours ])
            dataframe = dataframe.query(hourquery)

        if( len(snippets) != 0) :
            snippetsquery = ' or '.join([ f'audio_filename == "{snippet}"' for snippet in snippets ])
            dataframe = dataframe.query(snippetsquery)

        ## TODO: Experiment with different sampling methods
        # if(dataframe.shape[0] > 1000):
        #     dataframe = dataframe.sample(n=1000, random_state=42)
        
        
        ## filtered uids
        filtereduids = USTFilter.extract_snippet_ids_from_dataframe_rows( dataframe )

        return filtereduids


    @staticmethod
    def extract_snippet_ids_from_dataframe_rows( dataframe ):

        ## helper set to avoid duplicates
        snippetUIDsSet = set()

        ## list of snippets to return
        snippets = []

        for row in range(dataframe.shape[0]):
            
            dataframeRow = dataframe.iloc[row]
            metadata = USTFilter.extract_snippet_metadata( dataframeRow )

            if( metadata['uid'] in snippetUIDsSet):
                continue
            else:
                snippetUIDsSet.add(metadata['uid'])
                snippets.append( metadata )

        return snippets

    @staticmethod
    def extract_snippet_metadata( row ):

        ## audio UID
        snippetuid = row['audio_filename'].split('.wav')[0]

        metadata = {}
        metadata['uid'] = snippetuid
        metadata['sensorID'] = row['sensor_id']
        metadata['sensorHeight'] = row['height_ft']
        metadata['recordingHour'] = row['hour']

        return metadata
