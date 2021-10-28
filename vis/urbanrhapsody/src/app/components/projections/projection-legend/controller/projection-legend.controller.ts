export class ProjectionLegendController {

    // current legend
    public currentLegend: string [] = [];  
    
    // color scale
    public currentColorScale!: any;

    constructor(){}


    public initialize_controller(){}

    public update_legends( colorScale: any ): void {

        this.currentLegend = colorScale.domain();
        this.currentColorScale = colorScale;

    }

}