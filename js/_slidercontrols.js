TANGUY.slider = {
    grab: function () {
        'use strict';
        var config = {
            mode: this.getAttribute('data-mode'),//lin. or exp.
            program: this.getAttribute('data-program'),//mixer.osc1
            param: this.getAttribute('data-param')//osc1_vca
        };
        return $(this).mousemove(config, TANGUY.slider.store_program).mouseup(TANGUY.slider.release);
    },

    store_program: function (e) {
        'use strict';
        TANGUY.program.mixer[e.data.program] = e.currentTarget.value;
        console.log('Super Storing ' + e.data.program);
        return TANGUY.slider.update(e);
    },

    update: function (e) {
        'use strict';
        if (e.data.mode === 'exp') {
            return TANGUY[e.data.param].gain.setValueAtTime(e.currentTarget.value * e.currentTarget.value, TANGUY.synth.currentTime);
        }
        return TANGUY[e.data.param].gain.setValueAtTime(e.currentTarget.value, TANGUY.synth.currentTime);
    },

    release: function () {
        'use strict';
        return $(this).unbind('mousemove');
    }
};

$('#mixer').on('mousedown', 'input', TANGUY.slider.grab);
//$('#osc1').on('mousedown', 'input.vertical-slider', TANGUY.slider.grab);