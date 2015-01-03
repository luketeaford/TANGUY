TANGUY.calculate_pitch = function (pos, note_value) {
    'use strict';
    TANGUY.osc1_pitch = ((TANGUY.octave_shift + pos) * 1200) + note_value;
    TANGUY.osc2_pitch = TANGUY.osc1_pitch + TANGUY.program.osc2_detune;

    return TANGUY.set_pitch();
};

TANGUY.set_pitch = function () {
    'use strict';
    var osc1 = [TANGUY.osc1_saw, TANGUY.osc1_sqr, TANGUY.osc1_tri, TANGUY.osc1_sin],
        i;

    switch (TANGUY.program.portamento_mode) {
    case 'off':
        if (TANGUY.program.osc1_kbd === true) {
            for (i = 0; i < 4; i += 1) {
                osc1[i].detune.setValueAtTime(TANGUY.osc1_pitch, TANGUY.synth.currentTime);
            }
        }
        if (TANGUY.program.osc2_kbd === true) {
            TANGUY.osc2.detune.setValueAtTime(TANGUY.osc2_pitch, TANGUY.synth.currentTime);
        }
        break;
    case 'linear':
        if (TANGUY.program.osc1_kbd === true) {
            for (i = 0; i < 4; i += 1) {
                osc1[i].detune.linearRampToValueAtTime(TANGUY.osc1_pitch, TANGUY.synth.currentTime + TANGUY.program.portamento);
            }
        }
        if (TANGUY.program.osc2_kbd === true) {
            TANGUY.osc2.detune.linearRampToValueAtTime(TANGUY.osc2_pitch, TANGUY.synth.currentTime + TANGUY.program.portamento);
        }
        break;
    case 'exponential':
        if (TANGUY.program.osc1_kbd === true) {
            for (i = 0; i < 4; i += 1) {
                osc1[i].detune.setTargetAtTime(TANGUY.osc1_pitch, TANGUY.synth.currentTime, TANGUY.program.portamento / 5);
            }
        }
        if (TANGUY.program.osc2_kbd === true) {
            TANGUY.osc2.detune.setTargetAtTime(TANGUY.osc2_pitch, TANGUY.synth.currentTime, TANGUY.program.portamento / 5);
        }
        break;
    }

    return TANGUY.set_kbd();
};

TANGUY.set_kbd = function () {
    'use strict';
    var kbd = (4800 - TANGUY.osc1_pitch) * TANGUY.program.filter_kbd;

    switch (TANGUY.program.filter_mode) {
    case 'lp':
        TANGUY.lp_filter1.detune.setValueAtTime(kbd, TANGUY.synth.currentTime);
        TANGUY.lp_filter2.detune.setValueAtTime(kbd / 2, TANGUY.synth.currentTime);
        break;
    case 'bp':
        TANGUY.bp_filter1.detune.setValueAtTime(kbd, TANGUY.synth.currentTime);
        TANGUY.bp_filter2.detune.setValueAtTime(kbd, TANGUY.synth.currentTime);
        TANGUY.bp_filter3.detune.setValueAtTime(kbd, TANGUY.synth.currentTime);
        break;
    case 'hp':
        TANGUY.hp_filter1.detune.setValueAtTime(kbd, TANGUY.synth.currentTime);
        TANGUY.hp_filter2.detune.setValueAtTime(kbd, TANGUY.synth.currentTime);
        break;
    case 'notch':
        TANGUY.notch1.detune.setValueAtTime(kbd, TANGUY.synth.currentTime);
        TANGUY.notch2.detune.setValueAtTime(kbd, TANGUY.synth.currentTime);
        TANGUY.notch3.detune.setValueAtTime(kbd, TANGUY.synth.currentTime);
        break;
    case 'off':
        break;
    }
};
