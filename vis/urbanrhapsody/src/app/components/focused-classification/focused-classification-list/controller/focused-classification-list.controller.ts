import { MiscUtils } from "src/app/utils/misc/misc.utils";

export class FocusedClassificationListController {

    // configs
    public listSize: number = 10;
    // public currentPage: number = 0;
    public focusedClassificationContainerWidth: string = '0px';

    constructor(){}

    public initialize_controller( container: HTMLElement ): void {

        // calculating container width
        this.focusedClassificationContainerWidth = MiscUtils.calculate_spectrogram_container_size( this.listSize, container );
        
    }

}