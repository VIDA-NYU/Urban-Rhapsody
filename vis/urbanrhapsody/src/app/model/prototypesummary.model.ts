export class PrototypeSummary {

    constructor( public name: string, public labels: string[], public accuracies: number[][], public representativeFrames: any ){}

    public get_number_of_refinements(): number{
        return this.accuracies.length;
    }
    
}