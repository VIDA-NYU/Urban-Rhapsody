// third-party
import * as _ from 'lodash';

export class MiscUtils {


    public static dictToValues( dictobj: {} ): any[] {
        return Object.values( dictobj );
    }

    public static dictToKeys( dictobj: {} ): any[] {
        return Object.keys( dictobj );
    }

    public static format_US_datetime( datetime: Date ): string{

        const year: string = `${datetime.getFullYear()}`;
        const month: string = `0${datetime.getMonth()+1}`.slice(-2);
        const day: string = `0${datetime.getDate()}`.slice(-2);

        const currentDatetimeString: string = `${year}-${month}-${day}`
        return currentDatetimeString;
    }

    public static format_time( datetime: Date ): string{

        const hour: string = `0${datetime.getHours()}`.slice(-2);
        const minutes: string = `0${datetime.getMinutes()}`.slice(-2);
        const seconds: string = `0${datetime.getSeconds()}`.slice(-2);

        const currentDatetimeString: string = `${hour}:${minutes}:${seconds}`
        return currentDatetimeString;
    }

    // generates the distribution of events within a day
    // currently generates the amount of retrieved instances for morning/afternoon12/night
    public static generate_slice_distribution( instance:any ): { period: number, count: number }[]{

        const dayDistribution: { period: number, count: number, total: 0 }[] = [{ period: 0, count: 0, total: instance.paths.length }, { period: 1, count: 0, total: instance.paths.length }, { period: 2, count: 0, total: instance.paths.length }, { period: 3, count: 0, total: instance.paths.length } ];
        
        _.forEach( instance.paths, path => {

            const currentTimestamp: string = path.snippetID;
            const currentDate: Date = new Date( parseInt(path.snippetID)*1000 );
            const periodOfTheDay: number = MiscUtils.get_day_period( currentDate.getHours() );
            dayDistribution[periodOfTheDay].count ++;

        });

        

        return dayDistribution;
    }

    // takes an hour as input and return the period of the day as output morning/afternoon/night
    public static get_day_period( hour: number ): number {

       if( hour >=0 && hour <= 6 ) { return 0; } 
       else if( hour >= 7 && hour <= 12 ){ return 1; } 
       else if( hour >= 13 && hour <= 18 ){ return 2; } 
       else { return 3; }

    }

    public static UID_generator(): string {
        return Math.floor( Math.random() * 999999 ).toString();
    }

    public static calculate_spectrogram_container_size( listSize: number, container: HTMLElement ): string {
        return `${container.clientWidth / listSize}px`;
    }
}