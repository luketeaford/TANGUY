//NOISE CONTROLS
$('#white-noise, #pink-noise, #red-noise, #blue-noise, #purple-noise').change(function () {
    'use strict';
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