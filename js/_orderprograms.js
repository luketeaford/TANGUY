TANGUY.order_programs = function () {
    'use strict';
    var programs = [
        //INITIALIZE
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
        'stress test',
        'teardrop bass',

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
        'sonic surrealism',
        'dolphin sighting',
        'rhinoceros',
        'wah wah',
        'tuba',
        'sundog',
        'black celebration',
        'ponytail',
        'porcupine',
        'banjo man',

        //STRINGS
        'digital fiddle',
        'city at night',
        'camembert',
        'plywood violin',
        'metal cello',
        'chestnut tree',
        'synth strings',
        'time capsule',
        'slow motion sunrise',

        //GUITAR
        'fake sync',
        'event deafener',
        'faux set',
        'fuzzy',
        'easy cure',
        'crawler',
        'razor view',
        'invisible hand',
        'vector style',

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
        'copper pigeon',
        'gamelan',

        //FX
        'low bubble',
        'chattering',
        'salut detroit',
        'bacon grease',
        'chhchhchhchh',
        'fisherman',
        'r mutt',
        'showering dalek',
        'architecture',
        'bending branch',
        'weedy rectangle',
        'underwater',
        'red river',
        'swamp monster',
        'papayawhip',
        'science fiction brains',
        'mimosa',
        'wave of shadows',

        //PERCUSSION
        'optic kick',
        'round kick',
        'warm kick',
        'rubber kick',
        'gumshoe kick',
        'cheap snare',
        'beefy snare',
        'peppy snare',
        'glitch snare',
        'trashy drum',
        'stutter snare',
        'hihat',
        'shiny hihat',
        'maracas',
        'beatnik bongos',
        'metal flap',

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
        'slight delay',
        'metallic vocals',
        'systematic decline',
        'central scrutinizer',
        'boogie vocals',
        'meltdown'
    ],
        urls = [],
        i;
    for (i = 0; i < programs.length; i += 1) {
        urls[i] = programs[i].replace(/\s+/g, '');
    }
    TANGUY.programs = programs;
    TANGUY.urls = urls;
    return TANGUY.populate_programs();
};
