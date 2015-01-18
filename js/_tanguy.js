window.AudioContext = window.AudioContext || window.webkitAudioContext;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var TANGUY = {

    synth: new AudioContext(),

    // Defaults
    program_number: 0,
    octave_shift: 0,
    osc1_master_pitch: 440,
    osc2_master_pitch: 444.18,
    key_down: false

};
