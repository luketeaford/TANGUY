TANGUY.gate_on = function () {
    'use strict';
    var cutoff = TANGUY.program.cutoff * TANGUY.program.cutoff * 22030 + 20,
        filter_eg = ((TANGUY.program.filter_eg_amt * (22050 - cutoff)) * Math.abs(TANGUY.program.filter_eg_amt)) + cutoff,
        filter_end_of_attack = TANGUY.synth.currentTime + TANGUY.program.filter_attack,
        sustain = filter_eg * TANGUY.program.filter_sustain * TANGUY.program.filter_sustain + cutoff,
        vca_end_of_attack = TANGUY.synth.currentTime + TANGUY.program.vca_attack;

    switch (TANGUY.program.filter.mode) {
    case 'lp':
        TANGUY.lp_filter1.frequency.setValueAtTime(cutoff, TANGUY.synth.currentTime);
        TANGUY.lp_filter2.frequency.setValueAtTime(cutoff / 2, TANGUY.synth.currentTime);
        TANGUY.lp_filter1.frequency.linearRampToValueAtTime(filter_eg, TANGUY.synth.currentTime + TANGUY.program.filter_attack);
        TANGUY.lp_filter2.frequency.linearRampToValueAtTime(filter_eg / 2, TANGUY.synth.currentTime + TANGUY.program.filter_attack);
        TANGUY.lp_filter1.frequency.setTargetAtTime(sustain, filter_end_of_attack, TANGUY.program.filter_decay);
        TANGUY.lp_filter2.frequency.setTargetAtTime(sustain / 2, filter_end_of_attack, TANGUY.program.filter_decay);
        break;
    case 'bp':
        TANGUY.bp_filter1.frequency.setValueAtTime(cutoff, TANGUY.synth.currentTime);
        TANGUY.bp_filter2.frequency.setValueAtTime(cutoff * 0.9, TANGUY.synth.currentTime);
        TANGUY.bp_filter3.frequency.setValueAtTime(cutoff * 1.1, TANGUY.synth.currentTime);
        TANGUY.bp_filter1.frequency.linearRampToValueAtTime(filter_eg, TANGUY.synth.currentTime + TANGUY.program.filter_attack);
        TANGUY.bp_filter2.frequency.linearRampToValueAtTime(filter_eg * 0.9, TANGUY.synth.currentTime + TANGUY.program.filter_attack);
        TANGUY.bp_filter3.frequency.linearRampToValueAtTime(filter_eg * 1.1, TANGUY.synth.currentTime + TANGUY.program.filter_attack);
        TANGUY.bp_filter1.frequency.setTargetAtTime(sustain, filter_end_of_attack, TANGUY.program.filter_decay);
        TANGUY.bp_filter2.frequency.setTargetAtTime(sustain * 0.9, filter_end_of_attack, TANGUY.program.filter_decay);
        TANGUY.bp_filter3.frequency.setTargetAtTime(sustain * 1.1, filter_end_of_attack, TANGUY.program.filter_decay);
        break;
    case 'hp':
        TANGUY.hp_filter1.frequency.setValueAtTime(cutoff, TANGUY.synth.currentTime);
        TANGUY.hp_filter2.frequency.setValueAtTime(cutoff, TANGUY.synth.currentTime);
        TANGUY.hp_filter1.frequency.linearRampToValueAtTime(filter_eg, TANGUY.synth.currentTime + TANGUY.program.filter_attack);
        TANGUY.hp_filter2.frequency.linearRampToValueAtTime(filter_eg, TANGUY.synth.currentTime + TANGUY.program.filter_attack);
        TANGUY.hp_filter1.frequency.setTargetAtTime(sustain, filter_end_of_attack, TANGUY.program.filter_decay);
        TANGUY.hp_filter2.frequency.setTargetAtTime(sustain, filter_end_of_attack, TANGUY.program.filter_decay);
        break;
    case 'notch':
        TANGUY.notch1.frequency.setValueAtTime(cutoff, TANGUY.synth.currentTime);
        TANGUY.notch2.frequency.setValueAtTime(cutoff * 0.9, TANGUY.synth.currentTime);
        TANGUY.notch3.frequency.setValueAtTime(cutoff * 1.1, TANGUY.synth.currentTime);
        TANGUY.notch1.frequency.linearRampToValueAtTime(filter_eg, TANGUY.synth.currentTime + TANGUY.program.filter_attack);
        TANGUY.notch2.frequency.linearRampToValueAtTime(filter_eg * 0.9, TANGUY.synth.currentTime + TANGUY.program.filter_attack);
        TANGUY.notch3.frequency.linearRampToValueAtTime(filter_eg * 1.1, TANGUY.synth.currentTime + TANGUY.program.filter_attack);
        TANGUY.notch1.frequency.setTargetAtTime(sustain, filter_end_of_attack, TANGUY.program.filter_decay);
        TANGUY.notch2.frequency.setTargetAtTime(sustain * 0.9, filter_end_of_attack, TANGUY.program.filter_decay);
        TANGUY.notch3.frequency.setTargetAtTime(sustain * 1.1, filter_end_of_attack, TANGUY.program.filter_decay);
        break;
    }

    TANGUY.calculate_pitch(parseFloat(this.getAttribute('data-keyboard-position')), parseFloat(this.getAttribute('data-note-value')));

    TANGUY.vca.gain.setValueAtTime(TANGUY.program.vca_gain, TANGUY.synth.currentTime);
    TANGUY.vca.gain.linearRampToValueAtTime(1, TANGUY.synth.currentTime + TANGUY.program.vca_attack);
    TANGUY.vca.gain.setTargetAtTime(TANGUY.program.vca_sustain + TANGUY.program.vca_gain, vca_end_of_attack, TANGUY.program.vca_decay);
};