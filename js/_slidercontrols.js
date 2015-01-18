TANGUY.slider = {
    grab: function () {
        'use strict';
        var config = {
            program: this.getAttribute('data-program'),
            update: this.getAttribute('data-update')
        };
        return $(this).on('mousemove touchmove', config, TANGUY.store_program)
                      .on('mouseup touchend', TANGUY.slider.release);
    },

    release: function () {
        'use strict';
        return $(this).unbind('mousemove touchmove');
    }
};
