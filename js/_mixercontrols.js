TANGUY.update_osc1_mix = function () {
    'use strict';
    return TANGUY.osc1_vca.gain.setValueAtTime(TANGUY.program.osc1_mix * TANGUY.program.osc1_mix, TANGUY.synth.currentTime);
};

TANGUY.update_osc2_mix = function () {
    'use strict';
    return TANGUY.osc2_vca.gain.setValueAtTime(TANGUY.program.osc2_mix * TANGUY.program.osc2_mix, TANGUY.synth.currentTime);
};

TANGUY.update_noise_mix = function () {
    'use strict';
    return TANGUY.noise_vca.gain.setValueAtTime(TANGUY.program.noise_mix * TANGUY.program.noise_mix, TANGUY.synth.currentTime);
};

TANGUY.update_ext_mix = function () {
    'use strict';
    return TANGUY.ext_in_vca.gain.setValueAtTime(TANGUY.program.ext_in_mix * TANGUY.program.ext_in_mix, TANGUY.synth.currentTime);
};
