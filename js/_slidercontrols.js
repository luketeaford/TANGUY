TANGUY.slider = {
    grab: function () {
        'use strict';
        var config = {
            program: this.getAttribute('data-program'),//filter_cutoff
            update: this.getAttribute('data-update')//update_cutoff (callback)
        };
        return $(this).mousemove(config, TANGUY.store_program).mouseup(TANGUY.slider.release);
    },

    release: function () {
        'use strict';
        return $(this).unbind('mousemove');
    }
};

//CLEAN THESE UP LATER, OBVIOUSLY
$('#delay').on('mousedown', 'input', TANGUY.slider.grab);
$('#filter-eg').on('mousedown', 'input', TANGUY.slider.grab);
$('#vca-eg').on('mousedown', 'input', TANGUY.slider.grab);
$('#mixer').on('mousedown', 'input', TANGUY.slider.grab);
$('#filter').on('mousedown', 'input', TANGUY.slider.grab);
$('#osc1').on('mousedown', 'input.vertical-slider', TANGUY.slider.grab);
$('#osc2').on('mousedown', 'input.vertical-slider', TANGUY.slider.grab);
$('#lfo').on('mousedown', 'input.vertical-slider', TANGUY.slider.grab);
$('#mod-wheel').on('mousedown', 'input', TANGUY.slider.grab);