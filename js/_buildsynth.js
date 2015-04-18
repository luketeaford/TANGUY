TANGUY.build_synth = function () {
    'use strict';
    var white_noise_data,
        pink_noise_data,
        red_noise_data,
        blue_noise_data,
        purple_noise_data,
        pink_noise_repeat,
        red_noise_repeat,
        blue_noise_repeat,
        purple_noise_repeat,
        i,
        j;

    //DELAY
    TANGUY.delay1_vca = TANGUY.synth.createGain();
    TANGUY.delay2_vca = TANGUY.synth.createGain();
    TANGUY.delay3_vca = TANGUY.synth.createGain();
    TANGUY.delay4_vca = TANGUY.synth.createGain();
    TANGUY.delay1_vca.gain.value = 0;
    TANGUY.delay2_vca.gain.value = 0;
    TANGUY.delay3_vca.gain.value = 0;
    TANGUY.delay4_vca.gain.value = 0;
    TANGUY.delay1_vca.connect(TANGUY.synth.destination);
    TANGUY.delay2_vca.connect(TANGUY.synth.destination);
    TANGUY.delay3_vca.connect(TANGUY.synth.destination);
    TANGUY.delay4_vca.connect(TANGUY.synth.destination);
    TANGUY.delay1 = TANGUY.synth.createDelay(2);
    TANGUY.delay2 = TANGUY.synth.createDelay(2);
    TANGUY.delay3 = TANGUY.synth.createDelay(2);
    TANGUY.delay4 = TANGUY.synth.createDelay(2);
    TANGUY.delay1.connect(TANGUY.delay1_vca);
    TANGUY.delay2.connect(TANGUY.delay2_vca);
    TANGUY.delay3.connect(TANGUY.delay3_vca);
    TANGUY.delay4.connect(TANGUY.delay4_vca);
    TANGUY.delay1_vca.connect(TANGUY.delay2);
    TANGUY.delay2_vca.connect(TANGUY.delay3);
    TANGUY.delay3_vca.connect(TANGUY.delay4);

    //VCA
    TANGUY.vca = TANGUY.synth.createGain();
    TANGUY.vca.gain.value = 0;
    TANGUY.vca.connect(TANGUY.delay1);
    TANGUY.vca.connect(TANGUY.synth.destination);

    //LP FILTER
    TANGUY.lp_filter1 = TANGUY.synth.createBiquadFilter();
    TANGUY.lp_filter2 = TANGUY.synth.createBiquadFilter();
    TANGUY.lp_filter1.type = 'lowpass';
    TANGUY.lp_filter2.type = 'lowpass';
    TANGUY.lp_filter1.connect(TANGUY.lp_filter2);
    TANGUY.lp_filter2.connect(TANGUY.vca);

    //BP FILTER
    TANGUY.bp_filter1 = TANGUY.synth.createBiquadFilter();
    TANGUY.bp_filter2 = TANGUY.synth.createBiquadFilter();
    TANGUY.bp_filter3 = TANGUY.synth.createBiquadFilter();
    TANGUY.bp_filter1.type = 'bandpass';
    TANGUY.bp_filter2.type = 'peaking';
    TANGUY.bp_filter3.type = 'peaking';
    TANGUY.bp_filter1.Q.value = 2;
    TANGUY.bp_filter2.Q.value = 3;
    TANGUY.bp_filter3.Q.value = 3;
    TANGUY.bp_filter1.connect(TANGUY.bp_filter2);
    TANGUY.bp_filter2.connect(TANGUY.bp_filter3);
    TANGUY.bp_filter3.connect(TANGUY.vca);

    //HP FILTER
    TANGUY.hp_filter1 = TANGUY.synth.createBiquadFilter();
    TANGUY.hp_filter2 = TANGUY.synth.createBiquadFilter();
    TANGUY.hp_filter1.type = 'highpass';
    TANGUY.hp_filter2.type = 'highpass';
    TANGUY.hp_filter1.connect(TANGUY.hp_filter2);
    TANGUY.hp_filter2.connect(TANGUY.vca);

    //NOTCH FILTER
    TANGUY.notch1 = TANGUY.synth.createBiquadFilter();
    TANGUY.notch2 = TANGUY.synth.createBiquadFilter();
    TANGUY.notch3 = TANGUY.synth.createBiquadFilter();
    TANGUY.notch1.type = 'notch';
    TANGUY.notch2.type = 'peaking';
    TANGUY.notch3.type = 'peaking';
    TANGUY.notch1.Q.value = 2;
    TANGUY.notch2.Q.value = 3;
    TANGUY.notch3.Q.value = 3;
    TANGUY.notch1.connect(TANGUY.notch2);
    TANGUY.notch2.connect(TANGUY.notch3);
    TANGUY.notch3.connect(TANGUY.vca);

    //MIXER SECTION
    TANGUY.mixer = TANGUY.synth.createGain();
    TANGUY.osc1_vca = TANGUY.synth.createGain();
    TANGUY.osc2_vca = TANGUY.synth.createGain();
    TANGUY.noise_vca = TANGUY.synth.createGain();
    TANGUY.ext_in_vca = TANGUY.synth.createGain();
    TANGUY.mixer.gain.value = 1;
    TANGUY.mixer.connect(TANGUY.lp_filter1);
    TANGUY.osc1_vca.connect(TANGUY.mixer);
    TANGUY.osc2_vca.connect(TANGUY.mixer);
    TANGUY.noise_vca.connect(TANGUY.mixer);
    TANGUY.ext_in_vca.connect(TANGUY.mixer);

    //OSC 1 VCAS
    TANGUY.osc1_saw_vca = TANGUY.synth.createGain();
    TANGUY.osc1_sqr_vca = TANGUY.synth.createGain();
    TANGUY.osc1_tri_vca = TANGUY.synth.createGain();
    TANGUY.osc1_sin_vca = TANGUY.synth.createGain();
    TANGUY.osc1_saw_vca.connect(TANGUY.osc1_vca);
    TANGUY.osc1_sqr_vca.connect(TANGUY.osc1_vca);
    TANGUY.osc1_tri_vca.connect(TANGUY.osc1_vca);
    TANGUY.osc1_sin_vca.connect(TANGUY.osc1_vca);

    //OSC 1 WAVEFORMS
    TANGUY.osc1_saw = TANGUY.synth.createOscillator();
    TANGUY.osc1_sqr = TANGUY.synth.createOscillator();
    TANGUY.osc1_tri = TANGUY.synth.createOscillator();
    TANGUY.osc1_sin = TANGUY.synth.createOscillator();
    TANGUY.osc1_saw.type = 'sawtooth';
    TANGUY.osc1_sqr.type = 'square';
    TANGUY.osc1_tri.type = 'triangle';
    TANGUY.osc1_sin.type = 'sine';
    TANGUY.osc1_saw.connect(TANGUY.osc1_saw_vca);
    TANGUY.osc1_sqr.connect(TANGUY.osc1_sqr_vca);
    TANGUY.osc1_tri.connect(TANGUY.osc1_tri_vca);
    TANGUY.osc1_sin.connect(TANGUY.osc1_sin_vca);

    //FM OSCILLATOR 1
    TANGUY.osc1_fm_vca = TANGUY.synth.createGain();
    TANGUY.osc1_fm_vca.connect(TANGUY.osc1_saw.frequency);
    TANGUY.osc1_fm_vca.connect(TANGUY.osc1_sqr.frequency);
    TANGUY.osc1_fm_vca.connect(TANGUY.osc1_tri.frequency);
    TANGUY.osc1_fm_vca.connect(TANGUY.osc1_sin.frequency);

    //OSC 2 WAVESHAPER
    TANGUY.waveshaper = TANGUY.synth.createWaveShaper();
    TANGUY.waveshaper.connect(TANGUY.osc2_vca);

    //OSC 2
    TANGUY.osc2 = TANGUY.synth.createOscillator();
    TANGUY.osc2.connect(TANGUY.osc1_fm_vca);
    TANGUY.osc2.connect(TANGUY.waveshaper);

    //FM OSCILLATOR 2
    TANGUY.osc2_fm_vca = TANGUY.synth.createGain();
    TANGUY.osc2_fm_vca.connect(TANGUY.osc2.frequency);
    TANGUY.osc1_sin_vca.connect(TANGUY.osc2_fm_vca);

    //NOISE SECTION
    TANGUY.pink_noise_filter1 = TANGUY.synth.createBiquadFilter();
    TANGUY.pink_noise_filter2 = TANGUY.synth.createBiquadFilter();
    TANGUY.pink_noise_filter1.type = 'lowpass';
    TANGUY.pink_noise_filter2.type = 'lowpass';
    TANGUY.pink_noise_filter1.frequency.value = 8000;
    TANGUY.pink_noise_filter2.frequency.value = 4000;
    TANGUY.pink_noise_filter1.Q.value = 1;
    TANGUY.pink_noise_filter2.Q.value = 1;
    TANGUY.pink_noise_filter1.connect(TANGUY.pink_noise_filter2);
    TANGUY.pink_noise_filter2.connect(TANGUY.noise_vca);
    TANGUY.empty_white_noise_buffer = TANGUY.synth.createBuffer(1, 1, TANGUY.synth.sampleRate);
    TANGUY.empty_pink_noise_buffer = TANGUY.synth.createBuffer(1, 1, TANGUY.synth.sampleRate);
    TANGUY.empty_red_noise_buffer = TANGUY.synth.createBuffer(1, 1, TANGUY.synth.sampleRate);
    TANGUY.empty_blue_noise_buffer = TANGUY.synth.createBuffer(1, 1, TANGUY.synth.sampleRate);
    TANGUY.empty_purple_noise_buffer = TANGUY.synth.createBuffer(1, 1, TANGUY.synth.sampleRate);
    TANGUY.white_noise_buffer = TANGUY.synth.createBuffer(1, 88200, TANGUY.synth.sampleRate);
    TANGUY.pink_noise_buffer = TANGUY.synth.createBuffer(1, 44100, TANGUY.synth.sampleRate);
    TANGUY.red_noise_buffer = TANGUY.synth.createBuffer(1, 44100, TANGUY.synth.sampleRate);
    TANGUY.blue_noise_buffer = TANGUY.synth.createBuffer(1, 44100, TANGUY.synth.sampleRate);
    TANGUY.purple_noise_buffer = TANGUY.synth.createBuffer(1, 44100, TANGUY.synth.sampleRate);
    TANGUY.white_noise = TANGUY.synth.createBufferSource();
    TANGUY.pink_noise = TANGUY.synth.createBufferSource();
    TANGUY.red_noise = TANGUY.synth.createBufferSource();
    TANGUY.blue_noise = TANGUY.synth.createBufferSource();
    TANGUY.purple_noise = TANGUY.synth.createBufferSource();
    TANGUY.white_noise.loop = true;
    TANGUY.pink_noise.loop = true;
    TANGUY.red_noise.loop = true;
    TANGUY.blue_noise.loop = true;
    TANGUY.purple_noise.loop = true;
    TANGUY.white_noise.buffer = TANGUY.white_noise_buffer;
    TANGUY.pink_noise.buffer = TANGUY.empty_pink_noise_buffer;
    TANGUY.red_noise.buffer = TANGUY.empty_red_noise_buffer;
    TANGUY.blue_noise.buffer = TANGUY.empty_blue_noise_buffer;
    TANGUY.purple_noise.buffer = TANGUY.empty_purple_noise_buffer;
    TANGUY.white_noise.connect(TANGUY.noise_vca);
    TANGUY.pink_noise.connect(TANGUY.pink_noise_filter1);
    TANGUY.red_noise.connect(TANGUY.noise_vca);
    TANGUY.blue_noise.connect(TANGUY.noise_vca);
    TANGUY.purple_noise.connect(TANGUY.noise_vca);
    white_noise_data = TANGUY.white_noise_buffer.getChannelData(0);
    for (i = 0; i < 88200; i += 1) {
        white_noise_data[i] = 2 * Math.random() - 1;
    }
    pink_noise_data = TANGUY.pink_noise_buffer.getChannelData(0);
    for (i = 0; i < 44100; i += 1) {
        pink_noise_data[i] = Math.floor((Math.random() * (2000 - 20) + 20) / 1000);
        pink_noise_repeat = pink_noise_data[i];
        i += 1;
        for (j = 0; j < 4; j += 1) {
            pink_noise_data[i] = Math.abs(pink_noise_repeat);
            i += 1;
            pink_noise_data[i] = Math.abs(pink_noise_repeat) * 0.5;
        }
    }
    red_noise_data = TANGUY.red_noise_buffer.getChannelData(0);
    for (i = 0; i < 44100; i += 1) {
        red_noise_data[i] = (-1 * Math.random() + 2);
        red_noise_repeat = red_noise_data[i];
        i += 1;
        for (j = 0; j < 237; j += 1) {
            red_noise_data[i] = red_noise_repeat * 0.5;
            i += 1;
        }
    }
    blue_noise_data = TANGUY.blue_noise_buffer.getChannelData(0);
    for (i = 0; i < 44100; i += 1) {
        blue_noise_data[i] = (-1 * Math.random() + 1);
        blue_noise_repeat = blue_noise_data[i];
        i += 1;
        for (j = 0; j < 137; j += 1) {
            blue_noise_data[i] = blue_noise_repeat * 0.5;
            i += 1;
        }
    }
    purple_noise_data = TANGUY.purple_noise_buffer.getChannelData(0);
    for (i = 0; i < 44100; i += 1) {
        purple_noise_data[i] = -1 * Math.random() + 1;
        purple_noise_repeat = purple_noise_data[i];
        i += 1;
        for (j = 0; j < 172; j += 1) {
            purple_noise_data[i] = purple_noise_repeat * 0.75;
            i += 1;
        }
    }

    //LFO VCAS
    TANGUY.lfo_pitch_vca = TANGUY.synth.createGain();
    TANGUY.lfo_filter_vca = TANGUY.synth.createGain();
    TANGUY.lfo_amp_vca = TANGUY.synth.createGain();
    TANGUY.lfo_pitch_vca.connect(TANGUY.osc1_saw.frequency);
    TANGUY.lfo_pitch_vca.connect(TANGUY.osc1_sqr.frequency);
    TANGUY.lfo_pitch_vca.connect(TANGUY.osc1_tri.frequency);
    TANGUY.lfo_pitch_vca.connect(TANGUY.osc1_sin.frequency);
    TANGUY.lfo_pitch_vca.connect(TANGUY.osc2.frequency);
    TANGUY.lfo_filter_vca.connect(TANGUY.lp_filter1.frequency);
    TANGUY.lfo_amp_vca.connect(TANGUY.mixer.gain);

    //LFO
    TANGUY.lfo = TANGUY.synth.createOscillator();
    TANGUY.lfo.connect(TANGUY.lfo_pitch_vca);
    TANGUY.lfo.connect(TANGUY.lfo_filter_vca);
    TANGUY.lfo.connect(TANGUY.lfo_amp_vca);

    TANGUY.build_synth = function () {
        return true;
    };
};
