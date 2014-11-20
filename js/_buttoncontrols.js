TANGUY.button = {
    touch: function () {
        'use strict';
        var config = {
            program: this.parentNode.parentNode.getAttribute('data-program'),
            update: this.parentNode.parentNode.getAttribute('data-update')
        };
        return $(this).one('click', config, TANGUY.store_program);
    }
};

//SLOPPY BINDINGS
$('#osc1-coarse').on('change', 'input', TANGUY.button.touch);
$('#osc2-coarse').on('change', 'input', TANGUY.button.touch);
$('#osc2-waveform').on('change', 'input', TANGUY.button.touch);
$('#noise-color').on('change', 'input', TANGUY.button.touch);