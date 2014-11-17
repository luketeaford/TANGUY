TANGUY.update_panel = function () {
    'use strict';
    console.log('UPDATING THE PANEL, MASTER');

    //OSCILLATOR 1
    $('#osc1-saw').val(TANGUY.program.osc1_saw);
    $('#osc1-sqr').val(TANGUY.program.osc1_sqr);
    $('#osc1-tri').val(TANGUY.program.osc1_tri);
    $('#osc1-sin').val(TANGUY.program.osc1_sin);
    $('#osc1-fm').val(TANGUY.program.osc1_fm);

    //OSCILLATOR 2
    $('#osc2-detune').val(TANGUY.program.osc2_detune);
    $('#osc2-fine').val(TANGUY.program.osc2_fine);
    $('#osc2-waveshape').val(TANGUY.program.osc2_shape);
    $('#osc2-fm').val(TANGUY.program.osc2_fm);

    //NOISE

    //MIXER
    $('#osc1-mix').val(TANGUY.program.osc1_mix);
    $('#osc2-mix').val(TANGUY.program.osc2_mix);
    $('#noise-mix').val(TANGUY.program.noise_mix);

    //FILTER
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
    $('#lfo-rate').val(TANGUY.program.lfo_rate);
    $('#lfo-pitch').val(TANGUY.program.lfo_pitch);
    $('#lfo-filter').val(TANGUY.program.lfo_filter);
    $('#lfo-amp').val(TANGUY.program.lfo_amp);

    //DELAY
    $('#delay-rate').val(TANGUY.program.delay_rate);
    $('#delay-amount').val(TANGUY.program.delay);

    //PORTAMENTO
    $('#portamento-amount').val(TANGUY.program.portamento);

    //MODWHEEL
    $('#mod-amount').val(TANGUY.program.mod_amt);

};