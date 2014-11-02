//MIXER CONTROLS
$('#osc1-mix').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.mixer.osc1 = this.value;
        TANGUY.osc1_vca.gain.value = TANGUY.program.mixer.osc1;
    });
}).mouseup(TANGUY.stop_tweaking);
$('#osc2-mix').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.mixer.osc2 = this.value;
        TANGUY.osc2_vca.gain.value = TANGUY.program.mixer.osc2;
    });
}).mouseup(TANGUY.stop_tweaking);
$('#noise-mix').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.mixer.noise = this.value;
        TANGUY.noise_vca.gain.value = TANGUY.program.mixer.noise;
    });
}).mouseup(TANGUY.stop_tweaking);