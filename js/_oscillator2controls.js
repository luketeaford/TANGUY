//OSCILLATOR 2 CONTROLS
$('#osc2-kbd').change(function () {
    'use strict';
    TANGUY.program.osc2.kbd = this.checked ? true : false;
});
$('#osc2-coarse').on('change', 'input', function () {
    'use strict';
    TANGUY.program.osc2.coarse = this.value;
    TANGUY.osc2.frequency.setValueAtTime(TANGUY.osc2_master_pitch * this.value, TANGUY.synth.currentTime);
});
$('#osc2-detune').mousedown(function () {
    'use strict';
    $(this).mousemove(function () {
        TANGUY.program.osc2.detune = parseFloat(this.value);
        if (TANGUY.osc2_pitch === undefined) {
            TANGUY.osc2_pitch = TANGUY.osc2_master_pitch;
        }
        TANGUY.osc2.detune.setValueAtTime(TANGUY.osc2_pitch + TANGUY.program.osc2.detune, TANGUY.synth.currentTime);
    });
}).mouseup(TANGUY.stop_tweaking);
$('#osc2-fine').mousedown(function () {
    'use strict';
    $(this).mousemove(function () {
        TANGUY.program.osc2.fine = parseFloat(this.value);
        TANGUY.osc2.frequency.setValueAtTime((TANGUY.osc2_master_pitch * TANGUY.program.osc2.coarse) + TANGUY.program.osc2.fine, TANGUY.synth.currentTime);
    });
}).mouseup(TANGUY.stop_tweaking);
$('#osc2-waveform').on('change', '#osc2-saw, #osc2-sqr, #osc2-tri, #osc2-sin', function () {
    'use strict';
    TANGUY.program.osc2.waveform = this.value;
    TANGUY.osc2.type = this.value;
});
$('#osc2-waveshape').mousedown(function () {
    'use strict';
    $(this).mousemove(function () {
        var x = this.value;
        TANGUY.program.osc2.shape_amt = this.value;
        if (x > 0) {
            TANGUY.waveshaper.curve = new Float32Array([x * 1.6, x * -2.5, x * -1.2, x * -2.4, x * -1.6, x * -3.2, x * 6.4, x * -3.2]);
        } else {
            TANGUY.waveshaper.curve = null;
        }
    });
}).mouseup(TANGUY.stop_tweaking);
$('#osc2-fm').mousedown(function () {
    'use strict';
    $(this).mousemove(function () {
        TANGUY.program.osc2.fm_amt = this.value;
        TANGUY.osc2_fm_vca.gain.setValueAtTime((this.value * this.value) * 24000, TANGUY.synth.currentTime);
    });
}).mouseup(TANGUY.stop_tweaking);