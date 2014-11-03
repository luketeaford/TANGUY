//PORTAMENTO CONTROLS
$('#portamento-amount').change(function () {
    'use strict';
    TANGUY.program.portamento.amt = parseFloat(this.value);
});
$('#portamento-off, #portamento-linear, #portamento-exponential').change(function () {
    'use strict';
    TANGUY.program.portamento.mode = this.value;
});