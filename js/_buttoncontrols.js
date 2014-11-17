TANGUY.button = {
    tick: function () {
        'use strict';
        var config = {
            program: this.getAttribute('data-program'),
            update: this.getAttribute('data-update')
        };
        return $(this).change(config, TANGUY.store_program);
    }
};

//TOTAL GARBAGE
$('#osc1').on('click', '#osc1-kbd', TANGUY.button.tick);
$('#osc2').on('click', '#osc2-kbd', TANGUY.button.tick);
