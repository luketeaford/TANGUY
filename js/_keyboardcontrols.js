TANGUY.key_press = function (x, key) {
    'use strict';
    TANGUY.recent = key;
    return $(x).trigger('touchstart').addClass('playing');
};

TANGUY.key_release = function (x) {
    'use strict';
    TANGUY.recent = 0;
    return $(x).trigger('touchend').removeClass('playing');
};

TANGUY.qwerty_press = function (key) {
    'use strict';
    switch (key.which) {
    case 45:
    case 122:
        TANGUY.shift_octave(-1);
        break;
    case 43:
    case 61:
    case 120:
        TANGUY.shift_octave(1);
        break;
    case 44:
    case 60:
        TANGUY.change_program(-1);
        break;
    case 46:
    case 62:
        TANGUY.change_program(1);
        break;
    case 42:
        TANGUY.save_program();
        break;
    case 96:
    case 126:
        TANGUY.toggle_legato();
        break;
    }
};

TANGUY.qwerty_down = function (key) {
    'use strict';
    if (TANGUY.recent !== key.which) {
        switch (key.which) {
        // Qwerty keyboard control
        case 65:
            TANGUY.key_press('#c1', key.which);
            break;
        case 83:
            TANGUY.key_press('#d1', key.which);
            break;
        case 68:
            TANGUY.key_press('#e1', key.which);
            break;
        case 70:
            TANGUY.key_press('#f1', key.which);
            break;
        case 71:
            TANGUY.key_press('#g1', key.which);
            break;
        case 72:
            TANGUY.key_press('#a1', key.which);
            break;
        case 74:
            TANGUY.key_press('#b1', key.which);
            break;
        case 75:
            TANGUY.key_press('#c2', key.which);
            break;
        case 76:
            TANGUY.key_press('#d2', key.which);
            break;
        case 186:
            TANGUY.key_press('#e2', key.which);
            break;
        case 222:
            TANGUY.key_press('#f2', key.which);
            break;
        case 87:
            TANGUY.key_press('#cs1', key.which);
            break;
        case 69:
            TANGUY.key_press('#ds1', key.which);
            break;
        case 84:
            TANGUY.key_press('#fs1', key.which);
            break;
        case 89:
            TANGUY.key_press('#gs1', key.which);
            break;
        case 85:
            TANGUY.key_press('#as1', key.which);
            break;
        case 79:
            TANGUY.key_press('#cs2', key.which);
            break;
        case 80:
            TANGUY.key_press('#ds2', key.which);
            break;
        case 221:
            TANGUY.key_press('#fs2', key.which);
            break;
        // Shift pitch bend
        case 16:
            TANGUY.pitch_bend(1200);
            break;
        }
    }
};

TANGUY.qwerty_up = function (key) {
    'use strict';
    switch (key.which) {
    // Qwerty keyboard control
    case 65:
        TANGUY.key_release('#c1');
        break;
    case 83:
        TANGUY.key_release('#d1');
        break;
    case 68:
        TANGUY.key_release('#e1');
        break;
    case 70:
        TANGUY.key_release('#f1');
        break;
    case 71:
        TANGUY.key_release('#g1');
        break;
    case 72:
        TANGUY.key_release('#a1');
        break;
    case 74:
        TANGUY.key_release('#b1');
        break;
    case 75:
        TANGUY.key_release('#c2');
        break;
    case 76:
        TANGUY.key_release('#d2');
        break;
    case 186:
        TANGUY.key_release('#e2');
        break;
    case 222:
        TANGUY.key_release('#f2');
        break;
    case 87:
        TANGUY.key_release('#cs1');
        break;
    case 69:
        TANGUY.key_release('#ds1');
        break;
    case 84:
        TANGUY.key_release('#fs1');
        break;
    case 89:
        TANGUY.key_release('#gs1');
        break;
    case 85:
        TANGUY.key_release('#as1');
        break;
    case 79:
        TANGUY.key_release('#cs2');
        break;
    case 80:
        TANGUY.key_release('#ds2');
        break;
    case 221:
        TANGUY.key_release('#fs2');
        break;
    // Shift pitch bend
    case 16:
        TANGUY.pitch_bend(0);
        break;
    }
};
