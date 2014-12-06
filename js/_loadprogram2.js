TANGUY.load_program = function (patch) {
    'use strict';
    var patch_url = encodeURI('programs/') + patch + '.json';
    $.getJSON(decodeURI(patch_url), function (loaded) {
        TANGUY.program = loaded;
        return TANGUY.update_program();
    });
};

TANGUY.show_program = function () {
    'use strict';
    $('#program-select').show();
    $(document).one('click', TANGUY.hide_program);
    return false;
};

TANGUY.hide_program = function () {
    'use strict';
    $('#program-select').hide();
    $('body').one('click', '#program', TANGUY.show_program);
    return false;
};

//POPULATE PROGRAM BANK...
TANGUY.populate_bank = function () {
    'use strict';
    var presets = [
        'initialize',
        'low bubble',
        'fake sync',
        'faux set',
        'event deafener',
        'chattering',
        'camembert',
        'salut detroit',
        'plywood violin',
        'black celebration',
        'feedback drone',
        'male voice',
        'crawler',
        'red river',
        'dusty pipes',
        'abominable bassman',
        'architecture',
        'bacon grease',
        'beatnik bongos',
        'beefy snare',
        'bending branch',
        'cheap snare',
        'chhchhchhchh',
        'cool wire',
        'easy cure',
        'eval',
        'evening gardening',
        'fisherman',
        'former marine',
        'fuzzy',
        'galactic yawn',
        'gogo horn',
        'hum',
        'jetlag',
        'metal cello',
        'ozone',
        'papayawhip',
        'perry on the beach',
        'pulse demon',
        'ragamuffin',
        'round kick',
        'rubberband',
        'science fiction brains',
        'shanty',
        'slap bass',
        'snarly bass',
        'square wave bass',
        'stomping mummy',
        'stylish bass',
        'swamp monster',
        'synth king',
        'synth strings',
        'the last voice',
        'wah wah',
        'weedy rectangle',
        'whompy bass',
        'wistful pipes'
    ],
        i;
    console.log('Populating the program bank...');
    console.log('Presets length = ' + presets.length);
    for (i = 0; i < presets.length; i += 1) {
        $('#program-select').append('<button value="' + presets[i] + '">' + presets[i] + '</button>');
    }
};



//SLOPPY EVENTS - PUT IN DOCUMENT READY...
$('body').one('click', '#program', TANGUY.show_program);

$('#program-select').on('click', 'button', function () {
    'use strict';
    TANGUY.load_program(this.value);
});