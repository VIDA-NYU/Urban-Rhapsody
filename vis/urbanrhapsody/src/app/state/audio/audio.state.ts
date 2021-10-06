import { Injectable } from "@angular/core";
import { MediaAPI } from "src/app/api/media.api";
import { AudioFrame } from "src/app/model/audioframe.model";
import { AudioSnippet } from "src/app/model/audiosnippet.model";
import { Serializer } from "src/app/utils/serializer.utils";

@Injectable({providedIn: 'root'})

export class AudioState {

    // current audio playing
    private isPlaying: boolean = false;
    private isLoading: boolean = false;
    private audioPlaying!: HTMLAudioElement | any;
    
    public async play_frame( audioFrame: AudioFrame ): Promise<void> {

        // checking if something else was already playing
        if( this.isPlaying ) {

            // pausing current audio
            this.audioPlaying.pause();
            this.audioPlaying = null;

            // setting flag
            this.isPlaying = false;
        }

        if( this.isLoading ){
            return;
        }

        // getting correspondent snippet
        const currentSnippet: AudioSnippet = audioFrame.get_snippet(); 

        // requesting audio snippet
        this.isLoading = true;
        const requestOBJ: { sensorID: string, day: string, snippetID: string } = Serializer.format_uids_snippet_request( currentSnippet );
        const response: any = await MediaAPI.get_encoded_audio( requestOBJ );
        this.audioPlaying = new Audio(  response.base64  );

        return new Promise( (resolve, reject) => {

            // setting stop parameters
            const frameDuration: number = audioFrame.get_snippet().length / audioFrame.get_snippet().frames.length;
            const timeToStart: number = audioFrame.frameIndex * frameDuration;
            const timeToPause: number = timeToStart + frameDuration;

            // setting events
            this.audioPlaying.addEventListener( 'timeupdate', (event: any) => {

                if( (this.audioPlaying !== null) && (this.audioPlaying.currentTime >= timeToPause) ){
                    
                    // pausing audio
                    this.audioPlaying.pause();

                    // setting playing flag
                    this.isPlaying = false;

                    // resolving promise
                    resolve();
                }
            });

            // setting events
            this.audioPlaying.addEventListener( 'ended', (event: any) => {

                // setting playing flag
                this.isPlaying = false;
  
                // resolving promise
                resolve();
            });

            this.audioPlaying.addEventListener("canplaythrough", (event: any) => {

                /* the audio is now playable; play it if permissions allow */
                if( !this.isPlaying ){    
                    
                    // setting playing flag
                    this.isPlaying = true;
                    this.isLoading = false;

                    // setting correct time to start playings
                    this.audioPlaying.currentTime = timeToStart;
                    

                    // playing
                    this.audioPlaying.play();
                }
            });

        });

    }

    public stop_playing(): void {

        if( (this.audioPlaying !== null) && (typeof this.audioPlaying !== 'undefined') ){
                    
            // pausing audio
            this.audioPlaying.pause();

            // setting playing flag
            this.isPlaying = false;
            

        }

    }
    
}