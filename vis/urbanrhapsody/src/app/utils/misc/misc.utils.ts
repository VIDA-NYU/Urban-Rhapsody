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

    public static UID_generator(): string {
        return Math.floor( Math.random() * 999999 ).toString();
    }

    public static calculate_spectrogram_container_size( listSize: number, container: HTMLElement ): string {
        return `${container.clientWidth / listSize}px`;
    }
}