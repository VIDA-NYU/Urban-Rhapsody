export enum Datasets {

    sonyc = 'sonyc',
    ust = 'UST',
    ustperturbed = 'ustperturbed'

}

export const WEEKDAYS: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


// example snippets
export const SNIPPETEXAMPLES: { sensorID: string, day: string, snippetID: string }[] = 
    [
        { sensorID: 'u01', day: '1992-03-17', snippetID: '01_000174'},
        { sensorID: 'u01', day: '1992-03-17', snippetID: '01_000789'},
        { sensorID: 'u01', day: '1992-03-17', snippetID: '01_000504'},
        { sensorID: 'u01', day: '1992-03-17', snippetID: '01_000759'},
        { sensorID: 'u46', day: '1992-03-17', snippetID: '46_020807'},
        { sensorID: 'u01', day: '1992-03-17', snippetID: '01_000061'},
        { sensorID: 'u01', day: '1992-03-17', snippetID: '01_000126'},
        { sensorID: 'u01', day: '1992-03-17', snippetID: '01_000006'},
        
    ];

export const SNIPPETEXAMPLESLABELS: string[] = [
    'engine',
    'machinery-impact',
    'non-machinery-impact',
    'powered-saw',
    'alert-signal',
    'music',
    'human-voice',
    'dog'
]