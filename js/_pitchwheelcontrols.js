TANGUY.pitch_wheel = function () {
    'use strict';
    return $(this).on('mousemove touchmove', TANGUY.pitch_bend);
};

TANGUY.pitch_bend = function () {
    'use strict';
    var osc1 = [TANGUY.osc1_saw, TANGUY.osc1_sqr, TANGUY.osc1_tri, TANGUY.osc1_sin],
        i;
    for (i = 0; i < 4; i += 1) {
        osc1[i].detune.setTargetAtTime(TANGUY.osc1_pitch + (this.value * 100), TANGUY.synth.currentTime, 0.2);
    }
    TANGUY.osc2.detune.setTargetAtTime(TANGUY.osc2_pitch + (this.value * 100), TANGUY.synth.currentTime, 0.2);
};

TANGUY.pitch_release = function () {
    'use strict';
    var osc1 = [TANGUY.osc1_saw, TANGUY.osc1_sqr, TANGUY.osc1_tri, TANGUY.osc1_sin],
        i;

    $(this).val(0).unbind('mousemove touchmove');

    for (i = 0; i < 4; i += 1) {
        osc1[i].detune.setTargetAtTime(TANGUY.osc1_pitch + (this.value * 100), TANGUY.synth.currentTime, 0.2);
    }
    TANGUY.osc2.detune.setTargetAtTime(TANGUY.osc2_pitch + (this.value * 100), TANGUY.synth.currentTime, 0.2);
};

TANGUY.midi_pitch_bend = function () {
    'use strict';
    var osc1 = [TANGUY.osc1_saw, TANGUY.osc1_sqr, TANGUY.osc1_tri, TANGUY.osc1_sin],
        x = event.data[2],
        a = -0.002343457067866517 * (x * x),
        b = 19.195256842894636 * x,
        cents = a + b - 1200,
        i;

    for (i = 0; i < 4; i += 1) {
        osc1[i].detune.setTargetAtTime(TANGUY.osc1_pitch + cents, TANGUY.synth.currentTime, 0.2);
        TANGUY.osc2.detune.setTargetAtTime(TANGUY.osc2_pitch + cents, TANGUY.synth.currentTime, 0.2);
    }
    return $('#pitch-bend').val(cents / 100);
};
