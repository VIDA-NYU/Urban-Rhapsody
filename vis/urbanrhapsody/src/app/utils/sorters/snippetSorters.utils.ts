import { AudioSnippet } from "src/app/model/audiosnippet.model";

export class SnippetSorters {

    public static sort_frames( sortingCriteria: string, snippets: AudioSnippet[] ): void {

        switch( sortingCriteria ){
            case 'by_datetime': return this.sort_frames_by_time( snippets );
        }

    }


    private static sort_frames_by_time( snippets: AudioSnippet[] ): void {

        const compare = (a: AudioSnippet, b: AudioSnippet) => {
            if (a.metadata.localDatetime <= b.metadata.localDatetime) return -1;
            if (a.metadata.localDatetime > b.metadata.localDatetime) return 1;
            return 0;
        }

        snippets.sort( ( a: AudioSnippet, b: AudioSnippet ) => compare(a, b) )

    }


}