TANGUY.load_program = function (patch) {
    var patch_url = encodeURI('programs/') + patch + '.json',
        osc1 = [TANGUY.osc1_saw, TANGUY.osc1_sqr, TANGUY.osc1_tri, TANGUY.osc1_sin],
        delay = [TANGUY.delay1, TANGUY.delay2, TANGUY.delay3, TANGUY.delay4],
        delay_vcas = [TANGUY.delay1_vca, TANGUY.delay2_vca, TANGUY.delay3_vca, TANGUY.delay4_vca],
        i;
    $.getJSON(decodeURI(patch_url), function (loaded) {
        TANGUY.program = loaded;
        //OSCILLATOR 1 KBD TRACKING
        if (TANGUY.program.osc1.kbd === true) {
            $('#osc1-kbd').prop('checked', true);
        } else {
            $('#osc1-kbd').prop('checked', false);
        }

        //OSCILLATOR 1 COARSE
        switch (TANGUY.program.osc1.coarse) {
        case 0.5:
            $('#osc1-32').parent().addClass('selected');
            $('#osc1-32').parent().siblings().removeClass('selected');
            break;
        case 1:
            $('#osc1-16').parent().addClass('selected');
            $('#osc1-16').parent().siblings().removeClass('selected');
            break;
        case 2:
            $('#osc1-8').parent().addClass('selected');
            $('#osc1-8').parent().siblings().removeClass('selected');
            break;
        case 4:
            $('#osc1-4').parent().addClass('selected');
            $('#osc1-4').parent().siblings().removeClass('selected');
            break;
        }
        for (i = 0; i < osc1.length; i += 1) {
            osc1[i].frequency.setValueAtTime(TANGUY.osc1_master_pitch * TANGUY.program.osc1.coarse, TANGUY.synth.currentTime);
        }

        //OSCILLATOR 1 WAVEFORM MIXER
        $('#osc1-saw').val(TANGUY.program.osc1.saw_amt);
        $('#osc1-sqr').val(TANGUY.program.osc1.sqr_amt);
        $('#osc1-tri').val(TANGUY.program.osc1.tri_amt);
        $('#osc1-sin').val(TANGUY.program.osc1.sin_amt);
        $('#osc1-fm').val(TANGUY.program.osc1.fm_amt);
        TANGUY.osc1_saw_vca.gain.setValueAtTime(TANGUY.program.osc1.saw_amt, TANGUY.synth.currentTime);
        TANGUY.osc1_sqr_vca.gain.setValueAtTime(TANGUY.program.osc1.sqr_amt, TANGUY.synth.currentTime);
        TANGUY.osc1_tri_vca.gain.setValueAtTime(TANGUY.program.osc1.tri_amt, TANGUY.synth.currentTime);
        TANGUY.osc1_sin_vca.gain.setValueAtTime(TANGUY.program.osc1.sin_amt, TANGUY.synth.currentTime);
        TANGUY.osc1_fm_vca.gain.setValueAtTime(TANGUY.program.osc1.fm_amt * TANGUY.program.osc1.fm_amt * 24000, TANGUY.synth.currentTime);//parens needed?

        //OSCILLATOR 2 KEYBOARD TRACKING
        if (TANGUY.program.osc2.kbd === true) {
            $('#osc2-kbd').prop('checked', true);
        } else {
            $('#osc2-kbd').prop('checked', false);
        }

        //OSCILLATOR 2 COARSE
        switch (TANGUY.program.osc2.coarse) {
        case 0.5:
            $('#osc2-32').parent().addClass('selected');
            $('#osc2-32').parent().siblings().removeClass('selected');
            break;
        case 1:
            $('#osc2-16').parent().addClass('selected');
            $('#osc2-16').parent().siblings().removeClass('selected');
            break;
        case 2:
            $('#osc2-8').parent().addClass('selected');
            $('#osc2-8').parent().siblings().removeClass('selected');
            break;
        case 4:
            $('#osc2-4').parent().addClass('selected');
            $('#osc2-4').parent().siblings().removeClass('selected');
            break;
        }
        TANGUY.osc2.frequency.setValueAtTime((TANGUY.osc2_master_pitch * TANGUY.program.osc2.coarse) + TANGUY.program.osc2.fine, TANGUY.synth.currentTime);

        //OSCILLATOR 2 WAVEFORM SELECTOR
        switch (TANGUY.program.osc2.waveform) {
        case 'sawtooth':
            $('#osc2-saw').parent().addClass('selected');
            $('#osc2-saw').parent().siblings().removeClass('selected');
            break;
        case 'square':
            $('#osc2-sqr').parent().addClass('selected');
            $('#osc2-sqr').parent().siblings().removeClass('selected');
            break;
        case 'triangle':
            $('#osc2-tri').parent().addClass('selected');
            $('#osc2-tri').parent().siblings().removeClass('selected');
            break;
        case 'sine':
            $('#osc2-sin').parent().addClass('selected');
            $('#osc2-sin').parent().siblings().removeClass('selected');
            break;
        }
        TANGUY.osc2.type = TANGUY.program.osc2.waveform;

        //OSCILLATOR 2 SLIDERS
        $('#osc2-detune').val(TANGUY.program.osc2.detune);
        $('#osc2-fine').val(TANGUY.program.osc2.fine);
        $('#osc2-waveshape').val(TANGUY.program.osc2.shape_amt);
        $('#osc2-fm').val(TANGUY.program.osc2.fm_amt);
        TANGUY.osc2.detune.setValueAtTime(TANGUY.osc2_master_pitch + TANGUY.program.osc2.detune, TANGUY.synth.currentTime);
        TANGUY.osc2.frequency.setValueAtTime(((TANGUY.osc2_master_pitch * TANGUY.program.osc2.coarse) + TANGUY.program.osc2.fine), TANGUY.synth.currentTime);
        if (TANGUY.osc2.shape_amt > 0) {
            var x = this.value;
            TANGUY.waveshaper.curve = new Float32Array([x * 1.6, x * -2.5, x * -1.2, x * -2.4, x * -1.6, x * -3.2, x * 6.4, x * -3.2]);
        } else {
            TANGUY.waveshaper.curve = null;
        }
        TANGUY.osc2_fm_vca.gain.setValueAtTime(TANGUY.program.osc2.fm_amt * TANGUY.program.osc2.fm_amt * 24000, TANGUY.synth.currentTime);//parens needed?

        //NOISE
        switch (TANGUY.program.noise.color) {
        case 'white':
            $('#white-noise').parent().addClass('selected');
            $('#white-noise').parent().siblings().removeClass('selected');
            TANGUY.white_noise.buffer = TANGUY.white_noise_buffer;
            TANGUY.pink_noise.buffer = TANGUY.empty_pink_noise_buffer;
            TANGUY.red_noise.buffer = TANGUY.empty_red_noise_buffer;
            TANGUY.blue_noise.buffer = TANGUY.empty_blue_noise_buffer;
            TANGUY.purple_noise.buffer = TANGUY.empty_purple_noise_buffer;
            break;
        case 'pink':
            $('#pink-noise').parent().addClass('selected');
            $('#pink-noise').parent().siblings().removeClass('selected');
            TANGUY.pink_noise.buffer = TANGUY.pink_noise_buffer;
            TANGUY.white_noise.buffer = TANGUY.empty_white_noise_buffer;
            TANGUY.red_noise.buffer = TANGUY.empty_red_noise_buffer;
            TANGUY.blue_noise.buffer = TANGUY.empty_blue_noise_buffer;
            TANGUY.purple_noise.buffer = TANGUY.empty_purple_noise_buffer;
            break;
        case 'red':
            $('#red-noise').parent().addClass('selected');
            $('#red-noise').parent().siblings().removeClass('selected');
            TANGUY.red_noise.buffer = TANGUY.red_noise_buffer;
            TANGUY.white_noise.buffer = TANGUY.empty_white_noise_buffer;
            TANGUY.pink_noise.buffer = TANGUY.empty_pink_noise_buffer;
            TANGUY.blue_noise.buffer = TANGUY.empty_blue_noise_buffer;
            TANGUY.purple_noise.buffer = TANGUY.empty_purple_noise_buffer;
            break;
        case 'blue':
            $('#blue-noise').parent().addClass('selected');
            $('#blue-noise').parent().siblings().removeClass('selected');
            TANGUY.blue_noise.buffer = TANGUY.blue_noise_buffer;
            TANGUY.white_noise.buffer = TANGUY.empty_white_noise_buffer;
            TANGUY.pink_noise.buffer = TANGUY.empty_pink_noise_buffer;
            TANGUY.red_noise.buffer = TANGUY.empty_red_noise_buffer;
            TANGUY.purple_noise.buffer = TANGUY.empty_purple_noise_buffer;
            break;
        case 'purple':
            $('#purple-noise').parent().addClass('selected');
            $('#purple-noise').parent().siblings().removeClass('selected');
            TANGUY.purple_noise.buffer = TANGUY.purple_noise_buffer;
            TANGUY.white_noise.buffer = TANGUY.empty_white_noise_buffer;
            TANGUY.pink_noise.buffer = TANGUY.empty_pink_noise_buffer;
            TANGUY.red_noise.buffer = TANGUY.empty_red_noise_buffer;
            TANGUY.blue_noise.buffer = TANGUY.empty_blue_noise_buffer;
            break;
        }

        //MIXER CONTROLS
        $('#osc1-mix').val(TANGUY.program.mixer.osc1);
        $('#osc2-mix').val(TANGUY.program.mixer.osc2);
        $('#noise-mix').val(TANGUY.program.mixer.noise);
        TANGUY.osc1_vca.gain.value = TANGUY.program.mixer.osc1;
        TANGUY.osc2_vca.gain.value = TANGUY.program.mixer.osc2;
        TANGUY.noise_vca.gain.value = TANGUY.program.mixer.noise;

        //FILTER CONTROLS
        $('#cutoff').val(Math.sqrt((TANGUY.program.filter.frequency - 20) / 22030));
        $('#resonance').val(Math.sqrt(TANGUY.program.filter.resonance / 1000));
        switch (TANGUY.program.filter.mode) {
        case 'lp':
            $('#filter-lp').parent().addClass('selected');
            $('#filter-lp').parent().siblings().removeClass('selected');
            TANGUY.mixer.disconnect();
            TANGUY.mixer.connect(TANGUY.lp_filter1);
            TANGUY.lp_filter1.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime);
            TANGUY.lp_filter2.frequency.setValueAtTime((TANGUY.program.filter.frequency / 2), TANGUY.synth.currentTime);
            TANGUY.lp_filter1.Q.setValueAtTime(TANGUY.program.filter.resonance / 82, TANGUY.synth.currentTime);
            TANGUY.lp_filter2.Q.setValueAtTime(TANGUY.program.filter.resonance / 123, TANGUY.synth.currentTime);
            TANGUY.lfo_filter_vca.disconnect();
            TANGUY.lfo_filter_vca.connect(TANGUY.lp_filter1.frequency);
            TANGUY.lfo_filter_vca.connect(TANGUY.lp_filter2.frequency);
            break;
        case 'bp':
            $('#filter-bp').parent().addClass('selected');
            $('#filter-bp').parent().siblings().removeClass('selected');
            TANGUY.mixer.disconnect();
            TANGUY.mixer.connect(TANGUY.bp_filter1);
            TANGUY.bp_filter1.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime);
            TANGUY.bp_filter2.frequency.setValueAtTime(TANGUY.program.filter.frequency * 0.9, TANGUY.synth.currentTime);
            TANGUY.bp_filter3.frequency.setValueAtTime(TANGUY.program.filter.frequency * 1.1, TANGUY.synth.currentTime);
            TANGUY.bp_filter2.gain.setValueAtTime(TANGUY.program.filter.resonance / 82, TANGUY.synth.currentTime);
            TANGUY.bp_filter3.gain.setValueAtTime(TANGUY.program.filter.resonance / 82, TANGUY.synth.currentTime);
            TANGUY.lfo_filter_vca.disconnect();
            TANGUY.lfo_filter_vca.connect(TANGUY.bp_filter1.frequency);
            TANGUY.lfo_filter_vca.connect(TANGUY.bp_filter2.frequency);
            TANGUY.lfo_filter_vca.connect(TANGUY.bp_filter3.frequency);
            break;
        case 'hp':
            $('#filter-hp').parent().addClass('selected');
            $('#filter-hp').parent().siblings().removeClass('selected');
            TANGUY.mixer.disconnect();
            TANGUY.mixer.connect(TANGUY.hp_filter1);
            TANGUY.hp_filter1.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime);
            TANGUY.hp_filter2.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime);
            TANGUY.hp_filter1.Q.setValueAtTime(TANGUY.program.filter.resonance / 82, TANGUY.synth.currentTime);
            TANGUY.hp_filter2.Q.setValueAtTime(TANGUY.program.filter.resonance / 123, TANGUY.synth.currentTime);
            TANGUY.lfo_filter_vca.disconnect();
            TANGUY.lfo_filter_vca.connect(TANGUY.hp_filter1.frequency);
            TANGUY.lfo_filter_vca.connect(TANGUY.hp_filter2.frequency);
            break;
        case 'notch':
            $('#notch').parent().addClass('selected');
            $('#notch').parent().siblings().removeClass('selected');
            TANGUY.mixer.disconnect();
            TANGUY.mixer.connect(TANGUY.notch1);
            TANGUY.notch1.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.synth.currentTime);
            TANGUY.notch2.frequency.setValueAtTime(TANGUY.program.filter.frequency * 0.9, TANGUY.synth.currentTime);
            TANGUY.notch3.frequency.setValueAtTime(TANGUY.program.filter.frequency * 1.1, TANGUY.synth.currentTime);
            TANGUY.notch2.gain.setValueAtTime(TANGUY.program.filter.resonance / -21, TANGUY.synth.currentTime, 0.01);
            TANGUY.notch3.gain.setValueAtTime(TANGUY.program.filter.resonance / -21, TANGUY.synth.currentTime, 0.01);
            TANGUY.lfo_filter_vca.disconnect();
            TANGUY.lfo_filter_vca.connect(TANGUY.notch1.frequency);
            TANGUY.lfo_filter_vca.connect(TANGUY.notch2.frequency);
            TANGUY.lfo_filter_vca.connect(TANGUY.notch3.frequency);
            break;
        case 'off':
            $('#filter-off').parent().addClass('selected');
            $('#filter-off').parent().siblings().removeClass('selected');
            TANGUY.mixer.disconnect();
            TANGUY.mixer.connect(TANGUY.vca);
            TANGUY.lfo_filter_vca.disconnect();
            break;
        }
        $('#filter-envelope-amount').val(TANGUY.program.filter.env_amt);
        $('#filter-keyboard-tracking').val(TANGUY.program.filter.kbd);
        $('#filter-attack').val(TANGUY.program.filter.attack);
        $('#filter-decay').val(TANGUY.program.filter.decay);
        $('#filter-sustain').val(TANGUY.program.filter.sustain);
        $('#filter-release').val(TANGUY.program.filter.release);

        //VCA ENVELOPE
        $('#vca-attack').val(TANGUY.program.vca.attack);
        $('#vca-decay').val(TANGUY.program.vca.decay);
        $('#vca-sustain').val(TANGUY.program.vca.sustain);
        $('#vca-release').val(TANGUY.program.vca.release);
        $('#vca-gain').val(Math.sqrt(TANGUY.program.vca.gain));
        TANGUY.vca.gain.setValueAtTime(TANGUY.program.vca.gain, TANGUY.synth.currentTime);

        //LFO SHAPE
        switch (TANGUY.program.lfo.shape) {
        case 'sine':
            $('#lfo-sin').parent().addClass('selected');
            $('#lfo-sin').parent().siblings().removeClass('selected');
            TANGUY.program.mod.direction = 1;
            TANGUY.lfo.type = 'sine';
            break;
        case 'triangle':
            $('#lfo-tri').parent().addClass('selected');
            $('#lfo-tri').parent().siblings().removeClass('selected');
            TANGUY.program.mod.direction = 1;
            TANGUY.lfo.type = 'triangle';
            break;
        case 'ramp':
            $('#lfo-rmp').parent().addClass('selected');
            $('#lfo-rmp').parent().siblings().removeClass('selected');
            TANGUY.program.mod.direction = 1;
            TANGUY.lfo.type = 'sawtooth';
            TANGUY.calculate_lfo();
            break;
        case 'sawtooth':
            $('#lfo-saw').parent().addClass('selected');
            $('#lfo-saw').parent().siblings().removeClass('selected');
            TANGUY.program.mod.direction = -1;
            TANGUY.lfo.type = 'sawtooth';
            TANGUY.calculate_lfo();
            break;
        case 'square':
            $('#lfo-sqr').parent().addClass('selected');
            $('#lfo-sqr').parent().siblings().removeClass('selected');
            TANGUY.program.mod.direction = 1;
            TANGUY.lfo.type = 'square';
            break;
        }

        //DELAY CONTROLS
        $('#delay-rate').val(TANGUY.program.delay.rate);
        $('#delay-amount').val(TANGUY.program.delay.amt);
        for (i = 0; i < delay.length; i += 1) {
            delay[i].delayTime.value = TANGUY.program.delay.rate;
        }
        for (i = 0; i < delay_vcas.length; i += 1) {
            delay_vcas[i].gain.value = TANGUY.program.delay.amt;
        }

        //MODWHEEL CONTROL
        $('#mod-amount').val(TANGUY.program.mod.amt);
        TANGUY.calculate_lfo();

        //LFO RATE
        $('#lfo-rate').val(Math.sqrt(TANGUY.program.lfo.rate / 100));
        TANGUY.lfo.frequency.value = TANGUY.program.lfo.rate;

        //LFO DESTINATIONS
        $('#lfo-pitch').val(TANGUY.program.lfo.pitch_amt);
        $('#lfo-filter').val(TANGUY.program.lfo.filter_amt);
        $('#lfo-amp').val(TANGUY.program.lfo.amp_amt);
        TANGUY.calculate_lfo();

        //PORTAMENTO CONTROLS
        $('#portamento-amount').val(TANGUY.program.portamento.amt);
        switch (TANGUY.program.portamento.mode) {
        case 'off':
            $('#portamento-off').parent().addClass('selected');
            $('#portamento-off').parent().siblings().removeClass('selected');
            break;
        case 'linear':
            $('#portamento-linear').parent().addClass('selected');
            $('#portamento-linear').parent().siblings().removeClass('selected');
            break;
        case 'exponential':
            $('#portamento-exponential').parent().addClass('selected');
            $('#portamento-exponential').parent().siblings().removeClass('selected');
            break;
        }

    });
}