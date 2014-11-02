TANGUY.gate_off = function () {
    var filter_release_peak,
        vca_release_peak = TANGUY.vca.gain.value;

    switch (TANGUY.program.filter.mode) {
    case 'lp':
        filter_release_peak = TANGUY.lp_filter1.frequency.value;
        TANGUY.lp_filter1.frequency.cancelScheduledValues(TANGUY.synth.currentTime);
        TANGUY.lp_filter2.frequency.cancelScheduledValues(TANGUY.synth.currentTime);
        TANGUY.lp_filter1.frequency.setValueAtTime(filter_release_peak, TANGUY.synth.currentTime);
        TANGUY.lp_filter2.frequency.setValueAtTime(filter_release_peak / 2, TANGUY.synth.currentTime);
        TANGUY.lp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime, TANGUY.program.filter.release);
        TANGUY.lp_filter2.frequency.setTargetAtTime(TANGUY.program.filter.frequency / 2, TANGUY.synth.currentTime, TANGUY.program.filter.release);
        break;
    case 'bp':
        filter_release_peak = TANGUY.bp_filter1.frequency.value;
        TANGUY.bp_filter1.frequency.cancelScheduledValues(TANGUY.synth.currentTime);
        TANGUY.bp_filter2.frequency.cancelScheduledValues(TANGUY.synth.currentTime);
        TANGUY.bp_filter3.frequency.cancelScheduledValues(TANGUY.synth.currentTime);
        TANGUY.bp_filter1.frequency.setValueAtTime(filter_release_peak, TANGUY.synth.currentTime);
        TANGUY.bp_filter2.frequency.setValueAtTime(filter_release_peak * 0.9, TANGUY.synth.currentTime);
        TANGUY.bp_filter3.frequency.setValueAtTime(filter_release_peak * 1.1, TANGUY.synth.currentTime);
        TANGUY.bp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime, TANGUY.program.filter.release);
        TANGUY.bp_filter2.frequency.setTargetAtTime(TANGUY.program.filter.frequency * 0.9, TANGUY.synth.currentTime, TANGUY.program.filter.release);
        TANGUY.bp_filter3.frequency.setTargetAtTime(TANGUY.program.filter.frequency * 1.1, TANGUY.synth.currentTime, TANGUY.program.filter.release);
        break;
    case 'hp':
        filter_release_peak = TANGUY.hp_filter1.frequency.value;
        TANGUY.hp_filter1.frequency.cancelScheduledValues(TANGUY.synth.currentTime);
        TANGUY.hp_filter2.frequency.cancelScheduledValues(TANGUY.synth.currentTime);
        TANGUY.hp_filter1.frequency.setValueAtTime(filter_release_peak, TANGUY.synth.currentTime);
        TANGUY.hp_filter2.frequency.setValueAtTime(filter_release_peak, TANGUY.synth.currentTime);
        TANGUY.hp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime, TANGUY.program.filter.release);
        TANGUY.hp_filter2.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime, TANGUY.program.filter.release);
        break;
    case 'notch':
        filter_release_peak = TANGUY.notch1.frequency.value;
        TANGUY.notch1.frequency.cancelScheduledValues(TANGUY.synth.currentTime);
        TANGUY.notch2.frequency.cancelScheduledValues(TANGUY.synth.currentTime);
        TANGUY.notch3.frequency.cancelScheduledValues(TANGUY.synth.currentTime);
        TANGUY.notch1.frequency.setValueAtTime(filter_release_peak, TANGUY.synth.currentTime);
        TANGUY.notch2.frequency.setValueAtTime(filter_release_peak * 0.9, TANGUY.synth.currentTime);
        TANGUY.notch3.frequency.setValueAtTime(filter_release_peak * 1.1, TANGUY.synth.currentTime);
        TANGUY.notch1.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime, TANGUY.program.filter.release);
        TANGUY.notch2.frequency.setTargetAtTime(TANGUY.program.filter.frequency * 0.9, TANGUY.synth.currentTime, TANGUY.program.filter.release);
        TANGUY.notch3.frequency.setTargetAtTime(TANGUY.program.filter.frequency * 1.1, TANGUY.synth.currentTime, TANGUY.program.filter.release);
        break;
    }

    TANGUY.vca.gain.cancelScheduledValues(TANGUY.synth.currentTime);
    TANGUY.vca.gain.setValueAtTime(vca_release_peak, TANGUY.synth.currentTime);
    TANGUY.vca.gain.setTargetAtTime(TANGUY.program.vca.gain, TANGUY.synth.currentTime, TANGUY.program.vca.release);
}