//FILTER CONTROLS
$('#filter-mode').on('change', 'input', function () {
    'use strict';
    TANGUY.mixer.disconnect();
    TANGUY.lfo_filter_vca.disconnect();
    TANGUY.program.filter.mode = this.value;
    switch (this.value) {
    case 'lp':
        TANGUY.mixer.connect(TANGUY.lp_filter1);
        TANGUY.lfo_filter_vca.connect(TANGUY.lp_filter1.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.lp_filter2.frequency);
        break;
    case 'bp':
        TANGUY.mixer.connect(TANGUY.bp_filter1);
        TANGUY.lfo_filter_vca.connect(TANGUY.bp_filter1.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.bp_filter2.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.bp_filter3.frequency);
        break;
    case 'hp':
        TANGUY.mixer.connect(TANGUY.hp_filter1);
        TANGUY.lfo_filter_vca.connect(TANGUY.hp_filter1.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.hp_filter2.frequency);
        break;
    case 'notch':
        TANGUY.mixer.connect(TANGUY.notch1);
        TANGUY.lfo_filter_vca.connect(TANGUY.notch1.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.notch2.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.notch3.frequency);
        break;
    case 'off':
        TANGUY.mixer.connect(TANGUY.vca);
        break;
    }
});

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
    var q = TANGUY.program.res * TANGUY.program.res * 1000;
    switch (TANGUY.program.filter.mode) {
    case 'lp':
        TANGUY.lp_filter1.Q.setTargetAtTime(q / 82, TANGUY.synth.currentTime, 0.01);
        TANGUY.lp_filter2.Q.setTargetAtTime(q / 123, TANGUY.synth.currentTime, 0.01);
        break;
    case 'bp':
        TANGUY.bp_filter2.gain.setTargetAtTime(q / 82, TANGUY.synth.currentTime, 0.01);
        TANGUY.bp_filter3.gain.setTargetAtTime(q / 82, TANGUY.synth.currentTime, 0.01);
        break;
    case 'hp':
        TANGUY.hp_filter1.Q.setTargetAtTime(q / 82, TANGUY.synth.currentTime, 0.01);
        TANGUY.hp_filter2.Q.setTargetAtTime(q / 123, TANGUY.synth.currentTime, 0.01);
        break;
    case 'notch':
        TANGUY.notch2.gain.setTargetAtTime(q / -21, TANGUY.synth.currentTime, 0.01);
        TANGUY.notch3.gain.setTargetAtTime(q / -21, TANGUY.synth.currentTime, 0.01);
        break;
    }
};