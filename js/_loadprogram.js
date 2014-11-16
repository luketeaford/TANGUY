TANGUY.load_program = function (patch) {
    'use strict';
    var patch_url = encodeURI('programs/') + patch + '.json',
        osc1 = [TANGUY.osc1_saw, TANGUY.osc1_sqr, TANGUY.osc1_tri, TANGUY.osc1_sin],
        delay = [TANGUY.delay1, TANGUY.delay2, TANGUY.delay3, TANGUY.delay4],
        delay_vcas = [TANGUY.delay1_vca, TANGUY.delay2_vca, TANGUY.delay3_vca, TANGUY.delay4_vca],
        i;
    $.getJSON(decodeURI(patch_url), function (loaded) {
        var osc1_kbd = $('#osc1-kbd'),
            osc2_kbd = $('#osc2-kbd'),
            x;

        TANGUY.program = loaded;
        //OSCILLATOR 1 KBD TRACKING
        if (TANGUY.program.osc1_kbd === true) {
            osc1_kbd.prop('checked', true);
        } else {
            osc1_kbd.prop('checked', false);
        }

        //OSCILLATOR 1 COARSE
        switch (TANGUY.program.osc1_coarse) {
        case 0.5:
            $('#osc1-32').parent().addClass('selected').siblings().removeClass('selected');
            break;
        case 1:
            $('#osc1-16').parent().addClass('selected').siblings().removeClass('selected');
            break;
        case 2:
            $('#osc1-8').parent().addClass('selected').siblings().removeClass('selected');
            break;
        case 4:
            $('#osc1-4').parent().addClass('selected').siblings().removeClass('selected');
            break;
        }
        for (i = 0; i < 4; i += 1) {
            osc1[i].frequency.setValueAtTime(TANGUY.osc1_master_pitch * TANGUY.program.osc1_coarse, TANGUY.synth.currentTime);
        }

        //OSCILLATOR 1 WAVEFORM MIXER
        $('#osc1-saw').val(TANGUY.program.osc1_saw);
        $('#osc1-sqr').val(TANGUY.program.osc1_sqr);
        $('#osc1-tri').val(TANGUY.program.osc1_tri);
        $('#osc1-sin').val(TANGUY.program.osc1_sin);
        $('#osc1-fm').val(TANGUY.program.osc1_fm);
        TANGUY.osc1_saw_vca.gain.setValueAtTime(TANGUY.program.osc1_saw, TANGUY.synth.currentTime);
        TANGUY.osc1_sqr_vca.gain.setValueAtTime(TANGUY.program.osc1_sqr, TANGUY.synth.currentTime);
        TANGUY.osc1_tri_vca.gain.setValueAtTime(TANGUY.program.osc1_tri, TANGUY.synth.currentTime);
        TANGUY.osc1_sin_vca.gain.setValueAtTime(TANGUY.program.osc1_sin, TANGUY.synth.currentTime);
        TANGUY.osc1_fm_vca.gain.setValueAtTime(TANGUY.program.osc1_fm * TANGUY.program.osc1_fm * 24000, TANGUY.synth.currentTime);

        //OSCILLATOR 2 KEYBOARD TRACKING
        if (TANGUY.program.osc2_kbd === true) {
            osc2_kbd.prop('checked', true);
        } else {
            osc2_kbd.prop('checked', false);
        }

        //OSCILLATOR 2 COARSE
        switch (TANGUY.program.osc2_coarse) {
        case 0.5:
            $('#osc2-32').parent().addClass('selected').siblings().removeClass('selected');
            break;
        case 1:
            $('#osc2-16').parent().addClass('selected').siblings().removeClass('selected');
            break;
        case 2:
            $('#osc2-8').parent().addClass('selected').siblings().removeClass('selected');
            break;
        case 4:
            $('#osc2-4').parent().addClass('selected').siblings().removeClass('selected');
            break;
        }
        TANGUY.osc2.frequency.setValueAtTime((TANGUY.osc2_master_pitch * TANGUY.program.osc2_coarse) + TANGUY.program.osc2_fine, TANGUY.synth.currentTime);

        //OSCILLATOR 2 WAVEFORM SELECTOR
        switch (TANGUY.program.osc2_waveform) {
        case 'sawtooth':
            $('#osc2-saw').parent().addClass('selected').siblings().removeClass('selected');
            break;
        case 'square':
            $('#osc2-sqr').parent().addClass('selected').siblings().removeClass('selected');
            break;
        case 'triangle':
            $('#osc2-tri').parent().addClass('selected').siblings().removeClass('selected');
            break;
        case 'sine':
            $('#osc2-sin').parent().addClass('selected').siblings().removeClass('selected');
            break;
        }
        TANGUY.osc2.type = TANGUY.program.osc2_waveform;

        //OSCILLATOR 2 SLIDERS
        $('#osc2-detune').val(TANGUY.program.osc2_detune);
        $('#osc2-fine').val(TANGUY.program.osc2_fine);
        $('#osc2-waveshape').val(TANGUY.program.osc2_shape);
        $('#osc2-fm').val(TANGUY.program.osc2_fm);
        TANGUY.osc2.detune.setValueAtTime(TANGUY.osc2_master_pitch + TANGUY.program.osc2_detune, TANGUY.synth.currentTime);
        TANGUY.osc2.frequency.setValueAtTime(((TANGUY.osc2_master_pitch * TANGUY.program.osc2_coarse) + TANGUY.program.osc2_fine), TANGUY.synth.currentTime);
        if (TANGUY.osc2_shape > 0) {
            x = this.value;
            TANGUY.waveshaper.curve = new Float32Array([x * 1.6, x * -2.5, x * -1.2, x * -2.4, x * -1.6, x * -3.2, x * 6.4, x * -3.2]);
        } else {
            TANGUY.waveshaper.curve = null;
        }
        TANGUY.osc2_fm_vca.gain.setValueAtTime(TANGUY.program.osc2_fm * TANGUY.program.osc2_fm * 24000, TANGUY.synth.currentTime);//parens needed?

        //NOISE
        switch (TANGUY.program.noise_color) {
        case 'white':
            $('#white-noise').parent().addClass('selected').siblings().removeClass('selected');
            TANGUY.white_noise.buffer = TANGUY.white_noise_buffer;
            TANGUY.pink_noise.buffer = TANGUY.empty_pink_noise_buffer;
            TANGUY.red_noise.buffer = TANGUY.empty_red_noise_buffer;
            TANGUY.blue_noise.buffer = TANGUY.empty_blue_noise_buffer;
            TANGUY.purple_noise.buffer = TANGUY.empty_purple_noise_buffer;
            break;
        case 'pink':
            $('#pink-noise').parent().addClass('selected').siblings().removeClass('selected');
            TANGUY.pink_noise.buffer = TANGUY.pink_noise_buffer;
            TANGUY.white_noise.buffer = TANGUY.empty_white_noise_buffer;
            TANGUY.red_noise.buffer = TANGUY.empty_red_noise_buffer;
            TANGUY.blue_noise.buffer = TANGUY.empty_blue_noise_buffer;
            TANGUY.purple_noise.buffer = TANGUY.empty_purple_noise_buffer;
            break;
        case 'red':
            $('#red-noise').parent().addClass('selected').siblings().removeClass('selected');
            TANGUY.red_noise.buffer = TANGUY.red_noise_buffer;
            TANGUY.white_noise.buffer = TANGUY.empty_white_noise_buffer;
            TANGUY.pink_noise.buffer = TANGUY.empty_pink_noise_buffer;
            TANGUY.blue_noise.buffer = TANGUY.empty_blue_noise_buffer;
            TANGUY.purple_noise.buffer = TANGUY.empty_purple_noise_buffer;
            break;
        case 'blue':
            $('#blue-noise').parent().addClass('selected').siblings().removeClass('selected');
            TANGUY.blue_noise.buffer = TANGUY.blue_noise_buffer;
            TANGUY.white_noise.buffer = TANGUY.empty_white_noise_buffer;
            TANGUY.pink_noise.buffer = TANGUY.empty_pink_noise_buffer;
            TANGUY.red_noise.buffer = TANGUY.empty_red_noise_buffer;
            TANGUY.purple_noise.buffer = TANGUY.empty_purple_noise_buffer;
            break;
        case 'purple':
            $('#purple-noise').parent().addClass('selected').siblings().removeClass('selected');
            TANGUY.purple_noise.buffer = TANGUY.purple_noise_buffer;
            TANGUY.white_noise.buffer = TANGUY.empty_white_noise_buffer;
            TANGUY.pink_noise.buffer = TANGUY.empty_pink_noise_buffer;
            TANGUY.red_noise.buffer = TANGUY.empty_red_noise_buffer;
            TANGUY.blue_noise.buffer = TANGUY.empty_blue_noise_buffer;
            break;
        }

        //MIXER CONTROLS
        $('#osc1-mix').val(TANGUY.program.osc1_mix);
        $('#osc2-mix').val(TANGUY.program.osc2_mix);
        $('#noise-mix').val(TANGUY.program.noise_mix);
        TANGUY.osc1_vca.gain.value = TANGUY.program.osc1_mix;
        TANGUY.osc2_vca.gain.value = TANGUY.program.osc2_mix;
        TANGUY.noise_vca.gain.value = TANGUY.program.noise_mix;

        //FILTER CONTROLS
//        $('#cutoff').val(Math.sqrt((TANGUY.program.filter.frequency - 20) / 22030));
        $('#cutoff').val(TANGUY.program.cutoff);
//        $('#resonance').val(Math.sqrt(TANGUY.program.filter.resonance / 1000));
        $('#resonance').val(TANGUY.program.res);
        switch (TANGUY.program.filter_mode) {
        case 'lp':
            $('#filter-lp').parent().addClass('selected').siblings().removeClass('selected');
            TANGUY.mixer.disconnect();
            TANGUY.mixer.connect(TANGUY.lp_filter1);
            TANGUY.lp_filter1.frequency.setValueAtTime(TANGUY.program.cutoff, TANGUY.synth.currentTime);
            TANGUY.lp_filter2.frequency.setValueAtTime((TANGUY.program.cutoff / 2), TANGUY.synth.currentTime);
            TANGUY.lp_filter1.Q.setValueAtTime(TANGUY.program.res / 82, TANGUY.synth.currentTime);
            TANGUY.lp_filter2.Q.setValueAtTime(TANGUY.program.res / 123, TANGUY.synth.currentTime);
            TANGUY.lfo_filter_vca.disconnect();
            TANGUY.lfo_filter_vca.connect(TANGUY.lp_filter1.frequency);
            TANGUY.lfo_filter_vca.connect(TANGUY.lp_filter2.frequency);
            break;
        case 'bp':
            $('#filter-bp').parent().addClass('selected').siblings().removeClass('selected');
            TANGUY.mixer.disconnect();
            TANGUY.mixer.connect(TANGUY.bp_filter1);
            TANGUY.bp_filter1.frequency.setValueAtTime(TANGUY.program.cutoffcutoff, TANGUY.synth.currentTime);
            TANGUY.bp_filter2.frequency.setValueAtTime(TANGUY.program.cutoff * 0.9, TANGUY.synth.currentTime);
            TANGUY.bp_filter3.frequency.setValueAtTime(TANGUY.program.cutoff * 1.1, TANGUY.synth.currentTime);
            TANGUY.bp_filter2.gain.setValueAtTime(TANGUY.program.res / 82, TANGUY.synth.currentTime);
            TANGUY.bp_filter3.gain.setValueAtTime(TANGUY.program.res / 82, TANGUY.synth.currentTime);
            TANGUY.lfo_filter_vca.disconnect();
            TANGUY.lfo_filter_vca.connect(TANGUY.bp_filter1.frequency);
            TANGUY.lfo_filter_vca.connect(TANGUY.bp_filter2.frequency);
            TANGUY.lfo_filter_vca.connect(TANGUY.bp_filter3.frequency);
            break;
        case 'hp':
            $('#filter-hp').parent().addClass('selected').siblings().removeClass('selected');
            TANGUY.mixer.disconnect();
            TANGUY.mixer.connect(TANGUY.hp_filter1);
            TANGUY.hp_filter1.frequency.setValueAtTime(TANGUY.program.cutoff, TANGUY.synth.currentTime);
            TANGUY.hp_filter2.frequency.setValueAtTime(TANGUY.program.cutoff, TANGUY.synth.currentTime);
            TANGUY.hp_filter1.Q.setValueAtTime(TANGUY.program.res / 82, TANGUY.synth.currentTime);
            TANGUY.hp_filter2.Q.setValueAtTime(TANGUY.program.res / 123, TANGUY.synth.currentTime);
            TANGUY.lfo_filter_vca.disconnect();
            TANGUY.lfo_filter_vca.connect(TANGUY.hp_filter1.frequency);
            TANGUY.lfo_filter_vca.connect(TANGUY.hp_filter2.frequency);
            break;
        case 'notch':
            $('#filter-notch').parent().addClass('selected').siblings().removeClass('selected');
            TANGUY.mixer.disconnect();
            TANGUY.mixer.connect(TANGUY.notch1);
            TANGUY.notch1.frequency.setValueAtTime(TANGUY.program.cutoff, TANGUY.synth.currentTime);
            TANGUY.notch2.frequency.setValueAtTime(TANGUY.program.cutoff * 0.9, TANGUY.synth.currentTime);
            TANGUY.notch3.frequency.setValueAtTime(TANGUY.program.cutoff * 1.1, TANGUY.synth.currentTime);
            TANGUY.notch2.gain.setValueAtTime(TANGUY.program.res / -21, TANGUY.synth.currentTime, 0.01);
            TANGUY.notch3.gain.setValueAtTime(TANGUY.program.res / -21, TANGUY.synth.currentTime, 0.01);
            TANGUY.lfo_filter_vca.disconnect();
            TANGUY.lfo_filter_vca.connect(TANGUY.notch1.frequency);
            TANGUY.lfo_filter_vca.connect(TANGUY.notch2.frequency);
            TANGUY.lfo_filter_vca.connect(TANGUY.notch3.frequency);
            break;
        case 'off':
            $('#filter-off').parent().addClass('selected').siblings().removeClass('selected');
            TANGUY.mixer.disconnect();
            TANGUY.mixer.connect(TANGUY.vca);
            TANGUY.lfo_filter_vca.disconnect();
            break;
        }
        $('#filter-envelope-amount').val(TANGUY.program.filter_eg_amt);
        $('#filter-keyboard-tracking').val(TANGUY.program.filter_kbd);
        $('#filter-attack').val(TANGUY.program.filter_attack);
        $('#filter-decay').val(TANGUY.program.filter_decay);
        $('#filter-sustain').val(TANGUY.program.filter_sustain);
        $('#filter-release').val(TANGUY.program.filter_release);

        //VCA ENVELOPE
        $('#vca-attack').val(TANGUY.program.vca_attack);
        $('#vca-decay').val(TANGUY.program.vca_decay);
        $('#vca-sustain').val(TANGUY.program.vca_sustain);
        $('#vca-release').val(TANGUY.program.vca_release);
//        $('#vca-gain').val(Math.sqrt(TANGUY.program.vca.gain));
        $('#vca-gain').val(TANGUY.program.vca_gain);
        TANGUY.vca.gain.setValueAtTime(TANGUY.program.vca_gain, TANGUY.synth.currentTime);

        //LFO SHAPE
        switch (TANGUY.program.lfo_shape) {
        case 'sine':
            $('#lfo-sin').parent().addClass('selected').siblings().removeClass('selected');
            TANGUY.program.mod_direction = 1;
            TANGUY.lfo.type = 'sine';
            break;
        case 'triangle':
            $('#lfo-tri').parent().addClass('selected').siblings().removeClass('selected');
            TANGUY.program.mod_direction = 1;
            TANGUY.lfo.type = 'triangle';
            break;
        case 'ramp':
            $('#lfo-rmp').parent().addClass('selected').siblings().removeClass('selected');
            TANGUY.program.mod_direction = 1;
            TANGUY.lfo.type = 'sawtooth';
            TANGUY.calculate_lfo();
            break;
        case 'sawtooth':
            $('#lfo-saw').parent().addClass('selected').siblings().removeClass('selected');
            TANGUY.program.mod_direction = -1;
            TANGUY.lfo.type = 'sawtooth';
            TANGUY.calculate_lfo();
            break;
        case 'square':
            $('#lfo-sqr').parent().addClass('selected').siblings().removeClass('selected');
            TANGUY.program.mod_direction = 1;
            TANGUY.lfo.type = 'square';
            break;
        }

        //DELAY CONTROLS
        $('#delay-rate').val(TANGUY.program.delay_rate);
        $('#delay-amount').val(TANGUY.program.delay_amt);
        for (i = 0; i < 4; i += 1) {
            delay[i].delayTime.value = TANGUY.program.delay_rate;
        }
        for (i = 0; i < 4; i += 1) {
            delay_vcas[i].gain.value = TANGUY.program.delay_amt;
        }

        //MODWHEEL CONTROL
        $('#mod-amount').val(TANGUY.program.mod_amt);
        TANGUY.calculate_lfo();

        //LFO RATE
//        $('#lfo-rate').val(Math.sqrt(TANGUY.program.lfo.rate / 100));
        $('#lfo-rate').val(TANGUY.program.lfo_rate);
        TANGUY.lfo.frequency.value = TANGUY.program.lfo_rate;

        //LFO DESTINATIONS
        $('#lfo-pitch').val(TANGUY.program.lfo_pitch);
        $('#lfo-filter').val(TANGUY.program.lfo_filter);
        $('#lfo-amp').val(TANGUY.program.lfo_amp);
        TANGUY.calculate_lfo();

        //PORTAMENTO CONTROLS
        $('#portamento-amount').val(TANGUY.program.portamento_amt);
        switch (TANGUY.program.portamento_mode) {
        case 'off':
            $('#portamento-off').parent().addClass('selected').siblings().removeClass('selected');
            break;
        case 'linear':
            $('#portamento-linear').parent().addClass('selected').siblings().removeClass('selected');
            break;
        case 'exponential':
            $('#portamento-exponential').parent().addClass('selected').siblings().removeClass('selected');
            break;
        }
    });
};

//LOAD PROGRAM CONTROLS
$('#program-selector').change(function () {
    'use strict';
    TANGUY.load_program(this.value);
    $(this).blur();
});