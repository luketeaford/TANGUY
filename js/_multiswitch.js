TANGUY.multi_switch = function (gizmo) {
    'use strict';
    $(gizmo).parent().addClass('selected').siblings().removeClass('selected');
};

//MULTI-SWITCH CONTROLS
$('#osc1-coarse, #osc2-coarse, #portamento-mode, #osc2-waveform, #noise-color, #filter-mode, #lfo-shape').find('input').click(function () {
    'use strict';
    TANGUY.multi_switch(this);
});