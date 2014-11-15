//OSCILLATOR 1 CONTROLS
$('#osc1-kbd').change(function () {
    'use strict';
    TANGUY.program.osc1.kbd = this.checked ? true : false;
});
$('#osc1-coarse').on('change', 'input', function () {
    'use strict';
    var osc1 = [TANGUY.osc1_saw, TANGUY.osc1_sqr, TANGUY.osc1_tri, TANGUY.osc1_sin],
        i;
    TANGUY.program.osc1.coarse = this.value;
    for (i = 0; i < 4; i += 1) {
        osc1[i].frequency.setValueAtTime(440 * this.value, TANGUY.synth.currentTime);
    }
});

//OSCILLATOR 1 CONTROLS - GOOD
TANGUY.update_osc1_saw_amt = function () {
    'use strict';
    return TANGUY.osc1_saw_vca.gain.setValueAtTime(TANGUY.program.osc1_saw * TANGUY.program.osc1_saw, TANGUY.synth.currentTime);
};

TANGUY.update_osc1_sqr_amt = function () {
    'use strict';
    return TANGUY.osc1_sqr_vca.gain.setValueAtTime((TANGUY.program.osc1_sqr * TANGUY.program.osc1_sqr) * -1, TANGUY.synth.currentTime);
};

TANGUY.update_osc1_tri_amt = function () {
    'use strict';
    return TANGUY.osc1_tri_vca.gain.setValueAtTime(TANGUY.program.osc1_tri * TANGUY.program.osc1_tri, TANGUY.synth.currentTime);
};

TANGUY.update_osc1_sin_amt = function () {
    'use strict';
    return TANGUY.osc1_sin_vca.gain.setValueAtTime(TANGUY.program.osc1_sin * TANGUY.program.osc1_sin, TANGUY.synth.currentTime);
};

TANGUY.update_osc1_fm_amt = function () {
    'use strict';
    return TANGUY.osc1_fm_vca.gain.setValueAtTime(TANGUY.program.osc1_fm * TANGUY.program.osc1_fm * 24000, TANGUY.synth.currentTime);
};