TANGUY.populate_programs = function () {
    'use strict';
    var buttons = '',
        i;
    for (i = 0; i < TANGUY.urls.length; i += 1) {
        buttons += '<button value="' + TANGUY.urls[i] + '">' + TANGUY.programs[i] + '</button>';
    }
    $('#program-select').append(buttons);

    TANGUY.populate_programs = function () {
        return true;
    };

    return TANGUY.load_program(TANGUY.urls[0]);
};
