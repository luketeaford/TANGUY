TANGUY.update_vca_gain = function () {
    'use strict';
    return TANGUY.vca.gain.setTargetAtTime(TANGUY.program.vca_gain * TANGUY.program.vca_gain, TANGUY.synth.currentTime, 0.01);
};

TANGUY.toggle_legato = function () {
    'use strict';
    TANGUY.legato = TANGUY.legato ? false : true;
    if (TANGUY.legato) {
        TANGUY.button.change($('#legato-on'));
    } else {
        TANGUY.button.change($('#legato-off'));
    }
};

TANGUY.change_legato = function (e) {
    'use strict';
    TANGUY.legato = e.value === 'legato' ? true : false;
    return TANGUY.button.change($(e));
};
