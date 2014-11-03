TANGUY.shift_octave = function (direction) {
    var minus2 = $('#octave-minus-2'),
        minus1 = $('#octave-minus-1'),
        plus0 = $('#octave-plus-0'),
        plus1 = $('#octave-plus-1'),
        plus2 = $('#octave-plus-2');

    if (direction > 0 && TANGUY.octave_shift < 2) {
        TANGUY.octave_shift += 1;
    } else if (direction < 0 && TANGUY.octave_shift > -2) {
        TANGUY.octave_shift -= 1;
    }

    switch (TANGUY.octave_shift) {
    case -2:
        minus2.addClass('lit');
        minus1.removeClass('lit');
        break;
    case -1:
        minus2.removeClass('lit');
        minus1.addClass('lit');
        plus0.removeClass('lit');
        break;
    case 0:
        minus1.removeClass('lit');
        plus0.addClass('lit');
        plus1.removeClass('lit');
        break;
    case 1:
        plus0.removeClass('lit');
        plus1.addClass('lit');
        plus2.removeClass('lit');
        break;
    case 2:
        plus1.removeClass('lit');
        plus2.addClass('lit');
        break;
    }
};

//OCTAVE SHIFT BUTTONS
$('#octave-shift-down').click(function () {
    TANGUY.shift_octave(-1);
});
$('#octave-shift-up').click(function () {
    TANGUY.shift_octave(1);
});