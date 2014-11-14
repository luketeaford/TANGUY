//FILTER CONTROLS
$('#filter-mode').on('change', 'input', function () {
    'use strict';
    TANGUY.mixer.disconnect();
    TANGUY.lfo_filter_vca.disconnect();
    TANGUY.program.filter.mode = this.value;
    switch (this.value) {
    case 'lp':
        TANGUY.mixer.connect(TANGUY.lp_filter1);
        TANGUY.lfo_filter_vca.connect(TANGUY.lp_filter1.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.lp_filter2.frequency);
        break;
    case 'bp':
        TANGUY.mixer.connect(TANGUY.bp_filter1);
        TANGUY.lfo_filter_vca.connect(TANGUY.bp_filter1.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.bp_filter2.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.bp_filter3.frequency);
        break;
    case 'hp':
        TANGUY.mixer.connect(TANGUY.hp_filter1);
        TANGUY.lfo_filter_vca.connect(TANGUY.hp_filter1.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.hp_filter2.frequency);
        break;
    case 'notch':
        TANGUY.mixer.connect(TANGUY.notch1);
        TANGUY.lfo_filter_vca.connect(TANGUY.notch1.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.notch2.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.notch3.frequency);
        break;
    case 'off':
        TANGUY.mixer.connect(TANGUY.vca);
        break;
    }
});

//BAD DESIGN QUICK FIX
$('#filter').on('change', '#filter-envelope-amount, #filter-keyboard-tracking', $(this), function (e) {
    'use strict';
    var param = e.currentTarget.getAttribute('data-param');
    TANGUY.program.filter[param] = parseFloat(e.currentTarget.value);
});
