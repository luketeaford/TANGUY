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
            bg_pos;
        switch (button.val()) {
        case '0.5':
            console.log('I knew it!');
            bg_pos = 'pos1';
            break;
        case '1':
            console.log('Sweet');
            bg_pos = 'pos2';
            break;
        case '2':
            console.log('Two to tango');
            bg_pos = 'pos3';
            break;
        case '4':
            console.log('Eyes');
            bg_pos = 'pos4';
            break;
        default:
            console.log('DANGER! NOTHING!');
            break;
        }
        button.parent().parent().removeClass().addClass(bg_pos);//remove all classes then add the proper one
        return button.parent().addClass('selected').siblings().removeClass('selected');
    }
};

//SLOPPY BINDINGS
$('#osc1-kbd').on('change', 'input', TANGUY.button.touch);
$('#osc1-coarse').on('change', 'input', TANGUY.button.touch);
$('#osc2-kbd').on('change', 'input', TANGUY.button.touch);
$('#osc2-coarse').on('change', 'input', TANGUY.button.touch);
$('#osc2-waveform').on('change', 'input', TANGUY.button.touch);
$('#noise-color').on('change', 'input', TANGUY.button.touch);
$('#filter-mode').on('change', 'input', TANGUY.button.touch);
$('#lfo-shape').on('change', 'input', TANGUY.button.touch);
$('#portamento-mode').on('change', 'input', TANGUY.button.touch);