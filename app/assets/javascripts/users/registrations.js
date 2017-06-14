$(document).on('click', '#editUserModal .changepass', function () {
    $("#newpass").show();
    $("#newpasscof").show();
});

$(document).on('change', '#editUserModal #user_avatar', function (e) {
    var file = e.target.files[0];
    var preview = $('.preview');
    var reader = new FileReader();

    reader.addEventListener('load', function () {
        var image = new Image();
        image.src = reader.result;
        preview.html(image);
    }, false);

    if(file) {
        reader.readAsDataURL(file);
    }
});