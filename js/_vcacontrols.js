//VCA CONTROLS - GOOD
TANGUY.update_vca_gain = function () {
    'use strict';
    return TANGUY.vca.gain.setTargetAtTime(TANGUY.program.vca_gain * TANGUY.program.vca_gain, TANGUY.synth.currentTime, 0.01);
};