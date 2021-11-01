// model
import { AudioFrame } from "src/app/model/audioframe.model";

// third-party
import * as d3 from 'd3';
import { HistogramComponent } from "src/app/components/histogram/histogram.component";
import { PrototypeState } from "src/app/state/prototype/prototype.state";
import { QueryList } from "@angular/core";

export class OverviewViewSidebarController {

    // histogram refs
    public hourHistogramRef!: HistogramComponent;
    public prototypehistogramrefs!: QueryList<HistogramComponent>;

    constructor( public prototypeState: PrototypeState ){}

    public initialize_controller( hourhistogramref: HistogramComponent, prototypehistogramrefs: QueryList<HistogramComponent> ){

        // saving histogram refs
        this.hourHistogramRef = hourhistogramref;
        this.prototypehistogramrefs = prototypehistogramrefs;

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

        // prototype refs
        this.prototypehistogramrefs.forEach( (prototypeHistogram: HistogramComponent) => {

            // initial prototype distribution array
            const prototypeDistribution: number[] = Array(10).fill(0);   

            const prototypeName: string = prototypeHistogram.histogramController.chartTitle;
            event.frames.map( (frame: AudioFrame) => {

                const prototypeLikelihood: number = Math.floor( frame.metadata.get_prototype_prediction( prototypeName )*10 );
                prototypeDistribution[prototypeLikelihood] += 1;

            });

            // rendering histogram
            prototypeHistogram.histogramController.render_chart( prototypeDistribution );
            
        });
        
    }

}