//OSCILLATOR 1 CONTROLS
$('#osc1-kbd').change(function () {
    'use strict';
    TANGUY.program.osc1.kbd = this.checked ? true : false;
});
$('#osc1-coarse').on('change', 'input', function () {
    'use strict';
    var osc1 = [TANGUY.osc1_saw, TANGUY.osc1_sqr, TANGUY.osc1_tri, TANGUY.osc1_sin],
        i;
    TANGUY.program.osc1.coarse = this.value;
    for (i = 0; i < 4; i += 1) {
        osc1[i].frequency.setValueAtTime(440 * this.value, TANGUY.synth.currentTime);
    }
});
$('#osc1-saw').mousedown(function () {
    'use strict';
    $(this).mousemove(function () {
        TANGUY.program.osc1.saw_amt = this.value;
        TANGUY.osc1_saw_vca.gain.setValueAtTime(this.value, TANGUY.synth.currentTime);
    });
}).mouseup(TANGUY.stop_tweaking);
$('#osc1-sqr').mousedown(function () {
    'use strict';
    $(this).mousemove(function () {
        TANGUY.program.osc1.sqr_amt = -1 * this.value;
        TANGUY.osc1_sqr_vca.gain.setValueAtTime(-1 * this.value, TANGUY.synth.currentTime);
    });
}).mouseup(TANGUY.stop_tweaking);
$('#osc1-tri').mousedown(function () {
    'use strict';
    $(this).mousemove(function () {
        TANGUY.program.osc1.tri_amt = this.value;
        TANGUY.osc1_tri_vca.gain.setValueAtTime(this.value, TANGUY.synth.currentTime);
    });
}).mouseup(TANGUY.stop_tweaking);
$('#osc1-sin').mousedown(function () {
    'use strict';
    $(this).mousemove(function () {
        TANGUY.program.osc1.sin_amt = this.value;
        TANGUY.osc1_sin_vca.gain.setValueAtTime(this.value, TANGUY.synth.currentTime);
    });
}).mouseup(TANGUY.stop_tweaking);
$('#osc1-fm').mousedown(function () {
    'use strict';
    $(this).mousemove(function () {
        TANGUY.program.osc1.fm_amt = this.value;
        TANGUY.osc1_fm_vca.gain.setValueAtTime((this.value * this.value) * 24000, TANGUY.synth.currentTime);
    });
}).mouseup(TANGUY.stop_tweaking);