TANGUY.populate_programs = function () {
    'use strict';
    console.log('NEW ONE WORKS');
    var buttons = '',
        i;
    for (i = 0; i < TANGUY.urls.length; i += 1) {
        buttons += '<button value="' + TANGUY.urls[i] + '">' + TANGUY.programs[i] + '</button>';
    }
    $('#program-select').append(buttons);
    return TANGUY.load_program(TANGUY.urls[0]);
};
