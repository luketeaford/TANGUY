TANGUY.button = {
    touch: function () {
        'use strict';
        var config = {
            program: this.parentNode.parentNode.getAttribute('data-program'),
            update: this.parentNode.parentNode.getAttribute('data-update')
        };
        TANGUY.button.change($(this));
        return $(this).one('click', config, TANGUY.store_program);
    },
    change: function (e) {
        'use strict';
        var button = e.currentTarget === undefined ? $(e) : $(e.currentTarget),
            pos = button.attr('data-pos'),
            bg_pos;
        if (pos) {
            bg_pos = 'pos' + pos;
            button.parent().parent().removeClass().addClass(bg_pos);
        }
        return button.parent().addClass('selected').siblings().removeClass('selected');
    }
};