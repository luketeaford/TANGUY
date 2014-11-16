//LFO CONTROLS
$('#lfo-shape').on('change', 'input', function () {
    'use strict';
    switch (this.value) {
    case 'sawtooth':
        TANGUY.program.lfo.shape = 'sawtooth';
        TANGUY.program.mod.direction = -1;
        break;
    case 'ramp':
        TANGUY.program.lfo.shape = 'sawtooth';
        TANGUY.program.mod.direction = 1;
        break;
    case 'sine':
    case 'triangle':
    case 'square':
        TANGUY.program.lfo.shape = this.value;
        TANGUY.program.mod.direction = 1;
        break;
    }
    TANGUY.lfo.type = TANGUY.program.lfo.shape;
    TANGUY.calculate_lfo();
});

//LFO CONTROLS - GOOD
TANGUY.update_lfo_rate = function () {
    'use strict';
    TANGUY.lfo.frequency.value = TANGUY.program.lfo_rate * TANGUY.program.lfo_rate * 100;
    return;
};

TANGUY.update_lfo_pitch = function () {
    'use strict';
    TANGUY.lfo_pitch_vca.gain.value = TANGUY.program.lfo_pitch * TANGUY.program.mod_amt * TANGUY.program.mod_direction;
    return;
};

TANGUY.update_lfo_filter = function () {
    'use strict';
    TANGUY.lfo_filter_vca.gain.value = TANGUY.program.lfo.filter_amt * TANGUY.program.mod_amt * TANGUY.program.mod_direction;
    return;
};

TANGUY.update_lfo_amp = function () {
    'use strict';
    TANGUY.lfo_amp_vca.gain.value = TANGUY.program.lfo.amp_amt * TANGUY.program.mod_amt * TANGUY.program.mod_direction;
    return;
};