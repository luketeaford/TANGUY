TANGUY.route_external_input = function (input) {
    'use strict';
    TANGUY.ext_in = TANGUY.synth.createMediaStreamSource(input);
    TANGUY.ext_in.connect(TANGUY.ext_in_vca);
};

TANGUY.external_input_error = function () {
    'use strict';
    console.log('External input denied');
};

if (navigator.getUserMedia) {
    navigator.getUserMedia({audio: true}, TANGUY.route_external_input, TANGUY.external_input_error);
} else {
    console.log('External input unavailable');
}
