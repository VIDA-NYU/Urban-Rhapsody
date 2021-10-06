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
        this.audioState.play_frame( event.frame );
    }

    public on_mouse_leave_spectrogram_frame( event: {frame: AudioFrame} ): void {
        this.audioState.stop_playing();
    }

    public on_click_spectrogram_frame( event: {frame: AudioFrame} ): void {
        console.log(event);
    }

}