TANGUY.load_program = function (patch) {
    'use strict';
    var patch_url = encodeURI('programs/') + patch + '.json';
    $.getJSON(decodeURI(patch_url), function (loaded) {
        TANGUY.program = loaded;
        return TANGUY.update_program();
    });
};



//LOAD PROGRAM CONTROLS - WORK IN PROGRESS
$('#program').on('click', function () {
    'use strict';
    console.log('Program field clicked');
    $('#program-select').toggle();//THIS SHOULD BE CACHED GLOBALLY?
});

//NEW LOAD PROGRAM CONTROLS (TO BE MADE A FREE FUNCTION!)
$('#program-select').on('click', 'button', function () {
    'use strict';
    TANGUY.load_program(this.value);
});

