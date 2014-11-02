//PORTAMENTO CONTROLS
$('#portamento-amount').change(function () {
    TANGUY.program.portamento.amt = parseFloat(this.value);
});
$('#portamento-off, #portamento-linear, #portamento-exponential').change(function () {
    TANGUY.program.portamento.mode = this.value;
});