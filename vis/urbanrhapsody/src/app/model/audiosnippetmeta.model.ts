import { MiscUtils } from "../utils/misc/misc.utils";

export class AudioSnippetMeta {

    constructor( 
        public sensorID: string, 
        public sensorHeight: string, 
        public recordingHour: number, 
        public localDatetime: Date,
        public localdate: string ){}


        public get_formatted_time(): string{
            return MiscUtils.format_time( this.localDatetime );
        }

}