import { AudioFrame } from "src/app/model/audioframe.model";

export class OverviewViewMediaController {

    constructor(){}

    public on_mouse_enter_spectrogram_frame( event: {frame: AudioFrame} ): void {
        // this.audioState.play_frame( event.frame );
    }

    public on_mouse_leave_spectrogram_frame( event: {frame: AudioFrame} ): void {
        console.log(event);
    }

    public on_click_spectrogram_frame( event: {frame: AudioFrame} ): void {
        console.log(event);
    }

}