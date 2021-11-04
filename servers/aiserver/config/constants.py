# USTCONSTS = {
#     'EMBEDDINGS_BASEPATH': 
#         { 'openl3': '../../data/ust/features/l3-mel256-env-512/48k/' },
#     'CLASSIFICATION_BASEPATH':  
#         '../../data/ust/class_predictions/predictions_framewise.json',
#     'PROTOTYPES': '../../data/ust/prototypes/prototypes.json'
# }

SONYCCONSTS = {
    'EMBEDDINGS_BASEPATH':
        { 'openl3': '../../data/sonyc/features/openl3/' },
    'CLASS_PREDICTIONS': '../../data/sonyc/class_predictions/',
    'PROTOTYPES': {
        'MODELS': '../../data/sonyc/prototypes/models/',
        'REPRESENTATIVES': '../../data/sonyc/prototypes/representatives/',
        'SUMMARIES': '../../data/sonyc/prototypes/summaries/'
    },
    'INDICES' : {
        'MAPPER': '../../data/sonyc/indices/ann/audioindices.json',
        'NMSLIB_INDICES': '../../data/sonyc/indices/ann/b827eb0d8af7.bin'
    }
}