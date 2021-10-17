export class AudioFrameMeta{

    public labels: Set<string> = new Set<string>();

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
        return this.prototypePredictions[prototypeName]
    }

    public add_labels( labels: string[] ): void {

        labels.forEach( (label: string) => {
            this.labels.add(label);
        });

    }

    public get_labels(): string[] {

        return Array.from(this.labels.values());

    }
}