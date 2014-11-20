//BROWSER PREFIXING
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var TANGUY = {

    synth: new AudioContext(),

    //SENSIBLE DEFAULTS
    octave_shift: 0,
    osc1_master_pitch: 440,
    osc2_master_pitch: 444.18,
    key_down: false,

    program: {
        "name": "INITIALIZE (internal)",
        "osc1_kbd": true,
        "osc1_coarse": 1,
        "osc1_saw": 1,
        "osc1_sqr": 0,
        "osc1_tri": 0,
        "osc1_sin": 0,
        "osc1_fm": 0,

        "osc2_kbd": true,
        "osc2_coarse": 1,
        "osc2_waveform": "sawtooth",
        "osc2_detune": 0,
        "osc2_fine": 0,
        "osc2_shape": 0,
        "osc2_fm": 0,

        "noise_color": "white",

        "lfo_shape": "sine",
        "lfo_rate": 0.1,
        "lfo_pitch": 0,
        "lfo_filter": 0,
        "lfo_amp": 0,

        "osc1_mix": 1,
        "osc2_mix": 1,
        "noise_mix": 0,

        "filter_mode": "lp",
        "cutoff": 22050,
        "res": 0.0001,
        "filter_eg": 0,
        "filter_kbd": 0,
        "filter_attack": 0.008,
        "filter_decay": 0.008,
        "filter_sustain": 0,
        "filter_release": 0.008,

        "vca_gain": 0,
        "vca_attack": 0.0001,
        "vca_decay": 0.0001,
        "vca_sustain": 1,
        "vca_release": 0.0001,

        "portamento_mode": "off",
        "portamento": 0.01,

        "mod": 0,
        "mod_direction": 1,

        "delay_rate": 0,
        "delay": 0
    }
};