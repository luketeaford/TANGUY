//MODWHEEL CONTROLS - GOOD
TANGUY.calculate_lfo = function () {
    'use strict';
    var amt = TANGUY.program.mod * TANGUY.program.mod_direction;
    //PROBABLY MAKES BETTER SENSE TO CALL THE UPDATE FUNCTIONS HERE...
    TANGUY.lfo_pitch_vca.gain.setValueAtTime(TANGUY.program.lfo_pitch * amt, TANGUY.synth.currentTime);
    TANGUY.lfo_filter_vca.gain.setValueAtTime(TANGUY.program.lfo_filter * amt, TANGUY.synth.currentTime);
    TANGUY.lfo_amp_vca.gain.setValueAtTime(TANGUY.program.lfo_amp * amt, TANGUY.synth.currentTime);
    return;
};
