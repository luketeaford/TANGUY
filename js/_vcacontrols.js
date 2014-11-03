//VCA CONTROLS
$('#vca-attack').change(function () {
    'use strict';
    TANGUY.program.vca.attack = parseFloat(this.value);
});
$('#vca-decay').change(function () {
    'use strict';
    TANGUY.program.vca.decay = this.value;
});
$('#vca-sustain').change(function () {
    'use strict';
    TANGUY.program.vca.sustain = this.value;
});
$('#vca-release').change(function () {
    'use strict';
    TANGUY.program.vca.release = this.value;
});
$('#vca-gain').mousedown(function () {
    'use strict';
    $(this).mousemove(function () {
        TANGUY.program.vca.gain = this.value * this.value;
        TANGUY.vca.gain.setTargetAtTime(TANGUY.program.vca.gain, TANGUY.synth.currentTime, 0.01);
    });
}).mouseup(TANGUY.stop_tweaking);