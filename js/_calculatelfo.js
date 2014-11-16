//SIMPLER AND MAKES MORE SENSE
TANGUY.calculate_lfo = function () {
    'use strict';
    var amt = TANGUY.program.mod * TANGUY.program.mod_direction;
    TANGUY.lfo_pitch_vca.gain.value = TANGUY.program.lfo_pitch * amt;
    TANGUY.lfo_filter_vca.gain.value = TANGUY.program.lfo_filter * amt;
    TANGUY.lfo_amp_vca.gain.value = TANGUY.program.lfo_amp * amt;
    console.log('This is the modwheel, baby!');
    return;
};