TANGUY.load_program = function (patch) {
    'use strict';
    var patch_url = encodeURI('programs/') + patch + '.json';
    $.getJSON(decodeURI(patch_url), function (loaded) {
        TANGUY.program = loaded;
        return TANGUY.update_program();
    });
};

//LOAD PROGRAM CONTROLS
$('#program-selector').change(function () {
    'use strict';
    TANGUY.load_program(this.value);
    $(this).blur();
});