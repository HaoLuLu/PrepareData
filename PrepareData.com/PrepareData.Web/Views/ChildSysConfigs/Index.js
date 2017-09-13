(function () {
    var ratio = window.devicePixelRatio || 1,// 优化retina, 在retina下这个值是2
        // 缩略图大小
        thumbnailWidth = 90 * ratio,
        thumbnailHeight = 90 * ratio,
        checks = [],
        _service = abp.services.app.childSysConfig;

    $(function () {
        $.extend(WebUploader.Uploader.options, {
            auto: true,// 选完文件后，是否自动上传。
            disableGlobalDnd: true,
            swf: (window.applicationPath === "" ? "" : window.applicationPath || "../../") + '/Script/Uploader.swf',// swf文件路径
            server: '/ChildSysConfigs/UploadImg',// 文件接收服务端。
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            fileNumLimit: 1,//验证文件总数量, 超出则不允许加入队列。
            accept: {   //只允许选择图片
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png'
                //,mimeTypes: 'image/*'
            }
        });
        $('input[name="Checks"]:checked').each(function () {
            checks.push($(this).val());
        });
        Materialize.updateTextFields();
        $('.materialize-textarea').characterCounter();

        $(".text-config").on("blur", function () {
            saveConfig($(this).parents("form"));
        });
        $(".isshow-config").on("change", function () {
            saveConfig($(this).parents("form"), { IsShow: _$this.is(':checked') });
        });
        $(".radio-config").on("change", function () {
            var thisform = $(this).parents("form"),
                thisCheckedText = $('input[name="Value"]:checked', thisform).parent().text().trim();
            thisCheckedValue = $('input[name="Value"]:checked', thisform).val();
            saveConfig(thisform, { Text: thisCheckedText, Value: thisCheckedValue });
        });
        $(".checkbox-config").on("change", function () {
            var cheked = $(this).val();
            var index = $.inArray(cheked, checks);
            index < 0 ? checks.push(cheked) : checks.splice(index, 1);
            saveConfig($(this).parents("form"), { Checks: checks });
        });
        $(".file-picker").each(function () {
            var _$this = $(this),
                _$list = _$this.prev(),
                _$input = _$this.next();
            if (_$list.children().length < 1)
                _$this.css("display", "block");
            initImgUpload(_$this, _$list, _$input);
        });

        //执行删除方法
        $(document).on("click", ".del", function () {
            var _$list = $(this).parent().parent(),
                _$upBtn = _$list.next(),
                _$input = _$upBtn.next();
            saveConfig(_$input.parents("form"));
        });
    });

    function saveConfig(form, option) {
        if (!form || form.length < 1)
            return false;
        var model = form.serializeFormToObject();
        model.IsShow = $('input[name="IsShow"]', form).is(':checked');
        if (option)
            model = $.extend(model, option);
        _service.update(model).done(function (result) {
            abp.log.debug(result);
        });
    }

    function initImgUpload(upbtn, list, input) {
        var uploader = WebUploader.create({
            pick: upbtn
        });
        uploader.on('fileQueued', function (file) {
            var $li = $('<div id="' + file.id + '" class="cp_img">' +
                        '<img>' +
                    '<div class="cp_img_jian"></div></div>'),
                $img = $li.find('img');

            // $list为容器jQuery实例
            list.append($li);

            // 创建缩略图
            // 如果为非图片文件，可以不用调用此方法。
            // thumbnailWidth x thumbnailHeight 为 100 x 100
            uploader.makeThumb(file, function (error, src) {
                if (error) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }
                $img.attr('src', src);
            }, thumbnailWidth, thumbnailHeight);
            upbtn.css("display", "none");
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function (file, percentage) {
            var $li = $('#' + file.id),
                $percent = $li.find('.progress span');
            if (!$percent.length) {// 避免重复创建
                $percent = $('<p class="progress"><span></span></p>')
                        .appendTo($li)
                        .find('span');
            }
            $percent.css('width', percentage * 100 + '%');
        });
        //发送前
        uploader.on('uploadBeforeSend', function (object, data, headers) {
            data.lastModifiedDate = moment(data.lastModifieddate).format('L');
            headers[abp.security.antiForgery.tokenHeaderName] = abp.security.antiForgery.getToken();
        });
        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on('uploadSuccess', function (file, response) {
            input.val(response.result);
            $('#' + file.id).addClass('upload-state-done');
            var _$form = input.parents("form");
            saveConfig(input.parents("form"));
        });

        // 文件上传失败，显示上传出错。
        uploader.on('uploadError', function (file) {
            var $li = $('#' + file.id),
                $error = $li.find('div.error');
            if (!$error.length) {// 避免重复创建
                $error = $('<div class="error"></div>').appendTo($li);
            }
            $error.text('上传失败');
        });

        // 完成上传完了，成功或者失败，先删除进度条。
        uploader.on('uploadComplete', function (file) {
            $('#' + file.id).find('.progress').remove();
        });
    }

})();
