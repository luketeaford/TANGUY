TANGUY.multi_switch = function (e) {
    'use strict';
    if (e.currentTarget === undefined) {
        $(e).parent().addClass('selected').siblings().removeClass('selected');
    } else {
        return $(e.currentTarget).parent().addClass('selected').siblings().removeClass('selected');
    }
};

//MULTI-SWITCH CONTROLS
$('#osc1-coarse, #osc2-coarse, #portamento-mode, #osc2-waveform, #noise-color, #filter-mode, #lfo-shape').on('click', 'input', $(this), TANGUY.multi_switch);