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
        'ozone',
        'direct peon',
        'low bubble',
        'fake sync',
        'rhinoceros',
        'faux set',
        'stylish bass',
        'cool wire',
        'event deafener',
        'chattering',
        'square wave bass',
        'camembert',
        'salut detroit',
        'architecture',
        'plywood violin',
        'black celebration',
        'feedback drone',
        'male voice',
        'crawler',
        'red river',
        'metal cello',
        'papayawhip',
        'ragamuffin',
        'beatnik bongos',
        'fuzzy',
        'synth strings',
        'easy cure',
        'rubberband',
        'jetlag',
        'abominable bassman',
        'science fiction brains',
        'bacon grease',
        'shanty',
        'bending branch',
        'snarly bass',
        'evening gardening',
        'weedy rectangle',
        'cheap snare',
        'beefy snare',
        'whompy bass',
        'sloppy bass',
        'chhchhchhchh',
        'round kick',
        'fisherman',
        'the last voice',
        'synth king',
        'showering dalek',
        'former marine',
        'galactic yawn',
        'pulse demon',
        'perry on the beach',
        'hum',
        'swamp monster',
        'dusty pipes',
        'wistful pipes',
        'wah wah'
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