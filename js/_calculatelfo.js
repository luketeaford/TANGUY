TANGUY.calculate_lfo = function () {
    var i;
    for (i = 0; i < arguments.length; i += 1) {
        if (arguments[i] === 'pitch') {
            TANGUY.lfo_pitch_vca.gain.value = TANGUY.program.lfo.pitch_amt * TANGUY.program.mod.amt * TANGUY.program.mod.direction;
        }
        if (arguments[i] === 'filter') {
            TANGUY.lfo_filter_vca.gain.value = TANGUY.program.lfo.filter_amt * TANGUY.program.mod.amt * TANGUY.program.mod.direction;
        }
        if (arguments[i] === 'amp') {
            TANGUY.lfo_amp_vca.gain.value = TANGUY.program.lfo.amp_amt * TANGUY.program.mod.amt * TANGUY.program.mod.direction;
        }
    }
    if (arguments.length === 0) {
        TANGUY.calculate_lfo('pitch', 'filter', 'amp');
    }
}