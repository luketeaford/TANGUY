//PITCH WHEEL CONTROLS
$('#pitch-bend').mousedown(function () {
    var osc1 = [TANGUY.osc1_saw, TANGUY.osc1_sqr, TANGUY.osc1_tri, TANGUY.osc1_sin],
        i;
    $(this).mousemove(function () {
        for (i = 0; i < osc1.length; i += 1) {
            osc1[i].detune.setTargetAtTime(TANGUY.osc1_pitch + (this.value * 100), TANGUY.synth.currentTime, 0.2);
        }
        TANGUY.osc2.detune.setTargetAtTime(TANGUY.osc2_pitch + (this.value * 100), TANGUY.synth.currentTime, 0.2);
    }).mouseup(function () {
        $(this).val(0).unbind('mousemove');
        for (i = 0; i < osc1.length; i += 1) {
            osc1[i].detune.setTargetAtTime(TANGUY.osc1_pitch + (this.value * 100), TANGUY.synth.currentTime, 0.2);
        }
        TANGUY.osc2.detune.setTargetAtTime(TANGUY.osc2_pitch + (this.value * 100), TANGUY.synth.currentTime, 0.2);
    });
});