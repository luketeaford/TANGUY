var TANGUY = {

    voice1: new AudioContext(),

    //SENSIBLE DEFAULTS
    octave_shift: 0,
    osc1_master_pitch: 440,
    osc2_master_pitch: 444.18,
    key_down: false,

    program: {
        name: "INITIALIZE",
        osc1: {
            kbd: true,
            coarse: 1,
            saw_amt: 1,
            sqr_amt: 0,
            tri_amt: 0,
            sin_amt: 0,
            fm_amt: 0
        },
        osc2: {
            kbd: true,
            coarse: 1,
            waveform: "sawtooth",
            detune: 0,
            fine: 0,
            shape_amt: 0,
            fm_amt: 0
        },
        noise: {
            color: "white"
        },
        lfo: {
            shape: "sine",
            rate: 0.1,
            pitch_amt: 0,
            filter_amt: 0,
            amp_amt: 0
        },
        mixer: {
            osc1: 1,
            osc2: 1,
            noise: 0
        },
        filter: {
            mode: "lp",
            frequency: 22050,
            resonance: 0.0001,
            env_amt: 0,
            kbd: 0,
            attack: 0.0008,
            decay: 0.0008,
            sustain: 0,
            release: 0.0008
        },
        vca: {
            gain: 0,
            attack: 0.0001,
            decay: 0.0001,
            sustain: 1,
            release: 0.0001
        },
        portamento: {
            mode: "off",
            amt: 0.01
        },
        mod: {
            amt: 0,
            direction: 1
        },
        delay: {
            rate: 0,
            amt: 0
        }
    },

    save_program: function () {
        var patch_name = prompt('PATCH NAME');
        TANGUY.program.name = patch_name;
        console.log('SAVE PROGRAM: ' + JSON.stringify(TANGUY.program));
    },

    load_program: function (patch) {
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
                osc1[i].frequency.setValueAtTime(TANGUY.osc1_master_pitch * TANGUY.program.osc1.coarse, TANGUY.voice1.currentTime);
            }

            //OSCILLATOR 1 WAVEFORM MIXER
            $('#osc1-saw').val(TANGUY.program.osc1.saw_amt);
            $('#osc1-sqr').val(TANGUY.program.osc1.sqr_amt);
            $('#osc1-tri').val(TANGUY.program.osc1.tri_amt);
            $('#osc1-sin').val(TANGUY.program.osc1.sin_amt);
            $('#osc1-fm').val(TANGUY.program.osc1.fm_amt);
            TANGUY.osc1_saw_vca.gain.setValueAtTime(TANGUY.program.osc1.saw_amt, TANGUY.voice1.currentTime);
            TANGUY.osc1_sqr_vca.gain.setValueAtTime(TANGUY.program.osc1.sqr_amt, TANGUY.voice1.currentTime);
            TANGUY.osc1_tri_vca.gain.setValueAtTime(TANGUY.program.osc1.tri_amt, TANGUY.voice1.currentTime);
            TANGUY.osc1_sin_vca.gain.setValueAtTime(TANGUY.program.osc1.sin_amt, TANGUY.voice1.currentTime);
            TANGUY.osc1_fm_vca.gain.setValueAtTime(TANGUY.program.osc1.fm_amt * TANGUY.program.osc1.fm_amt * 24000, TANGUY.voice1.currentTime);//parens needed?

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
            TANGUY.osc2.frequency.setValueAtTime((TANGUY.osc2_master_pitch * TANGUY.program.osc2.coarse) + TANGUY.program.osc2.fine, TANGUY.voice1.currentTime);

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
            TANGUY.osc2.detune.setValueAtTime(TANGUY.osc2_master_pitch + TANGUY.program.osc2.detune, TANGUY.voice1.currentTime);
            TANGUY.osc2.frequency.setValueAtTime(((TANGUY.osc2_master_pitch * TANGUY.program.osc2.coarse) + TANGUY.program.osc2.fine), TANGUY.voice1.currentTime);
            if (TANGUY.osc2.shape_amt > 0) {
                var x = this.value;
                TANGUY.waveshaper.curve = new Float32Array([x * 1.6, x * -2.5, x * -1.2, x * -2.4, x * -1.6, x * -3.2, x * 6.4, x * -3.2]);
            } else {
                TANGUY.waveshaper.curve = null;
            }
            TANGUY.osc2_fm_vca.gain.setValueAtTime(TANGUY.program.osc2.fm_amt * TANGUY.program.osc2.fm_amt * 24000, TANGUY.voice1.currentTime);//parens needed?

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
                TANGUY.lp_filter1.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime);
                TANGUY.lp_filter2.frequency.setValueAtTime((TANGUY.program.filter.frequency / 2), TANGUY.voice1.currentTime);
                TANGUY.lp_filter1.Q.setValueAtTime(TANGUY.program.filter.resonance / 82, TANGUY.voice1.currentTime);
                TANGUY.lp_filter2.Q.setValueAtTime(TANGUY.program.filter.resonance / 123, TANGUY.voice1.currentTime);
                TANGUY.lfo_filter_vca.disconnect();
                TANGUY.lfo_filter_vca.connect(TANGUY.lp_filter1.frequency);
                TANGUY.lfo_filter_vca.connect(TANGUY.lp_filter2.frequency);
                break;
            case 'bp':
                $('#filter-bp').parent().addClass('selected');
                $('#filter-bp').parent().siblings().removeClass('selected');
                TANGUY.mixer.disconnect();
                TANGUY.mixer.connect(TANGUY.bp_filter1);
                TANGUY.bp_filter1.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime);
                TANGUY.bp_filter2.frequency.setValueAtTime(TANGUY.program.filter.frequency * 0.9, TANGUY.voice1.currentTime);
                TANGUY.bp_filter3.frequency.setValueAtTime(TANGUY.program.filter.frequency * 1.1, TANGUY.voice1.currentTime);
                TANGUY.bp_filter2.gain.setValueAtTime(TANGUY.program.filter.resonance / 82, TANGUY.voice1.currentTime);
                TANGUY.bp_filter3.gain.setValueAtTime(TANGUY.program.filter.resonance / 82, TANGUY.voice1.currentTime);
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
                TANGUY.hp_filter1.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime);
                TANGUY.hp_filter2.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime);
                TANGUY.hp_filter1.Q.setValueAtTime(TANGUY.program.filter.resonance / 82, TANGUY.voice1.currentTime);
                TANGUY.hp_filter2.Q.setValueAtTime(TANGUY.program.filter.resonance / 123, TANGUY.voice1.currentTime);
                TANGUY.lfo_filter_vca.disconnect();
                TANGUY.lfo_filter_vca.connect(TANGUY.hp_filter1.frequency);
                TANGUY.lfo_filter_vca.connect(TANGUY.hp_filter2.frequency);
                break;
            case 'notch':
                $('#notch').parent().addClass('selected');
                $('#notch').parent().siblings().removeClass('selected');
                TANGUY.mixer.disconnect();
                TANGUY.mixer.connect(TANGUY.notch1);
                TANGUY.notch1.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime);
                TANGUY.notch2.frequency.setValueAtTime(TANGUY.program.filter.frequency * 0.9, TANGUY.voice1.currentTime);
                TANGUY.notch3.frequency.setValueAtTime(TANGUY.program.filter.frequency * 1.1, TANGUY.voice1.currentTime);
                TANGUY.notch2.gain.setValueAtTime(TANGUY.program.filter.resonance / -21, TANGUY.voice1.currentTime, 0.01);
                TANGUY.notch3.gain.setValueAtTime(TANGUY.program.filter.resonance / -21, TANGUY.voice1.currentTime, 0.01);
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
            TANGUY.vca.gain.setValueAtTime(TANGUY.program.vca.gain, TANGUY.voice1.currentTime);

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
    },

    shift_octave: function (direction) {
        var shift_octave_lights = function (octave_shift) {
            console.log('OCTAVE SHIFT IS ' + octave_shift);
            switch (octave_shift) {
            case -2:
                $('.octave-minus-2').addClass('lit');
                $('.octave-minus-1').removeClass('lit');
                break;
            case -1:
                $('.octave-minus-2').removeClass('lit');
                $('.octave-minus-1').addClass('lit');
                $('.octave-plus-0').removeClass('lit');
                break;
            case 0:
                $('.octave-minus-1').removeClass('lit');
                $('.octave-plus-0').addClass('lit');
                $('.octave-plus-1').removeClass('lit');
                break;
            case 1:
                $('.octave-plus-0').removeClass('lit');
                $('.octave-plus-1').addClass('lit');
                $('.octave-plus-2').removeClass('lit');
                break;
            case 2:
                $('.octave-plus-1').removeClass('lit');
                $('.octave-plus-2').addClass('lit');
                break;
            }
        };
        if (direction > 0 && TANGUY.octave_shift < 2) {
            TANGUY.octave_shift = TANGUY.octave_shift + 1;
        } else if (direction < 1 && TANGUY.octave_shift > -2) {
            TANGUY.octave_shift = TANGUY.octave_shift - 1;
        }
        shift_octave_lights(TANGUY.octave_shift);
    },

    multi_switch: function (gizmo) {
        $(gizmo).parent().addClass('selected');
        $(gizmo).parent().siblings().removeClass('selected');
    },

    stop_tweaking: function () {
        $(this).unbind('mousemove');
    },

    calculate_lfo: function () {
        var i;
        for (i = 0; i < arguments.length; i += 1) {
            if (arguments[i] === 'pitch') {
                TANGUY.lfo_pitch_vca.gain.value = TANGUY.program.lfo.pitch_amt * TANGUY.program.mod.amt * TANGUY.program.mod.direction;
            }
            if (arguments[i] === 'filter') {
                TANGUY.lfo_filter_vca.gain.value = TANGUY.program.lfo.filter_amt * TANGUY.program.mod.amt * TANGUY.program.mod.direction;
            }
            if (arguments[i] === 'amp') {
                TANGUY.lfo_amp_vca.gain.value = TANGUY.program.lfo.amp_amt * TANGUY.program.mod.amt * TANGUY.program.mod.direction;
            }
        }
        if (arguments.length === 0) {
            TANGUY.calculate_lfo('pitch', 'filter', 'amp');
        }
    },

    calculate_pitch: function (pos, note_value) {
        var note = ((TANGUY.octave_shift + pos) * 1200) + note_value,
            osc2_note = ((TANGUY.octave_shift + pos) * 1200) + (note_value + TANGUY.program.osc2.detune),
            kbd = (4800 - note) * TANGUY.program.filter.kbd,
            osc1 = [TANGUY.osc1_saw, TANGUY.osc1_sqr, TANGUY.osc1_tri, TANGUY.osc1_sin],
            i,
            no_portamento = function () {
                if (TANGUY.program.osc1.kbd === true) {
                    for (i = 0; i < osc1.length; i += 1) {
                        osc1[i].detune.setValueAtTime(note, TANGUY.voice1.currentTime);
                    }
                }
                if (TANGUY.program.osc2.kbd === true) {
                    TANGUY.osc2.detune.setValueAtTime(osc2_note, TANGUY.voice1.currentTime);
                }
            },
            linear_portamento = function () {
                if (TANGUY.program.osc1.kbd === true) {
                    for (i = 0; i < osc1.length; i += 1) {
                        osc1[i].detune.linearRampToValueAtTime(note, TANGUY.voice1.currentTime + parseFloat(TANGUY.program.portamento.amt));
                    }
                }
                if (TANGUY.program.osc2.kbd === true) {
                    TANGUY.osc2.detune.linearRampToValueAtTime(osc2_note, TANGUY.voice1.currentTime + parseFloat(TANGUY.program.portamento.amt));
                }
            },
            exponential_portamento = function () {
                if (TANGUY.program.osc1.kbd === true) {
                    for (i = 0; i < osc1.length; i += 1) {
                        osc1[i].detune.setTargetAtTime(note, TANGUY.voice1.currentTime, TANGUY.program.portamento.amt / 5);
                    }
                }
                if (TANGUY.program.osc2.kbd === true) {
                    TANGUY.osc2.detune.setTargetAtTime(osc2_note, TANGUY.voice1.currentTime, TANGUY.program.portamento.amt / 5);
                }
            };

        TANGUY.osc1_pitch = note;
        TANGUY.osc2_pitch = osc2_note;

        //OSCILLATOR TRACKING
        switch (TANGUY.program.portamento.mode) {
        case 'off':
            no_portamento();
            break;
        case 'linear':
            linear_portamento();
            break;
        case 'exponential':
            exponential_portamento();
            break;
        }

        //FILTER KEYBOARD TRACKING
        switch (TANGUY.program.filter.mode) {
        case 'lp':
            TANGUY.lp_filter1.detune.setValueAtTime(kbd, TANGUY.voice1.currentTime);
            TANGUY.lp_filter2.detune.setValueAtTime(kbd / 2, TANGUY.voice1.currentTime);
            break;
        case 'bp':
            TANGUY.bp_filter1.detune.setValueAtTime(kbd, TANGUY.voice1.currentTime);
            TANGUY.bp_filter2.detune.setValueAtTime(kbd, TANGUY.voice1.currentTime);
            TANGUY.bp_filter3.detune.setValueAtTime(kbd, TANGUY.voice1.currentTime);
            break;
        case 'hp':
            TANGUY.hp_filter1.detune.setValueAtTime(kbd, TANGUY.voice1.currentTime);
            TANGUY.hp_filter2.detune.setValueAtTime(kbd, TANGUY.voice1.currentTime);
            break;
        case 'notch':
            TANGUY.notch1.detune.setValueAtTime(kbd, TANGUY.voice1.currentTime);
            TANGUY.notch2.detune.setValueAtTime(kbd, TANGUY.voice1.currentTime);
            TANGUY.notch3.detune.setValueAtTime(kbd, TANGUY.voice1.currentTime);
            break;
        case 'off':
            console.log('No filter keyboard tracking to apply');
            break;
        }
    },

    gate_on: function () {
        var filter_eg = TANGUY.program.filter.env_amt + TANGUY.program.filter.frequency,
            filter_end_of_attack = TANGUY.voice1.currentTime + TANGUY.program.filter.attack,
            vca_end_of_attack = TANGUY.voice1.currentTime + TANGUY.program.vca.attack;

        switch (TANGUY.program.filter.mode) {
        case 'lp':
            TANGUY.lp_filter1.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime);
            TANGUY.lp_filter2.frequency.setValueAtTime(TANGUY.program.filter.frequency / 2, TANGUY.voice1.currentTime);
            TANGUY.lp_filter1.frequency.linearRampToValueAtTime(filter_eg, TANGUY.voice1.currentTime + TANGUY.program.filter.attack);
            TANGUY.lp_filter2.frequency.linearRampToValueAtTime(filter_eg / 2, TANGUY.voice1.currentTime + TANGUY.program.filter.attack);
            TANGUY.lp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain), filter_end_of_attack, TANGUY.program.filter.decay);
            TANGUY.lp_filter2.frequency.setTargetAtTime((TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain)) / 2, filter_end_of_attack, TANGUY.program.filter.decay);
            break;
        case 'bp':
            TANGUY.bp_filter1.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime);
            TANGUY.bp_filter2.frequency.setValueAtTime(TANGUY.program.filter.frequency * 0.9, TANGUY.voice1.currentTime);
            TANGUY.bp_filter3.frequency.setValueAtTime(TANGUY.program.filter.frequency * 1.1, TANGUY.voice1.currentTime);
            TANGUY.bp_filter1.frequency.linearRampToValueAtTime(filter_eg, TANGUY.voice1.currentTime + TANGUY.program.filter.attack);
            TANGUY.bp_filter2.frequency.linearRampToValueAtTime(filter_eg * 0.9, TANGUY.voice1.currentTime + TANGUY.program.filter.attack);
            TANGUY.bp_filter3.frequency.linearRampToValueAtTime(filter_eg * 1.1, TANGUY.voice1.currentTime + TANGUY.program.filter.attack);
            TANGUY.bp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain), filter_end_of_attack, TANGUY.program.filter.decay);
            TANGUY.bp_filter2.frequency.setTargetAtTime((TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain)) * 0.9, filter_end_of_attack, TANGUY.program.filter.decay);
            TANGUY.bp_filter3.frequency.setTargetAtTime((TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain)) * 1.1, filter_end_of_attack, TANGUY.program.filter.decay);
            break;
        case 'hp':
            TANGUY.hp_filter1.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime);
            TANGUY.hp_filter2.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime);
            TANGUY.hp_filter1.frequency.linearRampToValueAtTime(filter_eg, TANGUY.voice1.currentTime + TANGUY.program.filter.attack);
            TANGUY.hp_filter2.frequency.linearRampToValueAtTime(filter_eg, TANGUY.voice1.currentTime + TANGUY.program.filter.attack);
            TANGUY.hp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain), filter_end_of_attack, TANGUY.program.filter.decay);
            TANGUY.hp_filter2.frequency.setTargetAtTime(TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain), filter_end_of_attack, TANGUY.program.filter.decay);
            break;
        case 'notch':
            TANGUY.notch1.frequency.setValueAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime);
            TANGUY.notch2.frequency.setValueAtTime(TANGUY.program.filter.frequency * 0.9, TANGUY.voice1.currentTime);
            TANGUY.notch3.frequency.setValueAtTime(TANGUY.program.filter.frequency * 1.1, TANGUY.voice1.currentTime);
            TANGUY.notch1.frequency.linearRampToValueAtTime(filter_eg, TANGUY.voice1.currentTime + TANGUY.program.filter.attack);
            TANGUY.notch2.frequency.linearRampToValueAtTime(filter_eg * 0.9, TANGUY.voice1.currentTime + TANGUY.program.filter.attack);
            TANGUY.notch3.frequency.linearRampToValueAtTime(filter_eg * 1.1, TANGUY.voice1.currentTime + TANGUY.program.filter.attack);
            TANGUY.notch1.frequency.setTargetAtTime(TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain), filter_end_of_attack, TANGUY.program.filter.decay);
            TANGUY.notch2.frequency.setTargetAtTime((TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain)) * 0.9, filter_end_of_attack, TANGUY.program.filter.decay);
            TANGUY.notch3.frequency.setTargetAtTime((TANGUY.program.filter.frequency + (TANGUY.program.filter.env_amt * TANGUY.program.filter.sustain)) * 1.1, filter_end_of_attack, TANGUY.program.filter.decay);
            break;
        }

        TANGUY.calculate_pitch(parseFloat(this.getAttribute('data-keyboard-position')), parseFloat(this.getAttribute('data-note-value')));

        TANGUY.vca.gain.setValueAtTime(TANGUY.program.vca.gain, TANGUY.voice1.currentTime);
        TANGUY.vca.gain.linearRampToValueAtTime(1, TANGUY.voice1.currentTime + TANGUY.program.vca.attack);
        TANGUY.vca.gain.setTargetAtTime(TANGUY.program.vca.sustain + TANGUY.program.vca.gain, vca_end_of_attack, TANGUY.program.vca.decay);
    },

    gate_off: function () {
        var filter_release_peak,
            vca_release_peak = TANGUY.vca.gain.value;

        switch (TANGUY.program.filter.mode) {
        case 'lp':
            filter_release_peak = TANGUY.lp_filter1.frequency.value;
            TANGUY.lp_filter1.frequency.cancelScheduledValues(TANGUY.voice1.currentTime);
            TANGUY.lp_filter2.frequency.cancelScheduledValues(TANGUY.voice1.currentTime);
            TANGUY.lp_filter1.frequency.setValueAtTime(filter_release_peak, TANGUY.voice1.currentTime);
            TANGUY.lp_filter2.frequency.setValueAtTime(filter_release_peak / 2, TANGUY.voice1.currentTime);
            TANGUY.lp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime, TANGUY.program.filter.release);
            TANGUY.lp_filter2.frequency.setTargetAtTime(TANGUY.program.filter.frequency / 2, TANGUY.voice1.currentTime, TANGUY.program.filter.release);
            break;
        case 'bp':
            filter_release_peak = TANGUY.bp_filter1.frequency.value;
            TANGUY.bp_filter1.frequency.cancelScheduledValues(TANGUY.voice1.currentTime);
            TANGUY.bp_filter2.frequency.cancelScheduledValues(TANGUY.voice1.currentTime);
            TANGUY.bp_filter3.frequency.cancelScheduledValues(TANGUY.voice1.currentTime);
            TANGUY.bp_filter1.frequency.setValueAtTime(filter_release_peak, TANGUY.voice1.currentTime);
            TANGUY.bp_filter2.frequency.setValueAtTime(filter_release_peak * 0.9, TANGUY.voice1.currentTime);
            TANGUY.bp_filter3.frequency.setValueAtTime(filter_release_peak * 1.1, TANGUY.voice1.currentTime);
            TANGUY.bp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime, TANGUY.program.filter.release);
            TANGUY.bp_filter2.frequency.setTargetAtTime(TANGUY.program.filter.frequency * 0.9, TANGUY.voice1.currentTime, TANGUY.program.filter.release);
            TANGUY.bp_filter3.frequency.setTargetAtTime(TANGUY.program.filter.frequency * 1.1, TANGUY.voice1.currentTime, TANGUY.program.filter.release);
            break;
        case 'hp':
            filter_release_peak = TANGUY.hp_filter1.frequency.value;
            TANGUY.hp_filter1.frequency.cancelScheduledValues(TANGUY.voice1.currentTime);
            TANGUY.hp_filter2.frequency.cancelScheduledValues(TANGUY.voice1.currentTime);
            TANGUY.hp_filter1.frequency.setValueAtTime(filter_release_peak, TANGUY.voice1.currentTime);
            TANGUY.hp_filter2.frequency.setValueAtTime(filter_release_peak, TANGUY.voice1.currentTime);
            TANGUY.hp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime, TANGUY.program.filter.release);
            TANGUY.hp_filter2.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime, TANGUY.program.filter.release);
            break;
        case 'notch':
            filter_release_peak = TANGUY.notch1.frequency.value;
            TANGUY.notch1.frequency.cancelScheduledValues(TANGUY.voice1.currentTime);
            TANGUY.notch2.frequency.cancelScheduledValues(TANGUY.voice1.currentTime);
            TANGUY.notch3.frequency.cancelScheduledValues(TANGUY.voice1.currentTime);
            TANGUY.notch1.frequency.setValueAtTime(filter_release_peak, TANGUY.voice1.currentTime);
            TANGUY.notch2.frequency.setValueAtTime(filter_release_peak * 0.9, TANGUY.voice1.currentTime);
            TANGUY.notch3.frequency.setValueAtTime(filter_release_peak * 1.1, TANGUY.voice1.currentTime);
            TANGUY.notch1.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime, TANGUY.program.filter.release);
            TANGUY.notch2.frequency.setTargetAtTime(TANGUY.program.filter.frequency * 0.9, TANGUY.voice1.currentTime, TANGUY.program.filter.release);
            TANGUY.notch3.frequency.setTargetAtTime(TANGUY.program.filter.frequency * 1.1, TANGUY.voice1.currentTime, TANGUY.program.filter.release);
            break;
        }

        TANGUY.vca.gain.cancelScheduledValues(TANGUY.voice1.currentTime);
        TANGUY.vca.gain.setValueAtTime(vca_release_peak, TANGUY.voice1.currentTime);
        TANGUY.vca.gain.setTargetAtTime(TANGUY.program.vca.gain, TANGUY.voice1.currentTime, TANGUY.program.vca.release);
    },

    midi: function () {
        console.log('Web MIDI happening');
    }
};

TANGUY.build_synth = function () {
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

    //REVERB - NOTHING CONNECTED TO THIS AT THE MOMENT
    TANGUY.reverb_vca = TANGUY.voice1.createGain();
    TANGUY.reverb_vca.gain.value = 0;
    TANGUY.reverb_vca.connect(TANGUY.voice1.destination);
    TANGUY.reverb = TANGUY.voice1.createConvolver();
    TANGUY.reverb.buffer = 0/* an audio buffer containing the IR */;
    TANGUY.reverb.connect(TANGUY.reverb_vca);

    //DELAY
    TANGUY.delay1_vca = TANGUY.voice1.createGain();
    TANGUY.delay2_vca = TANGUY.voice1.createGain();
    TANGUY.delay3_vca = TANGUY.voice1.createGain();
    TANGUY.delay4_vca = TANGUY.voice1.createGain();
    TANGUY.delay1_vca.gain.value = 0;
    TANGUY.delay2_vca.gain.value = 0;
    TANGUY.delay3_vca.gain.value = 0;
    TANGUY.delay4_vca.gain.value = 0;
    TANGUY.delay1_vca.connect(TANGUY.voice1.destination);
    TANGUY.delay2_vca.connect(TANGUY.voice1.destination);
    TANGUY.delay3_vca.connect(TANGUY.voice1.destination);
    TANGUY.delay4_vca.connect(TANGUY.voice1.destination);
    TANGUY.delay1 = TANGUY.voice1.createDelay(2);
    TANGUY.delay2 = TANGUY.voice1.createDelay(2);
    TANGUY.delay3 = TANGUY.voice1.createDelay(2);
    TANGUY.delay4 = TANGUY.voice1.createDelay(2);
    TANGUY.delay1.connect(TANGUY.delay1_vca);
    TANGUY.delay2.connect(TANGUY.delay2_vca);
    TANGUY.delay3.connect(TANGUY.delay3_vca);
    TANGUY.delay4.connect(TANGUY.delay4_vca);
    TANGUY.delay1_vca.connect(TANGUY.delay2);
    TANGUY.delay2_vca.connect(TANGUY.delay3);
    TANGUY.delay3_vca.connect(TANGUY.delay4);

    //VCA
    TANGUY.vca = TANGUY.voice1.createGain();
    TANGUY.vca.gain.value = 0;
    TANGUY.vca.connect(TANGUY.delay1);
    TANGUY.vca.connect(TANGUY.voice1.destination);

    //LP FILTER
    TANGUY.lp_filter1 = TANGUY.voice1.createBiquadFilter();
    TANGUY.lp_filter2 = TANGUY.voice1.createBiquadFilter();
    TANGUY.lp_filter1.type = 'lowpass';
    TANGUY.lp_filter2.type = 'lowpass';
    TANGUY.lp_filter1.connect(TANGUY.lp_filter2);
    TANGUY.lp_filter2.connect(TANGUY.vca);

    //BP FILTER
    TANGUY.bp_filter1 = TANGUY.voice1.createBiquadFilter();
    TANGUY.bp_filter2 = TANGUY.voice1.createBiquadFilter();
    TANGUY.bp_filter3 = TANGUY.voice1.createBiquadFilter();
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
    TANGUY.hp_filter1 = TANGUY.voice1.createBiquadFilter();
    TANGUY.hp_filter2 = TANGUY.voice1.createBiquadFilter();
    TANGUY.hp_filter1.type = 'highpass';
    TANGUY.hp_filter2.type = 'highpass';
    TANGUY.hp_filter1.connect(TANGUY.hp_filter2);
    TANGUY.hp_filter2.connect(TANGUY.vca);

    //NOTCH FILTER
    TANGUY.notch1 = TANGUY.voice1.createBiquadFilter();
    TANGUY.notch2 = TANGUY.voice1.createBiquadFilter();
    TANGUY.notch3 = TANGUY.voice1.createBiquadFilter();
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
    TANGUY.mixer = TANGUY.voice1.createGain();
    TANGUY.osc1_vca = TANGUY.voice1.createGain();
    TANGUY.osc2_vca = TANGUY.voice1.createGain();
    TANGUY.noise_vca = TANGUY.voice1.createGain();
    TANGUY.ext_in_vca = TANGUY.voice1.createGain();
    TANGUY.mixer.gain.value = 1;
    TANGUY.mixer.connect(TANGUY.lp_filter1);
    TANGUY.osc1_vca.connect(TANGUY.mixer);
    TANGUY.osc2_vca.connect(TANGUY.mixer);
    TANGUY.noise_vca.connect(TANGUY.mixer);
    TANGUY.ext_in_vca.connect(TANGUY.mixer);

    //OSC 1 VCAS
    TANGUY.osc1_saw_vca = TANGUY.voice1.createGain();
    TANGUY.osc1_sqr_vca = TANGUY.voice1.createGain();
    TANGUY.osc1_tri_vca = TANGUY.voice1.createGain();
    TANGUY.osc1_sin_vca = TANGUY.voice1.createGain();
    TANGUY.osc1_saw_vca.connect(TANGUY.osc1_vca);
    TANGUY.osc1_sqr_vca.connect(TANGUY.osc1_vca);
    TANGUY.osc1_tri_vca.connect(TANGUY.osc1_vca);
    TANGUY.osc1_sin_vca.connect(TANGUY.osc1_vca);

    //OSC 1 WAVEFORMS
    TANGUY.osc1_saw = TANGUY.voice1.createOscillator();
    TANGUY.osc1_sqr = TANGUY.voice1.createOscillator();
    TANGUY.osc1_tri = TANGUY.voice1.createOscillator();
    TANGUY.osc1_sin = TANGUY.voice1.createOscillator();
    TANGUY.osc1_saw.type = 'sawtooth';
    TANGUY.osc1_sqr.type = 'square';
    TANGUY.osc1_tri.type = 'triangle';
    TANGUY.osc1_sin.type = 'sine';
    TANGUY.osc1_saw.start(0);
    TANGUY.osc1_sqr.start(0);
    TANGUY.osc1_tri.start(0);
    TANGUY.osc1_sin.start(0);
    TANGUY.osc1_saw.connect(TANGUY.osc1_saw_vca);
    TANGUY.osc1_sqr.connect(TANGUY.osc1_sqr_vca);
    TANGUY.osc1_tri.connect(TANGUY.osc1_tri_vca);
    TANGUY.osc1_sin.connect(TANGUY.osc1_sin_vca);

    //FM OSCILLATOR 1
    TANGUY.osc1_fm_vca = TANGUY.voice1.createGain();
    TANGUY.osc1_fm_vca.connect(TANGUY.osc1_saw.frequency);
    TANGUY.osc1_fm_vca.connect(TANGUY.osc1_sqr.frequency);
    TANGUY.osc1_fm_vca.connect(TANGUY.osc1_tri.frequency);
    TANGUY.osc1_fm_vca.connect(TANGUY.osc1_sin.frequency);

    //OSC 2 WAVESHAPER
    TANGUY.waveshaper = TANGUY.voice1.createWaveShaper();
    TANGUY.waveshaper.connect(TANGUY.osc2_vca);

    //OSC 2
    TANGUY.osc2 = TANGUY.voice1.createOscillator();
    TANGUY.osc2.start(0);
    TANGUY.osc2.connect(TANGUY.osc1_fm_vca);
    TANGUY.osc2.connect(TANGUY.waveshaper);

    //FM OSCILLATOR 2
    TANGUY.osc2_fm_vca = TANGUY.voice1.createGain();
    TANGUY.osc2_fm_vca.connect(TANGUY.osc2.frequency);
    TANGUY.osc1_sin_vca.connect(TANGUY.osc2_fm_vca);

    //NOISE SECTION
    TANGUY.pink_noise_filter1 = TANGUY.voice1.createBiquadFilter();
    TANGUY.pink_noise_filter2 = TANGUY.voice1.createBiquadFilter();
    TANGUY.pink_noise_filter1.type = 'lowpass';
    TANGUY.pink_noise_filter2.type = 'lowpass';
    TANGUY.pink_noise_filter1.frequency.value = 8000;
    TANGUY.pink_noise_filter2.frequency.value = 4000;
    TANGUY.pink_noise_filter1.Q.value = 1;
    TANGUY.pink_noise_filter2.Q.value = 1;
    TANGUY.pink_noise_filter1.connect(TANGUY.pink_noise_filter2);
    TANGUY.pink_noise_filter2.connect(TANGUY.noise_vca);
    TANGUY.empty_white_noise_buffer = TANGUY.voice1.createBuffer(1, 1, TANGUY.voice1.sampleRate);
    TANGUY.empty_pink_noise_buffer = TANGUY.voice1.createBuffer(1, 1, TANGUY.voice1.sampleRate);
    TANGUY.empty_red_noise_buffer = TANGUY.voice1.createBuffer(1, 1, TANGUY.voice1.sampleRate);
    TANGUY.empty_blue_noise_buffer = TANGUY.voice1.createBuffer(1, 1, TANGUY.voice1.sampleRate);
    TANGUY.empty_purple_noise_buffer = TANGUY.voice1.createBuffer(1, 1, TANGUY.voice1.sampleRate);
    TANGUY.white_noise_buffer = TANGUY.voice1.createBuffer(1, 88200, TANGUY.voice1.sampleRate);
    TANGUY.pink_noise_buffer = TANGUY.voice1.createBuffer(1, 44100, TANGUY.voice1.sampleRate);
    TANGUY.red_noise_buffer = TANGUY.voice1.createBuffer(1, 44100, TANGUY.voice1.sampleRate);
    TANGUY.blue_noise_buffer = TANGUY.voice1.createBuffer(1, 44100, TANGUY.voice1.sampleRate);
    TANGUY.purple_noise_buffer = TANGUY.voice1.createBuffer(1, 44100, TANGUY.voice1.sampleRate);
    TANGUY.white_noise = TANGUY.voice1.createBufferSource();
    TANGUY.pink_noise = TANGUY.voice1.createBufferSource();
    TANGUY.red_noise = TANGUY.voice1.createBufferSource();
    TANGUY.blue_noise = TANGUY.voice1.createBufferSource();
    TANGUY.purple_noise = TANGUY.voice1.createBufferSource();
    TANGUY.white_noise.start(0);
    TANGUY.pink_noise.start(0);
    TANGUY.red_noise.start(0);
    TANGUY.blue_noise.start(0);
    TANGUY.purple_noise.start(0);
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
    TANGUY.lfo_pitch_vca = TANGUY.voice1.createGain();
    TANGUY.lfo_filter_vca = TANGUY.voice1.createGain();
    TANGUY.lfo_amp_vca = TANGUY.voice1.createGain();
    TANGUY.lfo_pitch_vca.connect(TANGUY.osc1_saw.frequency);
    TANGUY.lfo_pitch_vca.connect(TANGUY.osc1_sqr.frequency);
    TANGUY.lfo_pitch_vca.connect(TANGUY.osc1_tri.frequency);
    TANGUY.lfo_pitch_vca.connect(TANGUY.osc1_sin.frequency);
    TANGUY.lfo_pitch_vca.connect(TANGUY.osc2.frequency);
    TANGUY.lfo_filter_vca.connect(TANGUY.lp_filter1.frequency);
    TANGUY.lfo_amp_vca.connect(TANGUY.mixer.gain);

    //LFO
    TANGUY.lfo = TANGUY.voice1.createOscillator();
    TANGUY.lfo.start(0);
    TANGUY.lfo.connect(TANGUY.lfo_pitch_vca);
    TANGUY.lfo.connect(TANGUY.lfo_filter_vca);
    TANGUY.lfo.connect(TANGUY.lfo_amp_vca);
};

$(document).ready(function () {
    TANGUY.build_synth();
    TANGUY.load_program('initialize');
    TANGUY.midi();
});

//OSCILLATOR 1 CONTROLS
$('#osc1-kbd').change(function () {
    TANGUY.program.osc1.kbd = this.checked ? true : false;
});
$('#osc1-coarse input').change(function () {
    var osc1 = [TANGUY.osc1_saw, TANGUY.osc1_sqr, TANGUY.osc1_tri, TANGUY.osc1_sin],
        i;
    TANGUY.program.osc1.coarse = this.value;
    for (i = 0; i < osc1.length; i += 1) {
        osc1[i].frequency.setValueAtTime(440 * this.value, TANGUY.voice1.currentTime);
    }
});
$('#osc1-saw').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.osc1.saw_amt = this.value;
        TANGUY.osc1_saw_vca.gain.setValueAtTime(this.value, TANGUY.voice1.currentTime);
    });
}).mouseup(TANGUY.stop_tweaking);
$('#osc1-sqr').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.osc1.sqr_amt = -1 * this.value;
        TANGUY.osc1_sqr_vca.gain.setValueAtTime(-1 * this.value, TANGUY.voice1.currentTime);
    });
}).mouseup(TANGUY.stop_tweaking);
$('#osc1-tri').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.osc1.tri_amt = this.value;
        TANGUY.osc1_tri_vca.gain.setValueAtTime(this.value, TANGUY.voice1.currentTime);
    });
}).mouseup(TANGUY.stop_tweaking);
$('#osc1-sin').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.osc1.sin_amt = this.value;
        TANGUY.osc1_sin_vca.gain.setValueAtTime(this.value, TANGUY.voice1.currentTime);
    });
}).mouseup(TANGUY.stop_tweaking);
$('#osc1-fm').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.osc1.fm_amt = this.value;
        TANGUY.osc1_fm_vca.gain.setValueAtTime((this.value * this.value) * 24000, TANGUY.voice1.currentTime);
    });
}).mouseup(TANGUY.stop_tweaking);

//OSCILLATOR 2 CONTROLS
$('#osc2-kbd').change(function () {
    TANGUY.program.osc2.kbd = this.checked ? true : false;
});
$('#osc2-coarse input').change(function () {
    TANGUY.program.osc2.coarse = this.value;
    TANGUY.osc2.frequency.setValueAtTime(TANGUY.osc2_master_pitch * this.value, TANGUY.voice1.currentTime);
});
$('#osc2-detune').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.osc2.detune = parseFloat(this.value);
        if (TANGUY.osc2_pitch === undefined) {
            TANGUY.osc2_pitch = TANGUY.osc2_master_pitch;
        }
        TANGUY.osc2.detune.setValueAtTime(TANGUY.osc2_pitch + TANGUY.program.osc2.detune, TANGUY.voice1.currentTime);
    });
}).mouseup(TANGUY.stop_tweaking);
$('#osc2-fine').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.osc2.fine = parseFloat(this.value);
        TANGUY.osc2.frequency.setValueAtTime((TANGUY.osc2_master_pitch * TANGUY.program.osc2.coarse) + TANGUY.program.osc2.fine, TANGUY.voice1.currentTime);
    });
}).mouseup(TANGUY.stop_tweaking);
$('#osc2-saw, #osc2-sqr, #osc2-tri, #osc2-sin').change(function () {
    TANGUY.program.osc2.waveform = this.value;
    TANGUY.osc2.type = this.value;
});
$('#osc2-waveshape').mousedown(function () {
    $(this).mousemove(function () {
        var x = this.value;
        TANGUY.program.osc2.shape_amt = this.value;
        if (x > 0) {
            TANGUY.waveshaper.curve = new Float32Array([x * 1.6, x * -2.5, x * -1.2, x * -2.4, x * -1.6, x * -3.2, x * 6.4, x * -3.2]);
        } else {
            TANGUY.waveshaper.curve = null;
        }
    });
}).mouseup(TANGUY.stop_tweaking);
$('#osc2-fm').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.osc2.fm_amt = this.value;
        TANGUY.osc2_fm_vca.gain.setValueAtTime((this.value * this.value) * 24000, TANGUY.voice1.currentTime);
    });
}).mouseup(TANGUY.stop_tweaking);

//NOISE CONTROLS
$('#white-noise, #pink-noise, #red-noise, #blue-noise, #purple-noise').change(function () {
    TANGUY.program.noise.color = this.value;
    switch (this.value) {
    case 'white':
        TANGUY.white_noise.buffer = TANGUY.white_noise_buffer;
        TANGUY.pink_noise.buffer = TANGUY.empty_pink_noise_buffer;
        TANGUY.red_noise.buffer = TANGUY.empty_red_noise_buffer;
        TANGUY.blue_noise.buffer = TANGUY.empty_blue_noise_buffer;
        TANGUY.purple_noise.buffer = TANGUY.empty_purple_noise_buffer;
        break;
    case 'pink':
        TANGUY.pink_noise.buffer = TANGUY.pink_noise_buffer;
        TANGUY.white_noise.buffer = TANGUY.empty_white_noise_buffer;
        TANGUY.red_noise.buffer = TANGUY.empty_red_noise_buffer;
        TANGUY.blue_noise.buffer = TANGUY.empty_blue_noise_buffer;
        TANGUY.purple_noise.buffer = TANGUY.empty_purple_noise_buffer;
        break;
    case 'red':
        TANGUY.red_noise.buffer = TANGUY.red_noise_buffer;
        TANGUY.white_noise.buffer = TANGUY.empty_white_noise_buffer;
        TANGUY.pink_noise.buffer = TANGUY.empty_pink_noise_buffer;
        TANGUY.blue_noise.buffer = TANGUY.empty_blue_noise_buffer;
        TANGUY.purple_noise.buffer = TANGUY.empty_purple_noise_buffer;
        break;
    case 'blue':
        TANGUY.blue_noise.buffer = TANGUY.blue_noise_buffer;
        TANGUY.white_noise.buffer = TANGUY.empty_white_noise_buffer;
        TANGUY.pink_noise.buffer = TANGUY.empty_pink_noise_buffer;
        TANGUY.red_noise.buffer = TANGUY.empty_red_noise_buffer;
        TANGUY.purple_noise.buffer = TANGUY.empty_purple_noise_buffer;
        break;
    case 'purple':
        TANGUY.purple_noise.buffer = TANGUY.purple_noise_buffer;
        TANGUY.white_noise.buffer = TANGUY.empty_white_noise_buffer;
        TANGUY.pink_noise.buffer = TANGUY.empty_pink_noise_buffer;
        TANGUY.red_noise.buffer = TANGUY.empty_red_noise_buffer;
        TANGUY.blue_noise.buffer = TANGUY.empty_blue_noise_buffer;
        break;
    }
});

//LFO CONTROLS
$('#lfo-sin, #lfo-tri, #lfo-rmp, #lfo-saw, #lfo-sqr').change(function () {
    switch (this.value) {
    case 'sawtooth':
        TANGUY.program.lfo.shape = 'sawtooth';
        TANGUY.program.mod.direction = -1;
        break;
    case 'ramp':
        TANGUY.program.lfo.shape = 'sawtooth';
        TANGUY.program.mod.direction = 1;
        break;
    case 'sine':
    case 'triangle':
    case 'square':
        TANGUY.program.lfo.shape = this.value;
        TANGUY.program.mod.direction = 1;
        break;
    }
    TANGUY.lfo.type = TANGUY.program.lfo.shape;
    TANGUY.calculate_lfo();
});
$('#lfo-rate').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.lfo.rate = (this.value * this.value) * 100;
        TANGUY.lfo.frequency.value = (this.value * this.value) * 100;
    });
}).mouseup(TANGUY.stop_tweaking);
$('#lfo-pitch').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.lfo.pitch_amt = this.value;
        TANGUY.calculate_lfo('pitch');
    });
}).mouseup(TANGUY.stop_tweaking);
$('#lfo-filter').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.lfo.filter_amt = this.value;
        TANGUY.calculate_lfo('filter');
    });
}).mouseup(TANGUY.stop_tweaking);
$('#lfo-amp').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.lfo.amp_amt = this.value;
        TANGUY.calculate_lfo('amp');
    });
}).mouseup(TANGUY.stop_tweaking);

//DELAY CONTROLS
$('#delay-rate').mousedown(function () {
    var delay = [TANGUY.delay1, TANGUY.delay2, TANGUY.delay3, TANGUY.delay4],
        i;
    $(this).mousemove(function () {
        TANGUY.program.delay.rate = this.value * 2;
        for (i = 0; i < delay.length; i += 1) {
            delay[i].delayTime.value = this.value * 2;
        }
    });
}).mouseup(TANGUY.stop_tweaking);
$('#delay-amount').mousedown(function () {
    var delay = [TANGUY.delay1_vca, TANGUY.delay2_vca, TANGUY.delay3_vca, TANGUY.delay4_vca],
        i;
    $(this).mousemove(function () {
        TANGUY.program.delay.amt = this.value * this.value;
        for (i = 0; i < delay.length; i += 1) {
            delay[i].gain.value = this.value * this.value;
        }
    });
}).mouseup(TANGUY.stop_tweaking);

//MIXER CONTROLS
$('#osc1-mix').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.mixer.osc1 = this.value;
        TANGUY.osc1_vca.gain.value = TANGUY.program.mixer.osc1;
    });
}).mouseup(TANGUY.stop_tweaking);
$('#osc2-mix').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.mixer.osc2 = this.value;
        TANGUY.osc2_vca.gain.value = TANGUY.program.mixer.osc2;
    });
}).mouseup(TANGUY.stop_tweaking);
$('#noise-mix').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.mixer.noise = this.value;
        TANGUY.noise_vca.gain.value = TANGUY.program.mixer.noise;
    });
}).mouseup(TANGUY.stop_tweaking);

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
            TANGUY.lp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime, 0.08);
            TANGUY.lp_filter2.frequency.setTargetAtTime((TANGUY.program.filter.frequency / 2), TANGUY.voice1.currentTime, 0.08);
            break;
        case 'bp':
            TANGUY.bp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime, 0.08);
            TANGUY.bp_filter2.frequency.setTargetAtTime(TANGUY.program.filter.frequency * 0.9, TANGUY.voice1.currentTime, 0.08);
            TANGUY.bp_filter3.frequency.setTargetAtTime(TANGUY.program.filter.frequency * 1.1, TANGUY.voice1.currentTime, 0.08);
            break;
        case 'hp':
            TANGUY.hp_filter1.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime, 0.08);
            TANGUY.hp_filter2.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime, 0.08);
            break;
        case 'notch':
            TANGUY.notch1.frequency.setTargetAtTime(TANGUY.program.filter.frequency, TANGUY.voice1.currentTime, 0.08);
            TANGUY.notch2.frequency.setTargetAtTime(TANGUY.program.filter.frequency * 0.9, TANGUY.voice1.currentTime, 0.08);
            TANGUY.notch3.frequency.setTargetAtTime(TANGUY.program.filter.frequency * 1.1, TANGUY.voice1.currentTime, 0.08);
            break;
        }
    });
}).mouseup(TANGUY.stop_tweaking);
$('#resonance').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.filter.resonance = (this.value * this.value) * 1000;
        switch (TANGUY.program.filter.mode) {
        case 'lp':
            TANGUY.lp_filter1.Q.setTargetAtTime(TANGUY.program.filter.resonance / 82, TANGUY.voice1.currentTime, 0.01);
            TANGUY.lp_filter2.Q.setTargetAtTime(TANGUY.program.filter.resonance / 123, TANGUY.voice1.currentTime, 0.01);
            break;
        case 'bp':
            TANGUY.bp_filter2.gain.setTargetAtTime(TANGUY.program.filter.resonance / 82, TANGUY.voice1.currentTime, 0.01);
            TANGUY.bp_filter3.gain.setTargetAtTime(TANGUY.program.filter.resonance / 82, TANGUY.voice1.currentTime, 0.01);
            break;
        case 'hp':
            TANGUY.hp_filter1.Q.setTargetAtTime(TANGUY.program.filter.resonance / 82, TANGUY.voice1.currentTime, 0.01);
            TANGUY.hp_filter2.Q.setTargetAtTime(TANGUY.program.filter.resonance / 123, TANGUY.voice1.currentTime, 0.01);
            break;
        case 'notch':
            TANGUY.notch2.gain.setTargetAtTime(TANGUY.program.filter.resonance / -21, TANGUY.voice1.currentTime, 0.01);
            TANGUY.notch3.gain.setTargetAtTime(TANGUY.program.filter.resonance / -21, TANGUY.voice1.currentTime, 0.01);
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

//VCA CONTROLS
$('#vca-attack').change(function () {
    TANGUY.program.vca.attack = parseFloat(this.value);
});
$('#vca-decay').change(function () {
    TANGUY.program.vca.decay = this.value;
});
$('#vca-sustain').change(function () {
    TANGUY.program.vca.sustain = this.value;
});
$('#vca-release').change(function () {
    TANGUY.program.vca.release = this.value;
});
$('#vca-gain').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.vca.gain = this.value * this.value;
        TANGUY.vca.gain.setTargetAtTime(TANGUY.program.vca.gain, TANGUY.voice1.currentTime, 0.01);
    });
}).mouseup(TANGUY.stop_tweaking);

//OCTAVE SHIFT BUTTONS
$('.octave-shift-down').click(function () {
    TANGUY.shift_octave(-1);
});
$('.octave-shift-up').click(function () {
    TANGUY.shift_octave(1);
});

//PORTAMENTO CONTROLS
$('#portamento-amount').change(function () {
    TANGUY.program.portamento.amt = parseFloat(this.value);
});
$('#portamento-off, #portamento-linear, #portamento-exponential').change(function () {
    TANGUY.program.portamento.mode = this.value;
});

//PITCH WHEEL
$('#pitch-bend').mousedown(function () {
    var osc1 = [TANGUY.osc1_saw, TANGUY.osc1_sqr, TANGUY.osc1_tri, TANGUY.osc1_sin],
        i;
    $(this).mousemove(function () {
        for (i = 0; i < osc1.length; i += 1) {
            osc1[i].detune.setTargetAtTime(TANGUY.osc1_pitch + (this.value * 100), TANGUY.voice1.currentTime, 0.2);
        }
        TANGUY.osc2.detune.setTargetAtTime(TANGUY.osc2_pitch + (this.value * 100), TANGUY.voice1.currentTime, 0.2);
    }).mouseup(function () {
        $(this).val(0).unbind('mousemove');
        for (i = 0; i < osc1.length; i += 1) {
            osc1[i].detune.setTargetAtTime(TANGUY.osc1_pitch + (this.value * 100), TANGUY.voice1.currentTime, 0.2);
        }
        TANGUY.osc2.detune.setTargetAtTime(TANGUY.osc2_pitch + (this.value * 100), TANGUY.voice1.currentTime, 0.2);
    });
});

//MOD WHEEL
$('#mod-amount').mousedown(function () {
    $(this).mousemove(function () {
        TANGUY.program.mod.amt = this.value;
        TANGUY.calculate_lfo();
    });
}).mouseup(TANGUY.stop_tweaking);

//MULTI-SWITCHES
$('.horizontal-multi-switch label input, .vertical-multi-switch label input').click(function () {
    TANGUY.multi_switch(this);
});

//LOAD PROGRAMS FROM SELECT BOX
$('#program-selector').change(function () {
    TANGUY.load_program(this.value);
    $(this).blur();
});

//TARGET KEYBOARD CLICKS
$('#keyboard button').mousedown(TANGUY.gate_on).mouseup(TANGUY.gate_off);

$(document).keypress(function (key) {
    switch (key.which) {
    case 45:
        TANGUY.shift_octave(-1);
        break;
    case 43:
    case 61:
        TANGUY.shift_octave(1);
        break;
    case 42:
        TANGUY.save_program();
        break;
    }
}).keydown(function (key) {
    if (TANGUY.key_down === false) {
        TANGUY.key_active = key.which;
        TANGUY.key_down = true;
        switch (key.which) {
        case 65:
            $('#c1').trigger('mousedown').addClass('playing');
            break;
        case 83:
            $('#d1').trigger('mousedown').addClass('playing');
            break;
        case 68:
            $('#e1').trigger('mousedown').addClass('playing');
            break;
        case 70:
            $('#f1').trigger('mousedown').addClass('playing');
            break;
        case 71:
            $('#g1').trigger('mousedown').addClass('playing');
            break;
        case 72:
            $('#a1').trigger('mousedown').addClass('playing');
            break;
        case 74:
            $('#b1').trigger('mousedown').addClass('playing');
            break;
        case 75:
            $('#c2').trigger('mousedown').addClass('playing');
            break;
        case 76:
            $('#d2').trigger('mousedown').addClass('playing');
            break;
        case 186:
            $('#e2').trigger('mousedown').addClass('playing');
            break;
        case 222:
            $('#f2').trigger('mousedown').addClass('playing');
            break;
        case 87:
            $('#cs1').trigger('mousedown').addClass('playing');
            break;
        case 69:
            $('#ds1').trigger('mousedown').addClass('playing');
            break;
        case 84:
            $('#fs1').trigger('mousedown').addClass('playing');
            break;
        case 89:
            $('#gs1').trigger('mousedown').addClass('playing');
            break;
        case 85:
            $('#as1').trigger('mousedown').addClass('playing');
            break;
        case 79:
            $('#cs2').trigger('mousedown').addClass('playing');
            break;
        case 80:
            $('#ds2').trigger('mousedown').addClass('playing');
            break;
        case 221:
            $('#fs2').trigger('mousedown').addClass('playing');
            break;
        }
    }
}).keyup(function (key) {
    if (key.which === TANGUY.key_active) {
        TANGUY.key_down = false;
        switch (key.which) {
        case 65:
            $('#c1').trigger('mouseup').removeClass('playing');
            break;
        case 83:
            $('#d1').trigger('mouseup').removeClass('playing');
            break;
        case 68:
            $('#e1').trigger('mouseup').removeClass('playing');
            break;
        case 70:
            $('#f1').trigger('mouseup').removeClass('playing');
            break;
        case 71:
            $('#g1').trigger('mouseup').removeClass('playing');
            break;
        case 72:
            $('#a1').trigger('mouseup').removeClass('playing');
            break;
        case 74:
            $('#b1').trigger('mouseup').removeClass('playing');
            break;
        case 75:
            $('#c2').trigger('mouseup').removeClass('playing');
            break;
        case 76:
            $('#d2').trigger('mouseup').removeClass('playing');
            break;
        case 186:
            $('#e2').trigger('mouseup').removeClass('playing');
            break;
        case 222:
            $('#f2').trigger('mouseup').removeClass('playing');
            break;
        case 87:
            $('#cs1').trigger('mouseup').removeClass('playing');
            break;
        case 69:
            $('#ds1').trigger('mouseup').removeClass('playing');
            break;
        case 84:
            $('#fs1').trigger('mouseup').removeClass('playing');
            break;
        case 89:
            $('#gs1').trigger('mouseup').removeClass('playing');
            break;
        case 85:
            $('#as1').trigger('mouseup').removeClass('playing');
            break;
        case 79:
            $('#cs2').trigger('mouseup').removeClass('playing');
            break;
        case 80:
            $('#ds2').trigger('mouseup').removeClass('playing');
            break;
        case 221:
            $('#fs2').trigger('mouseup').removeClass('playing');
            break;
        }
    }
});