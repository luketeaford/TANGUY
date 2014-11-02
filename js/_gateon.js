TANGUY.gate_on = function () {
    var filter_eg = TANGUY.program.filter.env_amt + TANGUY.program.filter.frequency,
        filter_end_of_attack = TANGUY.synth.currentTime + TANGUY.program.filter.attack,
        vca_end_of_attack = TANGUY.synth.currentTime + TANGUY.program.vca.attack;

    switch (TANGUY.program.filter.mode) {
    case 'lp':
        TANGUY.lp_filter1.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime);
        TANGUY.lp_filter2.frequency.setValueAtTime(TANGUY.program.filter.frequency / 2, TANGUY.synth.currentTime);
        TANGUY.lp_filter1.frequency.linearRampToValueAtTime(filter_eg, TANGUY.synth.currentTime + TANGUY.program.filter.attack);
        TANGUY.lp_filter2.frequency.linearRampToValueAtTime(filter_eg / 2, TANGUY.synth.currentTime + TANGUY.program.filter.attack);
        TANGUY.lp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain), filter_end_of_attack, TANGUY.program.filter.decay);
        TANGUY.lp_filter2.frequency.setTargetAtTime((TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain)) / 2, filter_end_of_attack, TANGUY.program.filter.decay);
        break;
    case 'bp':
        TANGUY.bp_filter1.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime);
        TANGUY.bp_filter2.frequency.setValueAtTime(TANGUY.program.filter.frequency * 0.9, TANGUY.synth.currentTime);
        TANGUY.bp_filter3.frequency.setValueAtTime(TANGUY.program.filter.frequency * 1.1, TANGUY.synth.currentTime);
        TANGUY.bp_filter1.frequency.linearRampToValueAtTime(filter_eg, TANGUY.synth.currentTime + TANGUY.program.filter.attack);
        TANGUY.bp_filter2.frequency.linearRampToValueAtTime(filter_eg * 0.9, TANGUY.synth.currentTime + TANGUY.program.filter.attack);
        TANGUY.bp_filter3.frequency.linearRampToValueAtTime(filter_eg * 1.1, TANGUY.synth.currentTime + TANGUY.program.filter.attack);
        TANGUY.bp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain), filter_end_of_attack, TANGUY.program.filter.decay);
        TANGUY.bp_filter2.frequency.setTargetAtTime((TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain)) * 0.9, filter_end_of_attack, TANGUY.program.filter.decay);
        TANGUY.bp_filter3.frequency.setTargetAtTime((TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain)) * 1.1, filter_end_of_attack, TANGUY.program.filter.decay);
        break;
    case 'hp':
        TANGUY.hp_filter1.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime);
        TANGUY.hp_filter2.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime);
        TANGUY.hp_filter1.frequency.linearRampToValueAtTime(filter_eg, TANGUY.synth.currentTime + TANGUY.program.filter.attack);
        TANGUY.hp_filter2.frequency.linearRampToValueAtTime(filter_eg, TANGUY.synth.currentTime + TANGUY.program.filter.attack);
        TANGUY.hp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain), filter_end_of_attack, TANGUY.program.filter.decay);
        TANGUY.hp_filter2.frequency.setTargetAtTime(TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain), filter_end_of_attack, TANGUY.program.filter.decay);
        break;
    case 'notch':
        TANGUY.notch1.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime);
        TANGUY.notch2.frequency.setValueAtTime(TANGUY.program.filter.frequency * 0.9, TANGUY.synth.currentTime);
        TANGUY.notch3.frequency.setValueAtTime(TANGUY.program.filter.frequency * 1.1, TANGUY.synth.currentTime);
        TANGUY.notch1.frequency.linearRampToValueAtTime(filter_eg, TANGUY.synth.currentTime + TANGUY.program.filter.attack);
        TANGUY.notch2.frequency.linearRampToValueAtTime(filter_eg * 0.9, TANGUY.synth.currentTime + TANGUY.program.filter.attack);
        TANGUY.notch3.frequency.linearRampToValueAtTime(filter_eg * 1.1, TANGUY.synth.currentTime + TANGUY.program.filter.attack);
        TANGUY.notch1.frequency.setTargetAtTime(TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain), filter_end_of_attack, TANGUY.program.filter.decay);
        TANGUY.notch2.frequency.setTargetAtTime((TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain)) * 0.9, filter_end_of_attack, TANGUY.program.filter.decay);
        TANGUY.notch3.frequency.setTargetAtTime((TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain)) * 1.1, filter_end_of_attack, TANGUY.program.filter.decay);
        break;
    }

    TANGUY.calculate_pitch(parseFloat(this.getAttribute('data-keyboard-position')), parseFloat(this.getAttribute('data-note-value')));

    TANGUY.vca.gain.setValueAtTime(TANGUY.program.vca.gain, TANGUY.synth.currentTime);
    TANGUY.vca.gain.linearRampToValueAtTime(1, TANGUY.synth.currentTime + TANGUY.program.vca.attack);
    TANGUY.vca.gain.setTargetAtTime(TANGUY.program.vca.sustain + TANGUY.program.vca.gain, vca_end_of_attack, TANGUY.program.vca.decay);
}