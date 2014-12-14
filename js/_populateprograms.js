TANGUY.populate_programs = function () {
    'use strict';
    var programs = [
        'initialize',
        'direct peon',
        'eyeball bass',
        'headcleaner',
        'lettuce in',
        'fake sync',
        'rhinoceros',
        'stylish bass',
        'low bubble',
        'cool wire',
        'event deafener',
        'bel homme',
        'chattering',
        'square wave bass',
        'camembert',
        'salut detroit',
        'dusty pipes',
        'architecture',
        'faux set',
        'plywood violin',
        'black celebration',
        'feedback drone',
        'male voice',
        'metal cello',
        'papayawhip',
        'ragamuffin',
        'beatnik bongos',
        'perry on the beach',
        'whompy bass',
        'fuzzy',
        'synth strings',
        'easy cure',
        'rubberband',
        'jet lag',
        'abominable bassman',
        'science fiction brains',
        'bacon grease',
        'shanty',
        'bending branch',
        'snarly bass',
        'evening gardening',
        'weedy rectangle',
        'ozone',
        'disco pabulum',
        'cheap snare',
        'beefy snare',
        'sloppy bass',
        'chhchhchhchh',
        'round kick',
        'fisherman',
        'no pulse',
        'the last voice',
        'red river',
        'crawler',
        'synth king',
        'showering dalek',
        'former marine',
        'galactic yawn',
        'gamelan',
        'dolphin sighting',
        'pulse demon',
        'hum',
        'swamp monster',
        'wistful pipes',
        'invisible hand',
        'hihat',
        'maracas',
        'wah wah'
    ],
        urls = [],
        buttons = '',
        i;
    for (i = 0; i < programs.length; i += 1) {
        urls[i] = programs[i].replace(/\s+/g, '');
        buttons += '<button value="' + urls[i] + '">' + programs[i] + '</button>';
    }
    $('#program-select').append(buttons);
};