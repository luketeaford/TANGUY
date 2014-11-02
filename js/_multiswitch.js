TANGUY.multi_switch = function (gizmo) {
    $(gizmo).parent().addClass('selected');
    $(gizmo).parent().siblings().removeClass('selected');
}