// Possibly improved by passing event.data to this function directly
TANGUY.aftertouch = function () {
    'use strict';
    var delay = [
            TANGUY.delay1_vca,
            TANGUY.delay2_vca,
            TANGUY.delay3_vca,
            TANGUY.delay4_vca
        ],
        x = 1 - TANGUY.program.delay,
        y = event.data[1] / 100,
        z = TANGUY.program.delay + (x * y),
        i;

    for (i = 0; i < 4; i += 1) {
        delay[i].gain.setValueAtTime(z, TANGUY.synth.currentTime);
    }

    $('#delay-amt').val(z);
};
