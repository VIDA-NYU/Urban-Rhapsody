import glob
from config.constants import SONYCCONSTS
from datetime import datetime
import pytz

class SONYCFilter:

    nytimezone = pytz.timezone('America/New_York')

    @staticmethod
    def filter_snippets( filters ):

        snippets = glob.glob(f'{SONYCCONSTS["AUDIO_SNIPPETS_BASEPATH"]}/{filters["days"][0].strip()}/*')
        snippets = SONYCFilter.format_snippet_ids( snippets )

        return snippets


    def format_snippet_ids( listOfSnippets: list[str] ) -> list:

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