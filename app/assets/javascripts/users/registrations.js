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
    var inputField = $('#user_' + field);
    var errorDiv = $('.invalid_' + field);
    var fieldWithError = inputField.parent('.field_with_errors');

    if(fieldWithError && fieldWithError.length > 0) {
        fieldWithError.find('.message').text(message);
    } else if(errorDiv && errorDiv.length > 0) {
        errorDiv.html(message);
    } else {
        $('<div class="error-message invalid_'+ field + '">' + message + '</div>').insertAfter(inputField);
    }
}

function clearProfileError(field) {
    var errorField = $('#user_' + field);
    var errorDiv = $('.invalid_' + field);
    var fieldWithError = errorField.parent('.field_with_errors');

    if(fieldWithError && fieldWithError.length > 0) {
        fieldWithError.find('.message').text("");
    } else if(errorDiv && errorDiv.length > 0) {
        errorDiv.text("");
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