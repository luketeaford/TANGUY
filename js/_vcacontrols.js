//VCA ENVELOPE CONTROLS
/* This is an earlier idea that is kind of on the right track...
$('#vca-eg').on('change', '#vca-attack, #vca-decay, #vca-sustain, #vca-release', $(this), function (e) {
    'use strict';
    var param = e.currentTarget.getAttribute('data-param');
    TANGUY.program.vca[param] = parseFloat(e.currentTarget.value);
});*/

$('#vca-gain').mousedown(function () {
    'use strict';
    $(this).mousemove(function () {
        TANGUY.program.vca.gain = this.value * this.value;
        TANGUY.vca.gain.setTargetAtTime(TANGUY.program.vca.gain, TANGUY.synth.currentTime, 0.01);
    });
}).mouseup(TANGUY.stop_tweaking);