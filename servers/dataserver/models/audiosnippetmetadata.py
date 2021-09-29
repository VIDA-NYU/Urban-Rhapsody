class AudioSnippetMetadata:

    def __init__(self, sensorID, recordingHour=0, localtime='00:00:00', localdate='2020-01-10', sensorHeight=0):

        ## id of the sensor that recorded the audio snippet
        self.sensorID = f'{sensorID}'

        ## height where the sensor is
        self.sensorHeight = f'{int(sensorHeight)}'
        
        ## hour when the snippet was recorded
        self.recordingHour = f'{recordingHour}'

        ## NYC recording date and time
        self.localtime = localtime
        self.localdate = localdate
