TANGUY.update_noise_color = function () {
    'use strict';
    switch (TANGUY.program.noise_color) {
    case 'white':
        TANGUY.white_noise.connect(TANGUY.noise_vca);
        TANGUY.pink_noise.disconnect();
        TANGUY.red_noise.disconnect();
        TANGUY.blue_noise.disconnect();
        TANGUY.purple_noise.disconnect();
        break;
    case 'pink':
        TANGUY.white_noise.disconnect();
        TANGUY.pink_noise.connect(TANGUY.pink_noise_filter1);
        TANGUY.red_noise.disconnect();
        TANGUY.blue_noise.disconnect();
        TANGUY.purple_noise.disconnect();
        break;
    case 'red':
        TANGUY.white_noise.disconnect();
        TANGUY.pink_noise.disconnect();
        TANGUY.red_noise.connect(TANGUY.noise_vca);
        TANGUY.blue_noise.disconnect();
        TANGUY.purple_noise.disconnect();
        break;
    case 'blue':
        TANGUY.white_noise.disconnect();
        TANGUY.pink_noise.disconnect();
        TANGUY.red_noise.disconnect();
        TANGUY.blue_noise.connect(TANGUY.noise_vca);
        TANGUY.purple_noise.disconnect();
        break;
    case 'purple':
        TANGUY.white_noise.disconnect();
        TANGUY.pink_noise.disconnect();
        TANGUY.red_noise.disconnect();
        TANGUY.blue_noise.disconnect();
        TANGUY.purple_noise.connect(TANGUY.noise_vca);
        break;
    }
    return;
};
