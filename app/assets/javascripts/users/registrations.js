function validateProfile() {
    var data = {};
    var email = $('#user_email');
    var username = $('#user_username');

    if(email.length > 0){
        data = {
            username: username.val(),
            email: email.val()
        }
    } else {
        data = {
            username: username.val()
        }
    }

    $.ajax('/profile_validation', {
        dataType: 'script',
        data: data
    })
}

function setProfileError(field, message) {
    var inputField = '#user_' + field;
    var errorDiv = '.invalid_' + field;

    if($(inputField).parent('.field_with_errors') && $(inputField).parent('.field_with_errors').length > 0) {
        $(inputField).parent('.field_with_errors').find('.message').text(message);
    } else if($(errorDiv) && $(errorDiv).length > 0) {
        $(errorDiv).html(message);
    } else {
        $('<div class="error-message invalid_'+ field + '">' + message + '</div>').insertAfter(inputField);
    }
}

function clearUsernameError() {
    var usernameField = $('#user_username');
    var usernameErrorDiv = usernameField.parent('.field_with_errors');

    if(usernameErrorDiv && usernameErrorDiv.length > 0) {
        usernameErrorDiv.find('.message').text("");
    } else if($('.invalid_username') && $('.invalid_username').length > 0) {
        $('.invalid_username').text("");
    }
}

function clearEmailError() {
    var emailField = $('#user_email');
    var emailErrorDiv = emailField.parent('.field_with_errors');

    if(emailErrorDiv && emailErrorDiv.length > 0) {
        emailErrorDiv.find('.message').text("");
    } else if($('.invalid_email') && $('.invalid_email').length > 0) {
        $('.invalid_email').text("");
    }
}

$(document).on('input', '#editUserModal #user_username, #editUserModal #user_email', function () {
    validateProfile()
});

$(document).on('click', '#editUserModal .change-password', function () {
    $("#newpass").toggle();
    $("#newpasscof").toggle();
});

$(document).on('change', '#editUserModal #user_avatar', function (e) {
    var file = e.target.files[0];
    var preview = $('.preview');
    var reader = new FileReader();

    reader.addEventListener('load', function () {
        var image = new Image();
        image.src = reader.result;
        image.style = "width: 200px;";
        preview.html(image);
    }, false);

    if(file) {
        reader.readAsDataURL(file);
    }
});