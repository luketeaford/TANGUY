TANGUY.store_program = function (e) {
    'use strict';
    switch (e.data.program) {
    case 'osc1_kbd':
    case 'osc2_kbd':
        TANGUY.program[e.data.program] = e.currentTarget.checked;
        break;
    case 'osc2_waveform':
    case 'noise_color':
    case 'filter_mode':
    case 'lfo_shape':
    case 'portamento_mode':
        TANGUY.program[e.data.program] = e.currentTarget.value;
        console.log('Portamento mode found');
        break;
    default:
        TANGUY.program[e.data.program] = parseFloat(e.currentTarget.value);
    }
    if (TANGUY[e.data.update]) {
        return TANGUY[e.data.update]();
    }
    return;
};