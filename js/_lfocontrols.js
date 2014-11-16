//LFO CONTROLS
$('#lfo-shape').on('change', 'input', function () {
    'use strict';
    switch (this.value) {
    case 'sawtooth':
        TANGUY.program.lfo_shape = 'sawtooth';
        TANGUY.program.mod_direction = -1;
        break;
    case 'ramp':
        TANGUY.program.lfo_shape = 'sawtooth';
        TANGUY.program.mod_direction = 1;
        break;
    case 'sine':
    case 'triangle':
    case 'square':
        TANGUY.program.lfo_shape = this.value;
        TANGUY.program.mod_direction = 1;
        break;
    }
    TANGUY.lfo.type = TANGUY.program.lfo_shape;
    TANGUY.calculate_lfo();
});

//LFO CONTROLS - GOOD
TANGUY.update_lfo_rate = function () {
    'use strict';
    return TANGUY.lfo.frequency.setValueAtTime(TANGUY.program.lfo_rate * TANGUY.program.lfo_rate * 100, TANGUY.synth.currentTime);
};

TANGUY.update_lfo_pitch = function () {
    'use strict';
    return TANGUY.lfo_pitch_vca.gain.setValueAtTime(TANGUY.program.lfo_pitch * TANGUY.program.mod * TANGUY.program.mod_direction, TANGUY.synth.currentTime);

};

TANGUY.update_lfo_filter = function () {
    'use strict';
    return TANGUY.lfo_filter_vca.gain.setValueAtTime(TANGUY.program.lfo_filter * TANGUY.program.mod * TANGUY.program.mod_direction, TANGUY.synth.currentTime);
};

TANGUY.update_lfo_amp = function () {
    'use strict';
    return TANGUY.lfo_amp_vca.gain.setValueAtTime(TANGUY.program.lfo_amp * TANGUY.program.mod * TANGUY.program.mod_direction, TANGUY.synth.currentTime);
};