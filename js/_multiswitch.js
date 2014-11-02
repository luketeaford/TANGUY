TANGUY.multi_switch = function (gizmo) {
    $(gizmo).parent().addClass('selected').siblings().removeClass('selected');
};

//MULTI-SWITCH CONTROLS
$('#osc1-coarse, #osc2-coarse, #portamento-mode, #osc2-waveform, #noise-color, #filter-mode, #lfo-shape').find('input').click(function () {
    TANGUY.multi_switch(this);
});