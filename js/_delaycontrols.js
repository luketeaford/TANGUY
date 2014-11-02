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