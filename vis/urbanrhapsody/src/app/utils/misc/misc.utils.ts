export class MiscUtils {


    public static dictToValues( dictobj: {} ): any[] {
        return Object.values( dictobj );
    }

    public static dictToKeys( dictobj: {} ): any[] {
        return Object.keys( dictobj );
    }
}