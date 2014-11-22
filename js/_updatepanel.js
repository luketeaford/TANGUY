TANGUY.update_panel = function () {
    'use strict';

    //OSC 1 KEYTRACKING
    if (TANGUY.program.osc1_kbd) {
        TANGUY.button.change($('#osc1-on'));
    } else {
        TANGUY.button.change($('#osc1-off'));
    }

    //OSCILLATOR 1
    switch (TANGUY.program.osc1_coarse) {
    case 0.5:
        TANGUY.button.change($('#osc1-32'));
        break;
    case 1:
        TANGUY.button.change($('#osc1-16'));
        break;
    case 2:
        TANGUY.button.change($('#osc1-8'));
        break;
    case 4:
        TANGUY.button.change($('#osc1-4'));
        break;
    }
    $('#osc1-saw').val(TANGUY.program.osc1_saw);
    $('#osc1-sqr').val(TANGUY.program.osc1_sqr);
    $('#osc1-tri').val(TANGUY.program.osc1_tri);
    $('#osc1-sin').val(TANGUY.program.osc1_sin);
    $('#osc1-fm').val(TANGUY.program.osc1_fm);

    //OSCILLATOR 2
    //OSC 2 KEYTRACKING
    if (TANGUY.program.osc2_kbd) {
        TANGUY.button.change($('#osc2-on'));
    } else {
        TANGUY.button.change($('#osc2-off'));
    }

    switch (TANGUY.program.osc2_coarse) {
    case 0.5:
        TANGUY.button.change($('#osc2-32'));
        break;
    case 1:
        TANGUY.button.change($('#osc2-16'));
        break;
    case 2:
        TANGUY.button.change($('#osc2-8'));
        break;
    case 4:
        TANGUY.button.change($('#osc2-4'));
        break;
    }
    switch (TANGUY.program.osc2_waveform) {
    case 'sawtooth':
        TANGUY.button.change($('#osc2-saw'));
        break;
    case 'square':
        TANGUY.button.change($('#osc2-sqr'));
        break;
    case 'triangle':
        TANGUY.button.change($('#osc2-tri'));
        break;
    case 'sine':
        TANGUY.button.change($('#osc2-sin'));
        break;
    }
    $('#osc2-detune').val(TANGUY.program.osc2_detune);
    $('#osc2-fine').val(TANGUY.program.osc2_fine);
    $('#osc2-waveshape').val(TANGUY.program.osc2_shape);
    $('#osc2-fm').val(TANGUY.program.osc2_fm);

    //NOISE
    switch (TANGUY.program.noise_color) {
    case 'white':
        TANGUY.button.change($('#white-noise'));
        break;
    case 'pink':
        TANGUY.button.change($('#pink-noise'));
        break;
    case 'red':
        TANGUY.button.change($('#red-noise'));
        break;
    case 'blue':
        TANGUY.button.change($('#blue-noise'));
        break;
    case 'purple':
        TANGUY.button.change($('#purple-noise'));
        break;
    }

    //MIXER
    $('#osc1-mix').val(TANGUY.program.osc1_mix);
    $('#osc2-mix').val(TANGUY.program.osc2_mix);
    $('#noise-mix').val(TANGUY.program.noise_mix);

    //FILTER
    switch (TANGUY.program.filter_mode) {
    case 'lp':
        TANGUY.button.change($('#filter-lp'));
        break;
    case 'bp':
        TANGUY.button.change($('#filter-bp'));
        break;
    case 'hp':
        TANGUY.button.change($('#filter-hp'));
        break;
    case 'notch':
        TANGUY.button.change($('#filter-notch'));
        break;
    case 'off':
        TANGUY.button.change($('#filter-off'));
        break;
    }
    $('#cutoff').val(TANGUY.program.cutoff);
    $('#resonance').val(TANGUY.program.res);
    $('#filter-envelope-amount').val(TANGUY.program.filter_eg);
    $('#filter-keyboard-tracking').val(TANGUY.program.filter_kbd);
    $('#filter-attack').val(TANGUY.program.filter_attack);
    $('#filter-decay').val(TANGUY.program.filter_decay);
    $('#filter-sustain').val(TANGUY.program.filter_sustain);
    $('#filter-release').val(TANGUY.program.filter_release);

    //VCA
    $('#vca-attack').val(TANGUY.program.vca_attack);
    $('#vca-decay').val(TANGUY.program.vca_decay);
    $('#vca-sustain').val(TANGUY.program.vca_sustain);
    $('#vca-release').val(TANGUY.program.vca_release);
    $('#vca-gain').val(TANGUY.program.vca_gain);

    //LFO
    switch (TANGUY.program.lfo_shape) {
    case 'sine':
        TANGUY.button.change($('#lfo-sin'));
        break;
    case 'triangle':
        TANGUY.button.change($('#lfo-tri'));
        break;
    case 'ramp':
        TANGUY.button.change($('#lfo-rmp'));
        break;
    case 'sawtooth':
        TANGUY.button.change($('#lfo-saw'));
        break;
    case 'square':
        TANGUY.button.change($('#lfo-sqr'));
        break;
    }
    $('#lfo-rate').val(TANGUY.program.lfo_rate);
    $('#lfo-pitch').val(TANGUY.program.lfo_pitch);
    $('#lfo-filter').val(TANGUY.program.lfo_filter);
    $('#lfo-amp').val(TANGUY.program.lfo_amp);

    //DELAY
    $('#delay-rate').val(TANGUY.program.delay_rate);
    $('#delay-amount').val(TANGUY.program.delay);

    //PORTAMENTO
    switch (TANGUY.program.portamento_mode) {
    case 'off':
        TANGUY.button.change($('#portamento-off'));
        break;
    case 'linear':
        TANGUY.button.change($('#portamento-linear'));
        break;
    case 'exponential':
        TANGUY.button.change($('#portamento-exponential'));
        break;
    }
    $('#portamento-amount').val(TANGUY.program.portamento);

    //MODWHEEL
    $('#mod-amount').val(TANGUY.program.mod);

};