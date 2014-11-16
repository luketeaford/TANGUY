//SIMPLER AND MAKES MORE SENSE
TANGUY.calculate_lfo = function () {
    'use strict';
    var amt = TANGUY.program.mod_amt * TANGUY.program.mod_direction;
    TANGUY.lfo_pitch_vca.gain.value = TANGUY.program.lfo_pitch * amt;
    TANGUY.lfo_filter_vca.gain.value = TANGUY.program.lfo.filter * amt;
    TANGUY.lfo_amp_vca.gain.value = TANGUY.program.lfo.amp * amt;
    return;
};