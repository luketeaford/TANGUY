$(document).ready(function () {
    'use strict';
    TANGUY.build_synth();
    TANGUY.load_program('initialize');
    TANGUY.populate_programs();
    console.log('Update dammit');
});