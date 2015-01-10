TANGUY.load_program = function (patch) {
    'use strict';
    var patch_url = encodeURI('programs/') + patch + '.json';
    $.getJSON(decodeURI(patch_url), function (loaded) {
        TANGUY.program = loaded;
        TANGUY.program_number = TANGUY.urls.indexOf(patch);
        return TANGUY.update_program();
    });
};

TANGUY.show_program = function () {
    'use strict';
    $('#program-select').show();
    $(document).one('click', TANGUY.hide_program);
    return false;
};

TANGUY.hide_program = function () {
    'use strict';
    $('#program-select').hide();
    $('body').one('click', '#program-name', TANGUY.show_program);
    return false;
};

TANGUY.change_program = function (x) {
    'use strict';
    var y = TANGUY.program_number + parseInt(x, 10);
    if (y >= 0 && y < TANGUY.urls.length) {
        return TANGUY.load_program(TANGUY.urls[y]);
    }
};
