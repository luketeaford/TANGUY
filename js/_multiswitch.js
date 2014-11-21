//NEW MULTI SWITCH
/*TANGUY.multi_switch = function (e) {
    'use strict';
    var button = e.currentTarget === undefined ? $(e) : $(e.currentTarget);
    console.log('You hit the good multi-switch!');
    return button.parent().addClass('selected').siblings().removeClass('selected');
};
*/
//MULTI-SWITCH CONTROLS
//$('#osc1-coarse, #osc2-coarse, #osc2-waveform, #noise-color, #filter-mode, #lfo-shape, #portamento-mode').on('change', 'input', $(this), TANGUY.multi_switch);