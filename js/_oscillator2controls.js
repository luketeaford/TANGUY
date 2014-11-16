//OSCILLATOR 2 CONTROLS
$('#osc2-kbd').change(function () {
    'use strict';
    TANGUY.program.osc2_kbd = this.checked ? true : false;
});
$('#osc2-coarse').on('change', 'input', function () {
    'use strict';
    TANGUY.program.osc2_coarse = this.value;
    TANGUY.osc2.frequency.setValueAtTime(TANGUY.osc2_master_pitch * this.value, TANGUY.synth.currentTime);
});
$('#osc2-waveform').on('change', '#osc2-saw, #osc2-sqr, #osc2-tri, #osc2-sin', function () {
    'use strict';
    TANGUY.program.osc2_waveform = this.value;
    TANGUY.osc2.type = this.value;
});

//OSCILLATOR 2 CONTROLS - GOOD
// what is osc2_pitch? why isn't that on fine tune?
// watch out for the coarse tuning which will break sometime soon
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

TANGUY.update_osc2_shape_amt = function () {
    'use strict';
    var x = TANGUY.program.osc2_shape;
    if (x > 0) {
        TANGUY.waveshaper.curve = new Float32Array([x * 1.6, x * -2.5, x * -1.2, x * -2.4, x * -1.6, x * -3.2, x * 6.4, x * -3.2]);
    } else {
        TANGUY.waveshaper.curve = null;
    }
    return;
};

TANGUY.update_osc2_fm_amt = function () {
    'use strict';
    return TANGUY.osc2_fm_vca.gain.setValueAtTime(TANGUY.program.osc2_fm * TANGUY.program.osc2_fm * 24000, TANGUY.synth.currentTime);
};