export class MiscUtils {


    public static dictToValues( dictobj: {} ): any[] {
        return Object.values( dictobj );
    }

    public static dictToKeys( dictobj: {} ): any[] {
        return Object.keys( dictobj );
    }

    public static format_US_datetime( datetime: Date ): string{

        const year: string = `${datetime.getFullYear()}`;
        const month: string = `0${datetime.getMonth()}`.slice(-2);
        const day: string = `0${datetime.getDate()}`.slice(-2);

        const currentDatetimeString: string = `${year}-${month}-${day} `
        return currentDatetimeString;

    }

    public static UID_generator(): string {
        return Math.floor( Math.random() * 999999 ).toString();
    }
}