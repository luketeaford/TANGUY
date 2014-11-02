TANGUY.shift_octave = function (direction) {
    if (direction > 0 && TANGUY.octave_shift < 2) {
        TANGUY.octave_shift += 1;
    } else if (direction < 0 && TANGUY.octave_shift > -2) {
        TANGUY.octave_shift -= 1;
    }
    switch (TANGUY.octave_shift) {
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
}