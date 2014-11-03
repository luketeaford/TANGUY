TANGUY.save_program = function () {
    var patch_name = prompt('PATCH NAME');
    TANGUY.program.name = patch_name;
    console.log('SAVE PROGRAM: ' + JSON.stringify(TANGUY.program));
};