TANGUY.load_program = function (patch) {
    'use strict';
    var patch_url = encodeURI('programs/') + patch + '.json';
        //osc1 = [TANGUY.osc1_saw, TANGUY.osc1_sqr, TANGUY.osc1_tri, TANGUY.osc1_sin],
        //delay = [TANGUY.delay1, TANGUY.delay2, TANGUY.delay3, TANGUY.delay4],
        //delay_vcas = [TANGUY.delay1_vca, TANGUY.delay2_vca, TANGUY.delay3_vca, TANGUY.delay4_vca],
        //i;
    $.getJSON(decodeURI(patch_url), function (loaded) {
        //var osc1_kbd = $('#osc1-kbd'),
        //    osc2_kbd = $('#osc2-kbd'),
        //    x;
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