// Floating form labels
$(document).ready(function() {
    $('.floating-label').each(function() {
        if ($(this).find('input').val() || $(this).find('.email-ids').length) {
            $(this).addClass('has-value');
        }
    });
});
$('.floating-label input').on('blur', function(e) {
    if ($(this).val() != '' || $(this).parent().find('.email-ids').length) {
        $(this).parents('.floating-label').addClass('has-value');
    } else {
        $(this).parents('.floating-label').removeClass('has-value');
    }
});
$('.floating-label').on('focus', 'input, select', function(e) {
    $(this).parents('.floating-label').addClass('focused');
});
$('.floating-label').on('blur', 'input, select', function(e) {
    $(this).parents('.floating-label').removeClass('focused');
});
// Icons
feather.replace()
    // Get user current timezone
$(document).ready(function() {
    $('#botTimeZone').val(Intl.DateTimeFormat().resolvedOptions().timeZone);
});
// Date picker
var d = new Date();
var placeholderDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
$('.datepicker').datepicker({
    autoclose: true,
    todayHighlight: true,
    startDate: '+1d'
});
$(".datepicker").on("changeDate", function(e) {
    saveDraft('deliveryDate', $(this).val());
    $('#deliveryDate').blur();
    $('#leadDeliveryEmail').focus();
});
$(document).ready(function() {
    document.getElementById('deliveryDate').placeholder = placeholderDate;
});
// Multi email field
$('#leadDeliveryEmail').on('keydown blur', function(e) {
    if (e.keyCode == 13 || e.keyCode == 32 || e.keyCode == 9 || e.keyCode == 188 || e.keyCode == 186 || e.type == 'blur') {
        var getValue = $(this).val();
        if (getValue != '') {
            e.preventDefault();
        }
        if (isEmail(getValue)) {
            $('#allemails').append('<span class="email-ids">' + getValue + ' <span class="cancel-email"><i data-feather="x"></i></span></span>');
            feather.replace()
            $(this).val('');
            $(this).parents('.email-field').find('.invalid-feedback').removeClass('show');
            saveDraft('leadDeliveryEmail', $('#allemails').html());
        } else if (getValue !== '') {
            $(this).parents('.email-field').find('.invalid-feedback').addClass('show');
        } else {
            $(this).parents('.email-field').find('.invalid-feedback').removeClass('show');
        }
    }
});
// Eyes
$("body").mousemove(function(event) {
    var eye = $(".eye");
    var x = (eye.offset().left) + (eye.width() / 2);
    var y = (eye.offset().top) + (eye.height() / 2);
    var rad = Math.atan2(event.pageX - x, event.pageY - y);
    var rot = (rad * (180 / Math.PI) * -1) + 180;
    eye.css({
        '-webkit-transform': 'rotate(' + rot + 'deg)',
        '-moz-transform': 'rotate(' + rot + 'deg)',
        '-ms-transform': 'rotate(' + rot + 'deg)',
        'transform': 'rotate(' + rot + 'deg)'
    });
});
// Delete email entry
$(document).on('click', '.cancel-email', function() {
    $(this).parent().remove();
    saveDraft('leadDeliveryEmail', $('#allemails').html());
    $('.email-field input').focus();
});
// Email validation
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}