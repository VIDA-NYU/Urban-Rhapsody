import { QueryList } from "@angular/core";
import * as _ from "lodash";
import { DataLoadingAPI } from "src/app/api/dataloading.api";
import { AudioFrame } from "src/app/model/audioframe.model";
import { AudioSnippet } from "src/app/model/audiosnippet.model";
import { AudioState } from "src/app/state/audio/audio.state";
import { DataState } from "src/app/state/data.state";
import { Deserializer } from "src/app/utils/deserializer.util";
import { SNIPPETEXAMPLES, SNIPPETEXAMPLESLABELS } from '../../../../utils/constants/constants'; 
import { SnippetExampleComponent } from "../snippet-example/snippet-example.component";

export class SimilarityExampleLoaderController {

    // slider value
    public sliderValue: number = 100; 
    public exampleLabels: string[] = SNIPPETEXAMPLESLABELS;

    // examples snippets to be shown
    public exampleSnippets: AudioSnippet[] = [];
    public indexedFrames: { [frameUID: string ] : AudioFrame } = {};

    // snippet example ref
    public snippetExampleRefs!: QueryList<SnippetExampleComponent>;

    // state refs
    public audioState!: AudioState;
    public dataState!: DataState;

    // selected frame
    public selectedFrame!: AudioFrame;

    constructor( ){}

    public initialize_controller( 
        snippetExample: QueryList<SnippetExampleComponent>, 
        audioState: AudioState, 
        dataState: DataState ): void{

        // saving refs
        this.audioState = audioState;
        this.dataState = dataState;

        this.snippetExampleRefs = snippetExample;

        // loading examples
        this.load_examples();
    }
    

    public mouse_entered_frame( event: {frame: AudioFrame} ): void{

        const currentFrame: AudioFrame = this.indexedFrames[event.frame.uid];
        currentFrame.set_selection(true);

        // play audio
        this.audioState.play_frame( event.frame );

        // updating spectrogram
        this.snippetExampleRefs.forEach( (snippetExample: SnippetExampleComponent ) => {
            snippetExample.spectrogramref.spectrogramController.update_frame_grid();
        });        

    }

    public mouse_left_frame( event: {frame: AudioFrame}): void{

        const currentFrame: AudioFrame = this.indexedFrames[event.frame.uid];
        currentFrame.set_selection(false);

        // pause audio
        this.audioState.stop_playing();

        // updating spectrogram
        this.snippetExampleRefs.forEach( (snippetExample: SnippetExampleComponent ) => {
            snippetExample.spectrogramref.spectrogramController.update_frame_grid();
        });

    }

    public frame_selected( event: {frame: AudioFrame} ): void{
        
        this.selectedFrame = event.frame;
        this.dataState.load_year_distribution( [this.selectedFrame], this.sliderValue );

    }

    private async load_examples(): Promise<any> {
    
        /**
        * Loading snippets examples 
        */

        const filters: {} = { snippets: SNIPPETEXAMPLES };
        const rawExamples: any = await DataLoadingAPI.load_data('sonyc', filters )
        const indexedData: {indexedSnippets: any, indexedFrames: any} = Deserializer.deserialize_snippets( rawExamples )

        // saving snippets
        this.exampleSnippets = Object.values(indexedData.indexedSnippets); 
        this.indexedFrames = indexedData.indexedFrames;

    }

}