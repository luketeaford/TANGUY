//PORTAMENTO SLIDER
TANGUY.update_portamento = function () {
    'use strict';
    console.log('PORTAMENTO AMOUNT ' + TANGUY.program.portamento);
    return;
};

//PORTAMENTO BUTTONS
TANGUY.update_portamento_mode = function () {
    'use strict';
    console.log('PORTAMENTO MODE ' + TANGUY.program.portamento_mode);
    return;
};


//PORTAMENTO SLIDER - GROSS
// This is one event that is doing all the saving to the program. Needs to work like envelope sliders
$('#portamento').on('change', '#portamento-amount, #portamento-off, #portamento-linear, #portamento-exponential', function () {
    'use strict';
    var x = this.getAttribute('data-portamento');
    if (x === 'amount') {
        TANGUY.program.portamento = parseFloat(this.value);
    } else {
        TANGUY.program.portamento_mode = this.value;
    }
});