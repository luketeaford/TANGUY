$(document).ready(function () {
    'use strict';
    TANGUY.build_synth();
    TANGUY.load_program('initialize');
    TANGUY.populate_programs();

    //PROBABLY OK
    $('body').one('click', '#program', TANGUY.show_program);

    //OK?
    $('#program-select').on('click', 'button', function () {
        TANGUY.load_program(this.value);
    });

    //OK?
    $('#octave-shift').on('click', 'button', function () {
        return TANGUY.shift_octave(this.getAttribute('data-octave-shift'));
    });

    //SLOPPY EVENT BINDINGS
    $('#osc1-kbd').on('change', 'input', TANGUY.button.touch);
    $('#osc1-coarse').on('change', 'input', TANGUY.button.touch);
    $('#osc2-kbd').on('change', 'input', TANGUY.button.touch);
    $('#osc2-coarse').on('change', 'input', TANGUY.button.touch);
    $('#osc2-waveform').on('change', 'input', TANGUY.button.touch);
    $('#noise-color').on('change', 'input', TANGUY.button.touch);
    $('#filter-mode').on('change', 'input', TANGUY.button.touch);
    $('#lfo-shape').on('change', 'input', TANGUY.button.touch);
    $('#portamento-mode').on('change', 'input', TANGUY.button.touch);

    //SLOPPY - CLEAN THESE UP LATER, OBVIOUSLY
    $('#delay').on('mousedown', 'input', TANGUY.slider.grab);
    $('#filter-eg').on('mousedown', 'input', TANGUY.slider.grab);
    $('#vca-eg').on('mousedown', 'input', TANGUY.slider.grab);
    $('#mixer').on('mousedown', 'input', TANGUY.slider.grab);
    $('#filter').on('mousedown', 'input', TANGUY.slider.grab);
    $('#osc1').on('mousedown', 'input.vertical-slider', TANGUY.slider.grab);
    $('#osc2').on('mousedown', 'input.vertical-slider', TANGUY.slider.grab);
    $('#lfo').on('mousedown', 'input.vertical-slider', TANGUY.slider.grab);
    $('#mod-wheel').on('mousedown', 'input', TANGUY.slider.grab);
    $('#portamento').on('mousedown', 'input.horizontal-slider', TANGUY.slider.grab);

});