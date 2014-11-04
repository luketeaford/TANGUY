TANGUY.shift_octave = function (direction) {
    'use strict';
    var lights = [
        $('#octave-minus-2'),
        $('#octave-minus-1'),
        $('#octave-plus-0'),
        $('#octave-plus-1'),
        $('#octave-plus-2')];

    if (direction > 0 && TANGUY.octave_shift < 2) {
        TANGUY.octave_shift += 1;
        lights[TANGUY.octave_shift + 2].addClass('lit');
        lights[TANGUY.octave_shift + 1].removeClass('lit');
    } else if (direction < 0 && TANGUY.octave_shift > -2) {
        TANGUY.octave_shift -= 1;
        lights[TANGUY.octave_shift + 2].addClass('lit');
        lights[TANGUY.octave_shift + 3].removeClass('lit');
    }

};

//OCTAVE SHIFT BUTTONS
$('#octave-shift').find('button').click(function () {
    'use strict';
    var direction = this.getAttribute('data-octave-shift');
    return TANGUY.shift_octave(direction);
});