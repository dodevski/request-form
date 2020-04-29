// Save filled data to Draft localStorage
var inputs = document.querySelectorAll('input');
inputs.forEach(function(input) {
    input.addEventListener('blur', function(event) {
        if (event.target.id != 'leadDeliveryEmail') {
            saveDraft(event.target.id, event.target.value);
        }
    });
});
// Populate form with data from Draft localStorage
document.addEventListener("DOMContentLoaded", function() {
    var localDraft = JSON.parse(localStorage.getItem('formDraft')) || {};
    for (let [key, value] of Object.entries(localDraft)) {
        if (key == 'leadDeliveryEmail') {
            document.getElementById('allemails').innerHTML = value;
        } else {
            document.getElementById(key).value = value;
        }
    }
});
// Save Draft function
function saveDraft(key, value) {
    var localDraft = JSON.parse(localStorage.getItem('formDraft')) || {};
    localDraft[key] = value;
    localStorage.setItem('formDraft', JSON.stringify(localDraft));
    saveAnimation(key);
}
// Add submited data to localStorage
function SaveBot(event) {
    event.preventDefault();
    var localData = JSON.parse(localStorage.getItem('formData')) || [];
    var companyName = document.forms.OrderList.companyName.value;
    var companyPhone = document.forms.OrderList.companyPhone.value;
    var botName = document.forms.OrderList.botName.value;
    var botWebsite = document.forms.OrderList.botWebsite.value;
    var botTimeZone = document.forms.OrderList.botTimeZone.value;
    var deliveryDate = document.forms.OrderList.deliveryDate.value;
    var leadDeliveryEmail = [];
    var emails = document.querySelectorAll('.email-ids');
    emails.forEach(function(mail) {
        leadDeliveryEmail.push(mail.innerText.trim());
    });
    var sendSMS = document.forms.OrderList.sendSMS.value;
    var bilingual = document.forms.OrderList.bilingual.value;
    var billingName = document.forms.OrderList.billingName.value;
    var billingPhone = document.forms.OrderList.billingPhone.value;
    var billingAddress = document.forms.OrderList.billingAddress.value;
    var billingEmail = document.forms.OrderList.billingEmail.value;
    var data = {
        companyName: companyName,
        companyPhone: companyPhone,
        botName: botName,
        botWebsite: botWebsite,
        botTimeZone: botTimeZone,
        deliveryDate: deliveryDate,
        leadDeliveryEmail: leadDeliveryEmail,
        sendSMS: sendSMS,
        bilingual: bilingual,
        billingName: billingName,
        billingPhone: billingPhone,
        billingAddress: billingAddress,
        billingEmail: billingEmail
    }
    localData.push(data);
    localStorage.setItem('formData', JSON.stringify(localData));
    $('input').val('').blur();
    $('.email-ids').remove();
    localStorage.removeItem('formDraft');
    $('html, body').animate({
        scrollTop: $('#response').offset().top - 100
    }, 500);
    doShowAll();
}
// Delete order data from localStorage
function RemoveBot(orderIndex) {
    var localData = JSON.parse(localStorage.getItem('formData')) || [];
    localData.splice(orderIndex, 1);
    localStorage.setItem('formData', JSON.stringify(localData));
    doShowAll();
}
// Render data
function doShowAll() {
    if (CheckBrowser()) {
        var list = "";
        // Retrieve the data from storage
        var localData = JSON.parse(localStorage.getItem('formData')) || [];
        localData.forEach(listOrders);

        function listOrders(item, index) {
            list += "<tr>";
            list += "<td>" + (index + 1) + "</td><td>" + item.botWebsite + "</td><td>" + item.billingName + "</td><td>" + item.billingAddress + "</td><td>" + item.billingEmail + "</td>\n";
            list += "<td align='center'><span class='cancel-item' onclick='RemoveBot(\"" + index + "\")'><i data-feather='x-circle'></i></span></td></tr>\n";
        }
        // Bind the data to html table
        $('#list').html(list);
        feather.replace();
        if (localData.length) {
            $('.orders').show('slow');
            $('#addBot').addClass('another');
        } else {
            $('.orders').hide('slow');
            $('#addBot').removeClass('another');
            $('#response').empty();
        }
    }
}
// Save Draft animation
function saveAnimation(element) {
    if ($('#' + element).val() != '' || element == 'leadDeliveryEmail') {
        $('#' + element).after('<span class="save-animation"><i data-feather="save"></i> Draft saved</span>');
        feather.replace();
        $('.save-animation').animate({
            bottom: '20px',
            opacity: 1
        }, 700);
        setTimeout(function() {
            $('.save-animation').fadeOut('slow', function() {
                $('.save-animation').remove();
            });
        }, 1600);
    }
}
// Show the form response
function getResponse() {
    var response = JSON.parse(localStorage.getItem('formData'));
    $('#response').html('<code>' + JSON.stringify(response, null, 2) + '</code>');
    $('html, body').animate({
        scrollTop: $('#response').offset().top - 100
    }, 500);
}

function CheckBrowser() {
    if ('localStorage' in window && window['localStorage'] !== null) {
        return true;
    } else {
        return false;
    }
}
