// model
import { AudioFrame } from "src/app/model/audioframe.model";

// third-party
import * as d3 from 'd3';
import { HistogramComponent } from "src/app/components/histogram/histogram.component";

export class OverviewViewSidebarController {

    public hourHistogramRef!: HistogramComponent;

    constructor(){}

    public initialize_controller( hourhistogramref: HistogramComponent ){

        // saving histogram refs
        this.hourHistogramRef = hourhistogramref;

    }

    public on_frames_brushed( event: { frames: AudioFrame[] } ): void {

        // generating daily histograms
        const hourDistribution: number[] = Array(24).fill(0);
        event.frames.map( (frame: AudioFrame) => { hourDistribution[ frame.get_snippet().metadata.recordingHour ]++; });
        this.hourHistogramRef.histogramController.render_chart( hourDistribution );
        
    }
}