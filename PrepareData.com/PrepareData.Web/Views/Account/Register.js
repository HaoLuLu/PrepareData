(function ($) {

    if (!$) {
        return;
    }

    $.validator.addMethod("customUsername", function (value, element) {
        if (value === $('input[name="EmailAddress"]').val()) {
            return true;
        }
        return !$.validator.methods.email.apply(this, arguments);
    }, abp.localization.localize("RegisterFormUserNameInvalidMessage", "PrepareData"));

    $(document).ready(function () {
        Global.initFormValidate($('.register-form'), {
            rules: {
                UserName: {
                    required: true,
                    customUsername: true
                }
            },
            submitHandler: function (form) {
                form.submit();
            }
        });
    });

})(jQuery);