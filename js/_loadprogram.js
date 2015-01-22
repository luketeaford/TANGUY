TANGUY.load_program = function (patch) {
    'use strict';
    var patch_url = encodeURI('programs/') + patch + '.json';
    $.getJSON(decodeURI(patch_url), function (loaded) {
        TANGUY.program = loaded;
        TANGUY.program_number = TANGUY.urls.indexOf(patch);
        return TANGUY.update_program();
    }).fail(function () {
        TANGUY.program = {
            "name": "Error 404 //Initialize loaded instead :)",

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

            "osc1_mix": 1,
            "osc2_mix": 1,
            "noise_mix": 0,
            "ext_mix": 0,

            "filter_mode": "lp",
            "cutoff": 1,
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

            "lfo_shape": "sine",
            "lfo_rate": 0.1,
            "lfo_pitch": 0,
            "lfo_filter": 0,
            "lfo_amp": 0,

            "delay_rate": 0,
            "delay": 0,

            "portamento_mode": "off",
            "portamento": 0.01,

            "mod": 0,
            "mod_direction": 1
        };
        return TANGUY.update_program();
    });
};

TANGUY.show_program = function () {
    'use strict';
    $('#program-select').show();
    $(document).one('click', TANGUY.hide_program);
    // Required for touch devices to be able scroll and 'click off'
    // This would probably be better doing on and off instead of one
    $('div').not('#program, #program-select').one('touchstart', TANGUY.hide_program);
    return false;
};

TANGUY.hide_program = function () {
    'use strict';
    $('#program-select').hide();
    $('body').one('click', '#program-name', TANGUY.show_program);
    return false;
};

TANGUY.change_program = function (x) {
    'use strict';
    var y = TANGUY.program_number + parseInt(x, 10);
    if (y >= 0 && y < TANGUY.urls.length) {
        return TANGUY.load_program(TANGUY.urls[y]);
    }
};
