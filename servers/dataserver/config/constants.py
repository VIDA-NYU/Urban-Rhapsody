USTCONSTS = {

    'AUDIO_SNIPPETS_BASEPATH': '../../data/ust/audio/48k/',
    'SPECTROGRAM_BASEPATH': '../../data/ust/spectrograms/',
    'SPL_BASEPATH': '../data/ust/spl/48k/',
    'METADATA': '../../data/ust/annotations/latest/annotations_2.csv',

    'FRAMECONSTS': {
        'FRAMESPERAUDIO' : 10
    },

    'SNIPPETCONSTS': {
        'LENGTH': 10                ## length in seconds
    }
}


SONYCCONSTS = {

    'AUDIO_SNIPPETS_BASEPATH': '../../data/sonyc/audio',
    'SPECTROGRAM_BASEPATH': '../../data/sonyc/spectrograms',
    # 'SPL_BASEPATH': '../data/ust/spl/48k/',
    'METADATA': '../../data/sonyc/metadata/sonyc_metadata.csv',

    'FRAMECONSTS': {
        'FRAMESPERAUDIO' : 10
    },

    'SNIPPETCONSTS': {
        'LENGTH': 10                ## length in seconds
    }

}


QUERYEXAMPLES = {

    'AUDIO_SNIPPETS_BASEPATH': '../../data/sonyc/audio/',
    'SPECTROGRAM_BASEPATH': '../../data/sonyc/spectrograms/',
    # 'SPL_BASEPATH': '../data/ust/spl/48k/',
    'METADATA': '../../data/sonyc/metadata/sonyc_metadata.csv',
    'AUDIOEXAMPLES': [  '01_000174', '01_000789', '01_000504'
                        '01_000759', '46_020807', '01_000061',
                        '01_000126', '01_000006'],

    'FRAMECONSTS': {
        'FRAMESPERAUDIO' : 10
    },

    'SNIPPETCONSTS': {
        'LENGTH': 10                ## length in seconds
    }

}


SUPPLEMENTARDATASETS = {
    'NOISECOMPLAINTS' : '../../data/supplementar/noise-complaints/noisecomplaints.csv'
}