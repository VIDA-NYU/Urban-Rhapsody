import { SpectrogramListComponent } from "src/app/components/media/spectrogram-list/spectrogram-list.component";
import { AudioFrame } from "src/app/model/audioframe.model";
import { AudioState } from "src/app/state/audio/audio.state";
import { DataState } from "src/app/state/data.state";

export class OverviewViewMediaController {

    // component ref
    public spectrogramlistref!: SpectrogramListComponent;

    constructor( public dataState: DataState, public audioState: AudioState ){}

    public initialize_controller( spectrogramlistref: SpectrogramListComponent ): void{

        // saving component ref
        this.spectrogramlistref = spectrogramlistref;

    }

    public on_mouse_enter_spectrogram_frame( event: {frame: AudioFrame} ): void {

        // playing audio
        this.audioState.play_frame( event.frame );

         // highlighting
         this.spectrogramlistref.spectrogramListController.on_mouse_entered_frame( event.frame );
    }

    public on_mouse_leave_spectrogram_frame( event: {frame: AudioFrame} ): void {

        // stop playing
        this.audioState.stop_playing();

        // removing highlight
        this.spectrogramlistref.spectrogramListController.on_mouse_left_frame( event.frame );
    }

    public on_click_spectrogram_frame( event: {frame: AudioFrame, mouseEvent: MouseEvent} ): void {

        if( event.mouseEvent.altKey ){

            if(event.frame.is_selected()) {

                // updating data state
                this.dataState.remove_frames_from_current_selection( [event.frame] );
            
            } else {
                
                // updating data state
                this.dataState.add_frames_to_current_selection( [event.frame] );

            }

            // updating spectrograms
            this.spectrogramlistref.spectrogramListController.update_spectrograms();

        } 
    }

}