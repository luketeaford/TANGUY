TANGUY.store_program = function (e) {
    'use strict';
    TANGUY.program[e.data.program] = parseFloat(e.currentTarget.value);
    if (TANGUY[e.data.update]) {
        return TANGUY[e.data.update]();
    }
    return;
};

TANGUY.update_cutoff = function () {
    'use strict';
    var cutoff = TANGUY.program.cutoff * TANGUY.program.cutoff * 22030 + 20;
    switch (TANGUY.program.filter.mode) {
    case 'lp':
        TANGUY.lp_filter1.frequency.setTargetAtTime(cutoff, TANGUY.synth.currentTime, 0.08);
        TANGUY.lp_filter2.frequency.setTargetAtTime(cutoff / 2, TANGUY.synth.currentTime, 0.08);
        break;
    case 'bp':
        TANGUY.bp_filter1.frequency.setTargetAtTime(cutoff, TANGUY.synth.currentTime, 0.08);
        TANGUY.bp_filter2.frequency.setTargetAtTime(cutoff * 0.9, TANGUY.synth.currentTime, 0.08);
        TANGUY.bp_filter3.frequency.setTargetAtTime(cutoff * 1.1, TANGUY.synth.currentTime, 0.08);
        break;
    case 'hp':
        TANGUY.hp_filter1.frequency.setTargetAtTime(cutoff, TANGUY.synth.currentTime, 0.08);
        TANGUY.hp_filter2.frequency.setTargetAtTime(cutoff, TANGUY.synth.currentTime, 0.08);
        break;
    case 'notch':
        TANGUY.notch1.frequency.setTargetAtTime(cutoff, TANGUY.synth.currentTime, 0.08);
        TANGUY.notch2.frequency.setTargetAtTime(cutoff * 0.9, TANGUY.synth.currentTime, 0.08);
        TANGUY.notch3.frequency.setTargetAtTime(cutoff * 1.1, TANGUY.synth.currentTime, 0.08);
        break;
    }
};

TANGUY.update_resonance = function () {
    'use strict';
    var resonance = TANGUY.program.res * TANGUY.program.res * 1000;
    switch (TANGUY.program.filter.mode) {
    case 'lp':
        TANGUY.lp_filter1.Q.setTargetAtTime(resonance / 82, TANGUY.synth.currentTime, 0.01);
        TANGUY.lp_filter2.Q.setTargetAtTime(resonance / 123, TANGUY.synth.currentTime, 0.01);
        break;
    case 'bp':
        TANGUY.bp_filter2.gain.setTargetAtTime(resonance / 82, TANGUY.synth.currentTime, 0.01);
        TANGUY.bp_filter3.gain.setTargetAtTime(resonance / 82, TANGUY.synth.currentTime, 0.01);
        break;
    case 'hp':
        TANGUY.hp_filter1.Q.setTargetAtTime(resonance / 82, TANGUY.synth.currentTime, 0.01);
        TANGUY.hp_filter2.Q.setTargetAtTime(resonance / 123, TANGUY.synth.currentTime, 0.01);
        break;
    case 'notch':
        TANGUY.notch2.gain.setTargetAtTime(resonance / -21, TANGUY.synth.currentTime, 0.01);
        TANGUY.notch3.gain.setTargetAtTime(resonance / -21, TANGUY.synth.currentTime, 0.01);
        break;
    }
};