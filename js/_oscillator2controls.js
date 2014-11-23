//OSCILLATOR 2 KEYBOARD TRACKING
TANGUY.update_osc2_kbd = function () {
    'use strict';
    console.log('Updating osc 2 kbd');
    return;
};

//OSCILLATOR 2 CONTROLS - GOOD
TANGUY.update_osc2_coarse = function () {
    'use strict';
    return TANGUY.osc2.frequency.setValueAtTime(TANGUY.osc2_master_pitch * TANGUY.program.osc2_coarse, TANGUY.synth.currentTime);
};

TANGUY.update_osc2_waveform = function () {
    'use strict';
    TANGUY.osc2.type = TANGUY.program.osc2_waveform;
    return;
};

TANGUY.update_osc2_detune = function () {
    'use strict';
    if (TANGUY.osc2_pitch === undefined) {
        TANGUY.osc2_pitch = TANGUY.osc2_master_pitch;
    }
    TANGUY.osc2.detune.setValueAtTime(TANGUY.osc2_pitch + TANGUY.program.osc2_detune, TANGUY.synth.currentTime);
};

TANGUY.update_osc2_fine = function () {
    'use strict';
    return TANGUY.osc2.frequency.setValueAtTime((TANGUY.osc2_master_pitch * TANGUY.program.osc2_coarse) + TANGUY.program.osc2_fine, TANGUY.synth.currentTime);
};

TANGUY.update_osc2_shape = function () {
    'use strict';
    var x = TANGUY.program.osc2_shape;
    if (x > 0) {
        TANGUY.waveshaper.curve = new Float32Array([x * 1.6, x * -2.5, x * -1.2, x * -2.4, x * -1.6, x * -3.2, x * 6.4, x * -3.2]);
    } else {
        TANGUY.waveshaper.curve = null;
    }
    return;
};

TANGUY.update_osc2_fm = function () {
    'use strict';
    return TANGUY.osc2_fm_vca.gain.setValueAtTime(TANGUY.program.osc2_fm * TANGUY.program.osc2_fm * 24000, TANGUY.synth.currentTime);
};