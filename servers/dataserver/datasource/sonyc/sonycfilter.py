import glob
from config.constants import SONYCCONSTS
from datetime import datetime
import pytz

class SONYCFilter:

    nytimezone = pytz.timezone('America/New_York')

    @staticmethod
    def filter_snippets( filters ):

        if( 'snippets' in filters ): 
            return SONYCFilter.filter_snippets_by_examples( filters['snippets'] )

        elif( 'days' in filters ):
            return SONYCFilter.filter_snippets_by_days( filters['days'] )


    ## by examples
    def filter_snippets_by_examples( examples ):

        ## example: {'sensorID': 'u01', 'day': '1992-03-17', 'snippetID': '01_000174'}

        listOfSnippets = []
        for example in examples:

            ## paths
            currentSnippet = SONYCFilter.format_snippet_metadata_by_example( example )
            listOfSnippets.append(currentSnippet)

        return listOfSnippets

    def format_snippet_metadata_by_example( example ):

        metadata = {}
        metadata['uid'] = example['snippetID']

        ## formatting timestamp
        metadata['sensorID'] = example['sensorID']
        metadata['recordingHour'] = 0
        metadata['localtime'] = '00:00:00'
        metadata['localdate'] = example['day']
        
        return metadata

    ## by days
    def filter_snippets_by_days( days ):

        ## days: [ 2017-01-13 ]
        snippets = glob.glob(f'{SONYCCONSTS["AUDIO_SNIPPETS_BASEPATH"]}/saf7/{days[0].strip()}/*')
        
        return SONYCFilter.format_snippet_objs( snippets )


    def format_snippet_objs( listOfSnippets: list[str] ) -> list:

        ## returning list
        formattedListOfSnippets = []

        for snippet in listOfSnippets:
            
            currentFormattedSnippet = SONYCFilter.extract_snippet_metadata(snippet)
            formattedListOfSnippets.append(currentFormattedSnippet)

        return formattedListOfSnippets

    @staticmethod
    def extract_snippet_metadata( snippetfilename: str ):

        ## audio UID
        snippetUID = snippetfilename.split('/')[-1].split('.')[0]

        metadata = {}
        metadata['uid'] = snippetUID

        ## casting timestamp
        utc_dt = datetime.utcfromtimestamp(int(snippetUID)).replace(tzinfo=pytz.utc)
        currentSnippetTime = utc_dt.astimezone(SONYCFilter.nytimezone)

        ## formatting timestamp
        metadata['sensorID'] = snippetfilename.split('/')[-3]
        metadata['recordingHour'] = currentSnippetTime.hour
        metadata['localtime'] = currentSnippetTime.strftime('%H:%M:%S')
        metadata['localdate'] = currentSnippetTime.strftime('%Y-%m-%d')
        
        return metadata