$(document).ready(function () {
    'use strict';
    TANGUY.build_synth();
    TANGUY.order_programs();

    // Program selector bindings
    $('body').one('click', '#program-name', TANGUY.show_program);
    $('#program-select').on('click', 'button', function () {
        TANGUY.load_program(this.value);
    });
    $('#program').on('click', '#prev, #next', function () {
        return TANGUY.change_program(this.dataset.programShift);
    });

    // Panel controls
    $('#legato').on('click', 'input', function () {
        return TANGUY.change_legato(this);
    });
    $('#octave-shift').on('click', 'button', function () {
        console.log('Working like a charm!');
        return TANGUY.shift_octave(this.dataset.octaveShift);
    });
    $('#osc1-kbd, #osc1-coarse, #osc2-kbd, #osc2-coarse, #osc2-waveform, #noise-color, #filter-mode, #lfo-shape, #portamento-mode')
        .on('change', 'input', TANGUY.button.touch);

    // Sliders
    $('#osc1, #osc2, #mixer, #filter, #filter-eg, #vca-eg, #lfo, #delay')
        .on('mousedown touchstart', 'input.vertical-slider', TANGUY.slider.grab);

    // Performance controls
    $('#pitch-bend')
        .on('mousedown touchstart', TANGUY.pitch_wheel)
        .on('mouseup touchend', TANGUY.pitch_release);
    $('#mod-wheel').on('mousedown touchstart', 'input', TANGUY.slider.grab);
    $('#portamento').on('mousedown touchstart', '.horizontal-slider', TANGUY.slider.grab);

    $('#keyboard')
        // Start oscillators
        .one('mousedown keydown touchstart', 'button', TANGUY.start_synth)
        // Synth keys
        .on('mousedown touchstart', 'button', TANGUY.gate_on)
        .on('mouseup touchend', 'button', TANGUY.gate_off);

    // Qwerty keyboard
    $(document).on({
        keypress: TANGUY.qwerty_press,
        keydown: TANGUY.qwerty_down,
        keyup: TANGUY.qwerty_up
    });
});
