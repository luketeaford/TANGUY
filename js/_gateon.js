TANGUY.gate_on = function (event) {
    'use strict';
    var n,
        pos,
        note_value;

    if (TANGUY.playing.length === 0) {
        TANGUY.filter_env_on();
        TANGUY.amp_env_on();
    }

    if (this.getAttribute) {
        // Notes coming from qwerty or touch
        pos = parseFloat(this.getAttribute('data-keyboard-position'));
        note_value = parseFloat(this.getAttribute('data-note-value'));
        n = ((note_value + 900) / 100) + 48 + ((pos + 1) * 12);
    } else {
        // Notes coming from MIDI
        n = event.data[1];
        pos = Math.floor(n / 12) - 5;
        note_value = 100 * (n % 12) - 900;
    }
    TANGUY.playing.push(n);
    TANGUY.calculate_pitch(pos, note_value);
};

TANGUY.filter_env_on = function () {
    'use strict';
    var cutoff = TANGUY.program.cutoff * TANGUY.program.cutoff * 22030 + 20,
        filter_eg = ((TANGUY.program.filter_eg * (22050 - cutoff)) * Math.abs(TANGUY.program.filter_eg)) + cutoff,
        filter_end_of_attack = TANGUY.synth.currentTime + TANGUY.program.filter_attack,
        sustain = filter_eg * TANGUY.program.filter_sustain * TANGUY.program.filter_sustain + cutoff;

    switch (TANGUY.program.filter_mode) {
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
};

TANGUY.amp_env_on = function () {
    'use strict';
    // Set starting point - Exponential fade out
    TANGUY.vca.gain.setTargetAtTime(TANGUY.program.vca_gain, TANGUY.synth.currentTime, 0.05);

    return TANGUY.amp_attack();
};

TANGUY.amp_attack = function () {
    'use strict';
    var vca_end_of_attack = TANGUY.synth.currentTime + TANGUY.program.vca_attack;

    // Attack stage
    TANGUY.vca.gain.linearRampToValueAtTime(1, TANGUY.synth.currentTime + TANGUY.program.vca_attack);

    // Decay stage
    return TANGUY.vca.gain.setTargetAtTime(TANGUY.program.vca_sustain + TANGUY.program.vca_gain, vca_end_of_attack, TANGUY.program.vca_decay);
};
