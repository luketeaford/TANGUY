TANGUY.start_synth = function () {
    'use strict';
    TANGUY.osc1_saw.start(0);
    TANGUY.osc1_sqr.start(0);
    TANGUY.osc1_tri.start(0);
    TANGUY.osc1_sin.start(0);
    TANGUY.osc2.start(0);
    TANGUY.white_noise.start(0);
    TANGUY.pink_noise.start(0);
    TANGUY.red_noise.start(0);
    TANGUY.blue_noise.start(0);
    TANGUY.purple_noise.start(0);
    TANGUY.lfo.start(0);

    // Prevent the other event from calling start_synth
    $('#keyboard').off('mousedown keydown touchstart', 'button', TANGUY.start_synth);
};
