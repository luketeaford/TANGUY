//LFO CONTROLS
$('#lfo-sin, #lfo-tri, #lfo-rmp, #lfo-saw, #lfo-sqr').change(function () {
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
$('#lfo-rate').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.lfo.rate = (this.value * this.value) * 100;
        TANGUY.lfo.frequency.value = (this.value * this.value) * 100;
    });
}).mouseup(TANGUY.stop_tweaking);
$('#lfo-pitch').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.lfo.pitch_amt = this.value;
        TANGUY.calculate_lfo('pitch');
    });
}).mouseup(TANGUY.stop_tweaking);
$('#lfo-filter').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.lfo.filter_amt = this.value;
        TANGUY.calculate_lfo('filter');
    });
}).mouseup(TANGUY.stop_tweaking);
$('#lfo-amp').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.lfo.amp_amt = this.value;
        TANGUY.calculate_lfo('amp');
    });
}).mouseup(TANGUY.stop_tweaking);