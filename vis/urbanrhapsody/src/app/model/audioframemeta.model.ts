export class AudioFrameMeta{

    // TODO: refactor label variable name
    public labels: Set<string> = new Set<string>();
    public negativeLabels: Set<string> = new Set<string>(['car-horn', 'engine']);

    // prototype predictions
    public prototypePredictions: { [prototypeName: string]:  number } = {};

    constructor( labels: string[] = [] ){

        // adding labels
        this.add_labels( labels );
    }

    public set_prototype_prediction( prototypeName: string, likelihood: number ): void{
        this.prototypePredictions[prototypeName] = likelihood;
    }

    public get_prototype_prediction( prototypeName: string ): number {
        return this.prototypePredictions[prototypeName];
    }

    public add_labels( labels: string[] ): void {

        labels.forEach( (label: string) => {
            this.labels.add(label);
        });

    }

    public add_negative_labels( labels: string[] ): void {

        labels.forEach( (label: string) => {
            this.negativeLabels.add(label);
        });

    }

    public has_label( label: string ): boolean{
        return this.labels.has(label);
    }

    public get_labels(): string[] {

        return Array.from(this.labels.values());

    }

    public get_negative_labels(): string[] {

        return Array.from(this.labels.values());

    }
}