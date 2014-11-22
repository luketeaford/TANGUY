TANGUY.button = {
    touch: function () {
        'use strict';
        var config = {
            program: this.parentNode.parentNode.getAttribute('data-program'),
            update: this.parentNode.parentNode.getAttribute('data-update')
        };
        TANGUY.button.change($(this));
        return $(this).one('click', config, TANGUY.store_program);
    },
    change: function (e) {
        'use strict';
        var button = e.currentTarget === undefined ? $(e) : $(e.currentTarget);
        return button.parent().addClass('selected').siblings().removeClass('selected');
    }
};

//SLOPPY BINDINGS
$('#osc1-kbd').on('change', 'input', TANGUY.button.touch);
$('#osc1-coarse').on('change', 'input', TANGUY.button.touch);
$('#osc2-kbd').on('change', 'input', TANGUY.button.touch);
$('#osc2-coarse').on('change', 'input', TANGUY.button.touch);
$('#osc2-waveform').on('change', 'input', TANGUY.button.touch);
$('#noise-color').on('change', 'input', TANGUY.button.touch);
$('#filter-mode').on('change', 'input', TANGUY.button.touch);
$('#lfo-shape').on('change', 'input', TANGUY.button.touch);
$('#portamento-mode').on('change', 'input', TANGUY.button.touch);