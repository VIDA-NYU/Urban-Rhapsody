from datasource.sonyc.sonycloaderutils import SONYCLoaderUtils

class SONYCFilter:

    @staticmethod
    def filter_snippets( filters, dataframe ):

        sensors = list( map( lambda sensorID: int(sensorID), filters['sensors']))
        startTime = SONYCLoaderUtils.format_date(filters['startDate'])
        endTime = SONYCLoaderUtils.format_date(filters['endDate'])

        if( len(sensors) != 0 ):
            sensorquery = ' or '.join([ f'sensor_id == {sensorID}' for sensorID in sensors ])
            dataframe = dataframe.query(sensorquery)

        ## query by date range
        dataframe = dataframe[ (dataframe['localtime'] >= startTime) & (dataframe['localtime'] <= endTime) ]
        dataframe.sort_values(by=['timestamp'], inplace=True)

        return SONYCFilter.extract_snippet_ids_from_dataframe_rows( dataframe )


    @staticmethod
    def extract_snippet_ids_from_dataframe_rows( dataframe ):

        ## helper set to avoid duplicates
        snippetUIDsSet = set()

        ## list of snippets to return
        snippets = []

        for row in range(dataframe.shape[0]):
            
            dataframeRow = dataframe.iloc[row]
            metadata = SONYCFilter.extract_snippet_metadata( dataframeRow )
            
            if( list(metadata.keys())[0] in snippetUIDsSet):
                continue
            else:
                snippets.append( metadata )

        return snippets

    @staticmethod
    def extract_snippet_metadata( row ):

        ## audio UID
        snippetuid = row['snippetID']

        metadata = {}
        metadata['uid'] = snippetuid
        metadata['sensorID'] = row['sensor_id']
        metadata['sensorHeight'] = 0
        metadata['recordingHour'] = row['hour']
        metadata['localtime'] = row['localtime']

        return metadata