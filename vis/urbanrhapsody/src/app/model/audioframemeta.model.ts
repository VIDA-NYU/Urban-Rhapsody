export class AudioFrameMeta{

    public labels: Set<string> = new Set<string>();

    constructor( labels: string[] = [] ){

        // adding labels
        this.add_labels( labels );
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