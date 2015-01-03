TANGUY.populate_programs = function () {
    'use strict';
    var programs = [
        'initialize',

        //BASSES
        'eyeball bass',
        'stylish bass',
        'square wave bass',
        'whompy bass',
        'abominable bassman',
        'snarly bass',
        'panhandler bass',
        'sloppy bass',
        'perry on the beach',

        //LEADS
        'direct peon',
        'headcleaner',
        'jet lag',
        'ozone',
        'disco pabulum',
        'no pulse',
        'former marine',
        'lettuce in',
        'cool wire',
        'dolphin sighting',
        'rhinoceros',
        'wah wah',
        'black celebration',
        'banjo man',

        //STRINGS
        'digital fiddle',
        'camembert',
        'plywood violin',
        'metal cello',
        'synth strings',

        //GUITAR
        'fake sync',
        'event deafener',
        'faux set',
        'fuzzy',
        'easy cure',
        'crawler',
        'razor view',
        'invisible hand',

        //VOCAL SOUNDS
        'dusty pipes',
        'wistful pipes',
        'hum',
        'shanty',
        'galactic yawn',
        'male voice',
        'the last voice',

        //BELLS
        'bel homme',
        'gamelan',

        //FX
        'low bubble',
        'chattering',
        'salut detroit',
        'bacon grease',
        'chhchhchhchh',
        'fisherman',
        'showering dalek',
        'architecture',
        'bending branch',
        'weedy rectangle',
        'red river',
        'swamp monster',
        'papayawhip',
        'science fiction brains',

        //PERCUSSION
        'optic kick',
        'round kick',
        'cheap snare',
        'beefy snare',
        'hihat',
        'maracas',
        'beatnik bongos',

        //DRONES
        'feedback drone',
        'ragamuffin',
        'evening gardening',
        'pulse demon',
        'rubberband',
        'third member',
        'synth king',

        //EXTERNAL PROCESSING
        'external input',
        'metallic vocals',
        'systematic decline',
        'central scrutinizer',
        'boogie vocals',
        'meltdown'
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
