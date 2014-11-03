//KEYBOARD CONTROLS
$('#keyboard button').mousedown(TANGUY.gate_on).mouseup(TANGUY.gate_off);

$(document).keypress(function (key) {
    'use strict';
    switch (key.which) {
    case 45:
        TANGUY.shift_octave(-1);
        break;
    case 43:
    case 61:
        TANGUY.shift_octave(1);
        break;
    case 42:
        TANGUY.save_program();
        break;
    }
}).keydown(function (key) {
    'use strict';
    if (TANGUY.key_down === false) {
        TANGUY.key_active = key.which;
        TANGUY.key_down = true;
        switch (key.which) {
        case 65:
            $('#c1').trigger('mousedown').addClass('playing');
            break;
        case 83:
            $('#d1').trigger('mousedown').addClass('playing');
            break;
        case 68:
            $('#e1').trigger('mousedown').addClass('playing');
            break;
        case 70:
            $('#f1').trigger('mousedown').addClass('playing');
            break;
        case 71:
            $('#g1').trigger('mousedown').addClass('playing');
            break;
        case 72:
            $('#a1').trigger('mousedown').addClass('playing');
            break;
        case 74:
            $('#b1').trigger('mousedown').addClass('playing');
            break;
        case 75:
            $('#c2').trigger('mousedown').addClass('playing');
            break;
        case 76:
            $('#d2').trigger('mousedown').addClass('playing');
            break;
        case 186:
            $('#e2').trigger('mousedown').addClass('playing');
            break;
        case 222:
            $('#f2').trigger('mousedown').addClass('playing');
            break;
        case 87:
            $('#cs1').trigger('mousedown').addClass('playing');
            break;
        case 69:
            $('#ds1').trigger('mousedown').addClass('playing');
            break;
        case 84:
            $('#fs1').trigger('mousedown').addClass('playing');
            break;
        case 89:
            $('#gs1').trigger('mousedown').addClass('playing');
            break;
        case 85:
            $('#as1').trigger('mousedown').addClass('playing');
            break;
        case 79:
            $('#cs2').trigger('mousedown').addClass('playing');
            break;
        case 80:
            $('#ds2').trigger('mousedown').addClass('playing');
            break;
        case 221:
            $('#fs2').trigger('mousedown').addClass('playing');
            break;
        }
    }
}).keyup(function (key) {
    'use strict';
    if (key.which === TANGUY.key_active) {
        TANGUY.key_down = false;
        switch (key.which) {
        case 65:
            $('#c1').trigger('mouseup').removeClass('playing');
            break;
        case 83:
            $('#d1').trigger('mouseup').removeClass('playing');
            break;
        case 68:
            $('#e1').trigger('mouseup').removeClass('playing');
            break;
        case 70:
            $('#f1').trigger('mouseup').removeClass('playing');
            break;
        case 71:
            $('#g1').trigger('mouseup').removeClass('playing');
            break;
        case 72:
            $('#a1').trigger('mouseup').removeClass('playing');
            break;
        case 74:
            $('#b1').trigger('mouseup').removeClass('playing');
            break;
        case 75:
            $('#c2').trigger('mouseup').removeClass('playing');
            break;
        case 76:
            $('#d2').trigger('mouseup').removeClass('playing');
            break;
        case 186:
            $('#e2').trigger('mouseup').removeClass('playing');
            break;
        case 222:
            $('#f2').trigger('mouseup').removeClass('playing');
            break;
        case 87:
            $('#cs1').trigger('mouseup').removeClass('playing');
            break;
        case 69:
            $('#ds1').trigger('mouseup').removeClass('playing');
            break;
        case 84:
            $('#fs1').trigger('mouseup').removeClass('playing');
            break;
        case 89:
            $('#gs1').trigger('mouseup').removeClass('playing');
            break;
        case 85:
            $('#as1').trigger('mouseup').removeClass('playing');
            break;
        case 79:
            $('#cs2').trigger('mouseup').removeClass('playing');
            break;
        case 80:
            $('#ds2').trigger('mouseup').removeClass('playing');
            break;
        case 221:
            $('#fs2').trigger('mouseup').removeClass('playing');
            break;
        }
    }
});