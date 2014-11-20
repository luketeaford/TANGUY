TANGUY.store_program = function (e) {
    'use strict';
    switch (e.data.program) {
    case 'osc1_kbd':
    case 'osc2_kbd':
        TANGUY.program[e.data.program] = e.currentTarget.checked;
        break;
    case 'osc2_waveform':
        TANGUY.program[e.data.program] = e.currentTarget.value;
        break;
    default:
        TANGUY.program[e.data.program] = parseFloat(e.currentTarget.value);
    }
    if (TANGUY[e.data.update]) {
        return TANGUY[e.data.update]();
    }
    return;
};