TANGUY.save_program = function () {
    'use strict';
    var patch_name = prompt('PATCH NAME');
    TANGUY.program.name = patch_name;
    console.log('SAVE PROGRAM: ' + JSON.stringify(TANGUY.program));
};