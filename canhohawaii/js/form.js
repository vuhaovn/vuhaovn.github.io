$(function () {
    $.validator.addMethod(
        "phoneFormat",
        function (value, element) {
            var re = /^\d{10,11}$/i;
            // valid if optional and empty OR if it passes the regex test
            return (this.optional(element) && value === "") || re.test(value);
        }
    );
    $("form").on("submit", function(){
      $('input[type="submit"]').attr('disabled','disabled');
      $('input[type="submit"]').prop('disabled', true);
    });
    $('form').validate({
        rules: {
            "name": {
                required: true,
                maxlength: 255
            },
            "phone": {
                required: true,
                phoneFormat: true
            },
            "email": {
                required: true,
                email: true,
                maxlength: 255
            },
        },
        messages: {
            "name": {
                required: "Hãy nhập tên của bạn",
                maxlength: "Không nhập quá 255 kí tự"
            },
            "phone": {
                required: "Hãy nhập số điện thoại của bạn",
                phoneFormat: "Số điện thoại hợp lệ 10 hoặc 11 chữ số liền nhau"
            },
            "email": {
                required: "Hãy nhập email của bạn",
                maxlength: "Không nhập quá 255 kí tự",
                email: "Email không hợp lệ"
            }
        },
        errorPlacement: function ($error, $element) {
            $element.parents('dl').find("div.error-message-show").first().text($($error).text());
        },
        success: function ($error) {
            $("form").find('.valid').parents('dl').find("div.error-message-show").first().text("");
        }
    });
});