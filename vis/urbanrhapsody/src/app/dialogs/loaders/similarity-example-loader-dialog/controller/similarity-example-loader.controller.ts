import { DataLoadingAPI } from "src/app/api/dataloading.api";
import { AudioSnippet } from "src/app/model/audiosnippet.model";
import { Deserializer } from "src/app/utils/deserializer.util";
import { SNIPPETEXAMPLES } from '../../../../utils/constants/constants'; 

export class SimilarityExampleLoaderController {

    // examples snippets to be shown
    public exampleSnippets: AudioSnippet[] = [];

    constructor(){}


    public initialize_controller(): void{

        this.load_examples();
    }
    
    private async load_examples(): Promise<any> {
    
        /**
        * Loading snippets examples 
        */

        const filters: {} = { sensors: [], userlabels: [], hours: [], snippets: SNIPPETEXAMPLES };
        const rawExamples: any = await DataLoadingAPI.load_data('UST', filters )
        const indexedData: {indexedSnippets: any, indexedFrames: any} = Deserializer.deserialize_snippets( rawExamples )

        // saving snippets
        this.exampleSnippets = Object.values(indexedData.indexedSnippets); 

    }

}