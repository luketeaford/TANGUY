//LOAD PROGRAM CONTROLS
$('#program-selector').change(function () {
    TANGUY.load_program(this.value);
    $(this).blur();
});