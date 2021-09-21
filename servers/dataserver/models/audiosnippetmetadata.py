class AudioSnippetMetadata:

    def __init__(self, sensorID, sensorHeight=0, recordingHour=0, localtime='2020-01-10 00:00:00'):

        ## id of the sensor that recorded the audio snippet
        self.sensorID = f'{sensorID}'

        ## height where the sensor is
        self.sensorHeight = f'{int(sensorHeight)}'
        
        ## hour when the snippet was recorded
        self.recordingHour = f'{recordingHour}'

        ## NYC recording time
        self.localtime = localtime