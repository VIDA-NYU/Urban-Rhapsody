import { MatSelectChange } from "@angular/material/select";
import { LearnAPI } from "src/app/api/learn.api";
import { LabelingState } from "src/app/state/labeling/labeling.state";
import { PrototypeState } from "src/app/state/prototype/prototype.state";

export class PrototypeRefinementDialogController {

    // loading spinner flag
    public refinePrototypeLoading: boolean = false;

    // selected prototype
    public selectedPrototype: string = '';

    // all available prototypes
    public availablePrototypes: string[] = [];

    // labels
    public createdLabels: string[] = [];
    public prototypeLabels: Set<string> = new Set<string>();

    constructor(  public prototypeState: PrototypeState, public labelingState: LabelingState ){}

    public async initialize_controller(): Promise<void> {

        // requesting all available prototypes
        const availablePrototypes: { prototypes: string[] } = await this.prototypeState.get_all_prototypes();
        this.availablePrototypes = availablePrototypes.prototypes;

        // requesting all created labels
        const createdLabels: { labels: string[] } = await this.labelingState.get_all_created_labels();
        this.createdLabels = createdLabels.labels;

    }

    public async on_prototype_selected( prototypeName: MatSelectChange ): Promise<void> {

        const prototypeSummary: { name: string, labels: string[], accuracy: number[] } = await LearnAPI.get_prototype_summary( prototypeName.value );
        this.prototypeLabels = new Set<string>(prototypeSummary.labels);

    }

    public on_prototype_label_added( label: string ): void {

        if( this.prototypeLabels.has(label) ){
            this.prototypeLabels.delete(label);
        } else {
            this.prototypeLabels.add(label);
        }

    }

    public refine_prototype(): void {

        // setting spinner flag
        this.refinePrototypeLoading = true; 

        // refining prototype
        this.prototypeState.refine_prototype( this.selectedPrototype, Array.from(this.prototypeLabels.values()) )

        // setting spinner flag
        this.refinePrototypeLoading = false;

        

    }
}