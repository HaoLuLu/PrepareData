(function () {
    
    $(function () {
        $('#LoginButton').click(function (e) {
            e.preventDefault();
            var data={
                tenancyName: $('#TenancyName').val(),
                usernameOrEmailAddress: $('#EmailAddressInput').val(),
                password: $('#PasswordInput').val(),
                rememberMe: $('#RememberMeInput').is(':checked'),
                returnUrlHash: $('#ReturnUrlHash').val()
            };
            if(!data.usernameOrEmailAddress){
                abp.notify.warn("请输入用户名");
                $('#EmailAddressInput').focus();
                return false;
            }
            if (!data.password) {
                abp.notify.warn("请输入密码");
                $('#PasswordInput').focus();
                return false;
            }
            abp.ui.setBusy(
                $('#LoginArea'),
                abp.ajax({
                    url: abp.appPath + 'Account/Login',
                    type: 'POST',
                    data: JSON.stringify(data)
                })
            );
        });

        $('a.social-login-link').click(function () {
            var $a = $(this);
            var $form = $a.closest('form');
            $form.find('input[name=provider]').val($a.attr('data-provider'));
            $form.submit();
        });

        $('#ReturnUrlHash').val(location.hash);

        //$('#LoginForm input:first-child').focus();
    });

    //得到焦点
    $("#PasswordInput").focus(function () {
        $("#left_hand").animate({
            left: "150",
            top: " -38"
        }, {
            step: function () {
                if (parseInt($("#left_hand").css("left")) > 140) {
                    $("#left_hand").attr("class", "left_hand");
                }
            }
        }, 2000);
        $("#right_hand").animate({
            right: "-64",
            top: "-38px"
        }, {
            step: function () {
                if (parseInt($("#right_hand").css("right")) > -70) {
                    $("#right_hand").attr("class", "right_hand");
                }
            }
        }, 2000);
    });
    //失去焦点
    $("#PasswordInput").blur(function () {
        $("#left_hand").attr("class", "initial_left_hand");
        $("#left_hand").attr("style", "left:100px;top:-12px;");
        $("#right_hand").attr("class", "initial_right_hand");
        $("#right_hand").attr("style", "right:-112px;top:-12px");
    });

})();