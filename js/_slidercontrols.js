TANGUY.slider = {
    grab: function () {
        'use strict';
        var config = {
            program: this.getAttribute('data-program'),
            update: this.getAttribute('data-update')
        };
        return $(this).mousemove(config, TANGUY.store_program).mouseup(TANGUY.slider.release);
    },

    release: function () {
        'use strict';
        return $(this).unbind('mousemove');
    }
};