// model
import { AudioFrame } from "src/app/model/audioframe.model";

// third-party
import * as d3 from 'd3';
import { HistogramComponent } from "src/app/components/histogram/histogram.component";
import { PrototypeState } from "src/app/state/prototype/prototype.state";

export class OverviewViewSidebarController {

    public hourHistogramRef!: HistogramComponent;

    constructor( public prototypeState: PrototypeState ){}

    public initialize_controller( hourhistogramref: HistogramComponent ){

        // saving histogram refs
        this.hourHistogramRef = hourhistogramref;

    }

    public on_day_loaded( frames: AudioFrame[] ): void {

        // generating daily histograms
        const hourDistribution: number[] = Array(24).fill(0);
        frames.map( (frame: AudioFrame) => { hourDistribution[ frame.get_snippet().metadata.recordingHour ]++; });
        this.hourHistogramRef.histogramController.render_chart( hourDistribution );

    }

    public on_frames_brushed( event: { frames: AudioFrame[] } ): void {

        // generating daily histograms
        const hourDistribution: number[] = Array(24).fill(0);
        event.frames.map( (frame: AudioFrame) => { hourDistribution[ frame.get_snippet().metadata.recordingHour ]++; });
        this.hourHistogramRef.histogramController.render_chart( hourDistribution );
        
    }

}