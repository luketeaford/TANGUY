TANGUY.store_program = function (e) {
    'use strict';
    TANGUY.program[e.data.program] = parseFloat(e.currentTarget.value);
    if (TANGUY[e.data.update]) {
        return TANGUY[e.data.update]();
    }
    return;
};