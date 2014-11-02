//FILTER CONTROLS
$('#filter-lp, #filter-bp, #filter-hp, #filter-notch, #filter-off').change(function () {
    TANGUY.program.filter.mode = this.value;
    switch (this.value) {
    case 'lp':
        TANGUY.mixer.disconnect();
        TANGUY.mixer.connect(TANGUY.lp_filter1);
        TANGUY.lfo_filter_vca.disconnect();
        TANGUY.lfo_filter_vca.connect(TANGUY.lp_filter1.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.lp_filter2.frequency);
        break;
    case 'bp':
        TANGUY.mixer.disconnect();
        TANGUY.mixer.connect(TANGUY.bp_filter1);
        TANGUY.lfo_filter_vca.disconnect();
        TANGUY.lfo_filter_vca.connect(TANGUY.bp_filter1.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.bp_filter2.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.bp_filter3.frequency);
        break;
    case 'hp':
        TANGUY.mixer.disconnect();
        TANGUY.mixer.connect(TANGUY.hp_filter1);
        TANGUY.lfo_filter_vca.disconnect();
        TANGUY.lfo_filter_vca.connect(TANGUY.hp_filter1.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.hp_filter2.frequency);
        break;
    case 'notch':
        TANGUY.mixer.disconnect();
        TANGUY.mixer.connect(TANGUY.notch1);
        TANGUY.lfo_filter_vca.disconnect();
        TANGUY.lfo_filter_vca.connect(TANGUY.notch1.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.notch2.frequency);
        TANGUY.lfo_filter_vca.connect(TANGUY.notch3.frequency);
        break;
    case 'off':
        TANGUY.mixer.disconnect();
        TANGUY.mixer.connect(TANGUY.vca);
        TANGUY.lfo_filter_vca.disconnect();
        break;
    }
});
$('#cutoff').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.filter.frequency = ((this.value * this.value) * 22030) + 20;
        switch (TANGUY.program.filter.mode) {
        case 'lp':
            TANGUY.lp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime, 0.08);
            TANGUY.lp_filter2.frequency.setTargetAtTime((TANGUY.program.filter.frequency / 2), TANGUY.synth.currentTime, 0.08);
            break;
        case 'bp':
            TANGUY.bp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime, 0.08);
            TANGUY.bp_filter2.frequency.setTargetAtTime(TANGUY.program.filter.frequency * 0.9, TANGUY.synth.currentTime, 0.08);
            TANGUY.bp_filter3.frequency.setTargetAtTime(TANGUY.program.filter.frequency * 1.1, TANGUY.synth.currentTime, 0.08);
            break;
        case 'hp':
            TANGUY.hp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime, 0.08);
            TANGUY.hp_filter2.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime, 0.08);
            break;
        case 'notch':
            TANGUY.notch1.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime, 0.08);
            TANGUY.notch2.frequency.setTargetAtTime(TANGUY.program.filter.frequency * 0.9, TANGUY.synth.currentTime, 0.08);
            TANGUY.notch3.frequency.setTargetAtTime(TANGUY.program.filter.frequency * 1.1, TANGUY.synth.currentTime, 0.08);
            break;
        }
    });
}).mouseup(TANGUY.stop_tweaking);
$('#resonance').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.filter.resonance = (this.value * this.value) * 1000;
        switch (TANGUY.program.filter.mode) {
        case 'lp':
            TANGUY.lp_filter1.Q.setTargetAtTime(TANGUY.program.filter.resonance / 82, TANGUY.synth.currentTime, 0.01);
            TANGUY.lp_filter2.Q.setTargetAtTime(TANGUY.program.filter.resonance / 123, TANGUY.synth.currentTime, 0.01);
            break;
        case 'bp':
            TANGUY.bp_filter2.gain.setTargetAtTime(TANGUY.program.filter.resonance / 82, TANGUY.synth.currentTime, 0.01);
            TANGUY.bp_filter3.gain.setTargetAtTime(TANGUY.program.filter.resonance / 82, TANGUY.synth.currentTime, 0.01);
            break;
        case 'hp':
            TANGUY.hp_filter1.Q.setTargetAtTime(TANGUY.program.filter.resonance / 82, TANGUY.synth.currentTime, 0.01);
            TANGUY.hp_filter2.Q.setTargetAtTime(TANGUY.program.filter.resonance / 123, TANGUY.synth.currentTime, 0.01);
            break;
        case 'notch':
            TANGUY.notch2.gain.setTargetAtTime(TANGUY.program.filter.resonance / -21, TANGUY.synth.currentTime, 0.01);
            TANGUY.notch3.gain.setTargetAtTime(TANGUY.program.filter.resonance / -21, TANGUY.synth.currentTime, 0.01);
            break;
        }
    });
}).mouseup(TANGUY.stop_tweaking);
$('#filter-envelope-amount').change(function () {
    TANGUY.program.filter.env_amt = parseFloat(this.value);
});
$('#filter-keyboard-tracking').change(function () {
    TANGUY.program.filter.kbd = this.value;
});
$('#filter-attack').change(function () {
    TANGUY.program.filter.attack = parseFloat(this.value);
});
$('#filter-decay').change(function () {
    TANGUY.program.filter.decay = this.value;
});
$('#filter-sustain').change(function () {
    TANGUY.program.filter.sustain = this.value;
});
$('#filter-release').change(function () {
    TANGUY.program.filter.release = this.value;
});