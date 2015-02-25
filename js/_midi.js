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
        var n = event.data[1];

        switch (event.data[0]) {
        case TANGUY.midi.messages.listen:
            break;
        case TANGUY.midi.messages.note_on:
            // Some MIDI controllers send 0 velocity intead of note_off
            if (event.data[2] >= 1) {
                TANGUY.gate_on(event);
            } else {
                // Cheap MIDI controller note_off
                TANGUY.gate_off(event);
            }
            break;
        case TANGUY.midi.messages.note_off:
            TANGUY.gate_off(event);
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
