TANGUY.calculate_pitch = function (pos, note_value) {
    'use strict';
    var note = ((TANGUY.octave_shift + pos) * 1200) + note_value,
        osc2_note = ((TANGUY.octave_shift + pos) * 1200) + (note_value + TANGUY.program.osc2.detune),
        kbd = (4800 - note) * TANGUY.program.filter_kbd,
        osc1 = [TANGUY.osc1_saw, TANGUY.osc1_sqr, TANGUY.osc1_tri, TANGUY.osc1_sin],
        i,
        no_portamento = function () {
            if (TANGUY.program.osc1.kbd === true) {
                for (i = 0; i < 4; i += 1) {
                    osc1[i].detune.setValueAtTime(note, TANGUY.synth.currentTime);
                }
            }
            if (TANGUY.program.osc2.kbd === true) {
                TANGUY.osc2.detune.setValueAtTime(osc2_note, TANGUY.synth.currentTime);
            }
        },
        linear_portamento = function () {
            if (TANGUY.program.osc1.kbd === true) {
                for (i = 0; i < 4; i += 1) {
                    osc1[i].detune.linearRampToValueAtTime(note, TANGUY.synth.currentTime + parseFloat(TANGUY.program.portamento.amt));
                }
            }
            if (TANGUY.program.osc2.kbd === true) {
                TANGUY.osc2.detune.linearRampToValueAtTime(osc2_note, TANGUY.synth.currentTime + parseFloat(TANGUY.program.portamento.amt));
            }
        },
        exponential_portamento = function () {
            if (TANGUY.program.osc1.kbd === true) {
                for (i = 0; i < 4; i += 1) {
                    osc1[i].detune.setTargetAtTime(note, TANGUY.synth.currentTime, TANGUY.program.portamento.amt / 5);
                }
            }
            if (TANGUY.program.osc2.kbd === true) {
                TANGUY.osc2.detune.setTargetAtTime(osc2_note, TANGUY.synth.currentTime, TANGUY.program.portamento.amt / 5);
            }
        };

    TANGUY.osc1_pitch = note;
    TANGUY.osc2_pitch = osc2_note;

    //OSCILLATOR TRACKING
    switch (TANGUY.program.portamento.mode) {
    case 'off':
        no_portamento();
        break;
    case 'linear':
        linear_portamento();
        break;
    case 'exponential':
        exponential_portamento();
        break;
    }

    //FILTER KEYBOARD TRACKING
    switch (TANGUY.program.filter.mode) {
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