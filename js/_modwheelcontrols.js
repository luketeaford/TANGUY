//MOD WHEEL CONTROLS
$('#mod-amount').mousedown(function () {
    'use strict';
    $(this).mousemove(function () {
        TANGUY.program.mod.amt = this.value;
        TANGUY.calculate_lfo();
    });
}).mouseup(TANGUY.stop_tweaking);