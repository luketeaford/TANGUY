//NEW PORTAMENTO CONTROLS
$('#portamento').on('change', '#portamento-amount, #portamento-off, #portamento-linear, #portamento-exponential', function () {
    'use strict';
    var x = this.getAttribute('data-portamento');
    if (x === 'amount') {
        TANGUY.program.portamento_amt = parseFloat(this.value);
    } else {
        TANGUY.program.portamento_mode = this.value;
    }
});