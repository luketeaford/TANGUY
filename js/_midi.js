TANGUY.MIDI = {
    messages: {
        NOTE_ON: 144,
        NOTE_OFF: 128,
        PITCH: 224,
        MOD: 176
    },

    devices: [],

    getDevices: function () {
        'use strict';

        return navigator.requestMIDIAccess().then(function (midiAccess) {

            var inputs = midiAccess.inputs.entries(),
                devices = [],
                input;

            if (inputs.size === 0) {
                return console.log('There are no MIDI devices');
            }

            for (input = inputs.next(); input && !input.done; input = inputs.next()) {
                devices.push(input.value[1]);
            }

            return devices;
        });
    }
};

TANGUY.MIDI.events = function (event) {
    'use strict';
    switch (event.data[0]) {
    case TANGUY.MIDI.messages.NOTE_ON:
        TANGUY.gate_on(event);
        break;
    case TANGUY.MIDI.messages.NOTE_OFF: 
        TANGUY.key_release('#c1');
        break;
    }
};

TANGUY.MIDI.getDevices().then(function(devices){
    'use strict';

    TANGUY.MIDI.devices = devices;

    var i = 0;

    for (i; i < devices.length; i+=1) {
        TANGUY.MIDI.devices[i].onmidimessage = TANGUY.MIDI.events;
    }
});

