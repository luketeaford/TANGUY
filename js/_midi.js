if (navigator.requestMIDIAccess) {
    TANGUY.midi = {
        messages: {
            listen: 254,
            note_on: 144,
            note_off: 128,
            pitch: 224,
            mod: 176,
            atouch: 208,
            program: 192
        },

        devices: [],

        get_devices: function () {
            'use strict';

            return navigator.requestMIDIAccess().then(function (midi) {
                var inputs = midi.inputs.entries(),
                    devices = [],
                    input;

                if (inputs.size === 0) {
                    console.log('There are no MIDI devices');
                } else {
                    TANGUY.start_synth();
                    console.dir(devices);
                }

                for (input = inputs.next(); input && !input.done; input = inputs.next()) {
                    devices.push(input.value[1]);
                }

                return devices;
            });
        }
    };

    TANGUY.midi.events = function (event) {
        'use strict';
        var n = event.data[1],
            // Sloppy way to enable legato (reappears in gate_on)...
            pos = Math.floor(n / 12) - 5,
            note_value = 100 * (n % 12) - 900;

        switch (event.data[0]) {
        case TANGUY.midi.messages.listen:
            break;
        case TANGUY.midi.messages.note_on:
            // Some MIDI controllers send 0 velocity intead of note_off
            if (event.data[2] >= 1) {
                if (TANGUY.playing.length === 0) {
                    TANGUY.gate_on(event);
                    TANGUY.playing.push(n);
                } else {
                    TANGUY.calculate_pitch(pos, note_value);
                    TANGUY.playing.push(n);
                }
            } else {
                TANGUY.playing.pop();
                if (TANGUY.playing.length) {
                    // Sloppy way to do this...
                    n = TANGUY.playing.sort()[TANGUY.playing.length - 1];// Set to highest key
                    pos = Math.floor(n / 12) - 5;
                    note_value = 100 * (n % 12) - 900;
                    TANGUY.calculate_pitch(pos, note_value);
                } else {
                    // Cheap MIDI controller sends 0 velocity
                    TANGUY.gate_off(event);
                }
            }
            break;
        case TANGUY.midi.messages.note_off:
            TANGUY.playing.pop();
            if (TANGUY.playing.length) {
                // Sloppy way to do this...
                n = TANGUY.playing.sort()[TANGUY.playing.length - 1];// Set to highest key
                pos = Math.floor(n / 12) - 5;
                note_value = 100 * (n % 12) - 900;
                TANGUY.calculate_pitch(pos, note_value);
            } else {
                TANGUY.gate_off(event);
            }
            break;
        case TANGUY.midi.messages.pitch:
            TANGUY.midi_pitch_bend();
            break;
        case TANGUY.midi.messages.mod:
            TANGUY.midi_mod_wheel();
            break;
        case TANGUY.midi.messages.atouch:
            TANGUY.aftertouch();
            break;
        case TANGUY.midi.messages.program:
            n = (event.data[1] > 0) ? 1 : -1;
            TANGUY.change_program(n);
            break;
        default:
            console.log('Unrecognized MIDI event', event);
            break;
        }
    };

    TANGUY.midi.get_devices().then(function (devices) {
        'use strict';
        var i = 0;
        TANGUY.midi.devices = devices;

        for (i; i < devices.length; i += 1) {
            TANGUY.midi.devices[i].onmidimessage = TANGUY.midi.events;
        }
    });
} else {
    console.log('Your browser does not support Web MIDI.');
}
