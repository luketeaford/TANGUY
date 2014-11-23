TANGUY.update_program = function () {
    'use strict';

    //OSCILLATOR 1
    TANGUY.update_osc1_coarse();
    TANGUY.update_osc1_saw();
    TANGUY.update_osc1_sqr();
    TANGUY.update_osc1_tri();
    TANGUY.update_osc1_sin();
    TANGUY.update_osc1_fm();

    //OSCILLATOR 2
    TANGUY.update_osc2_coarse();
    TANGUY.update_osc2_waveform();
    TANGUY.update_osc2_detune();
    TANGUY.update_osc2_fine();
    TANGUY.update_osc2_shape();
    TANGUY.update_osc2_fm();

    //NOISE
    TANGUY.update_noise_color();

    //MIXER
    TANGUY.update_osc1_mix();
    TANGUY.update_osc2_mix();
    TANGUY.update_noise_mix();

    //FILTER
    TANGUY.update_filter_mode();
    TANGUY.update_cutoff();
    TANGUY.update_resonance();

    //VCA
    TANGUY.update_vca_gain();

    //LFO
    TANGUY.update_lfo_shape();
    TANGUY.update_lfo_rate();
    TANGUY.calculate_lfo();//update lfo amount?

    //DELAY
    TANGUY.update_delay_rate();
    TANGUY.update_delay_amt();

    return TANGUY.update_panel();
};