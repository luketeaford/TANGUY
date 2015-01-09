$(document).ready(function () {
    'use strict';
    TANGUY.build_synth();
    TANGUY.order_programs();

    $('body').one('click', '#program-name', TANGUY.show_program);
    $('#program-select').on('click', 'button', function () {
        TANGUY.load_program(this.value);
    });

    //SLOPPY EVENTS
    $('#prev, #next').on('click', function () {
        console.log('Fix this!');
    });

    $('#octave-shift').on('click', 'button', function () {
        return TANGUY.shift_octave(this.getAttribute('data-octave-shift'));
    });
    $('#osc1-kbd, #osc1-coarse, #osc2-kbd, #osc2-coarse, #osc2-waveform, #noise-color, #filter-mode, #lfo-shape, #portamento-mode').on('change', 'input', TANGUY.button.touch);
    $('#delay, #filter-eg, #vca-eg, #mixer, #filter, #mod-wheel').on('mousedown', 'input', TANGUY.slider.grab);
    $('#osc1, #osc2, #lfo').on('mousedown', 'input.vertical-slider', TANGUY.slider.grab);
    $('#portamento').on('mousedown', 'input.horizontal-slider', TANGUY.slider.grab);

});
