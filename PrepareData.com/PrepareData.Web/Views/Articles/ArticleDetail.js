$(function () {
    var _Service = abp.services.app.article;
    var _$modal = $('#modalEdit');
    var _$form = _$modal.find('form');
    var tree = $('#tree'),
  _menuTree = abp.appPath + 'NavigationMenus/Tree';
    var ue = UE.getEditor('Content', {
        //initialFrameWidth: 860,
        initialFrameHeight: 500,
        scaleEnabled: true
    });
    //初始化树
    abp.ajax({
        url: _menuTree,
        type: 'POST',
        success: function (result) {
            if (result) {
                tree.jstree({
                    'plugins': ["wholerow", "types"], //出现选择框"checkbox",
                    'core': {
                        'data': result,
                        'themes': { "responsive": false },
                        'multiple': false,
                        'check_callback': true,
                    },
                    'types': {
                        'default': { 'icon': "fa fa-leaf" },
                        'root': { 'icon': "fa fa-folder-open" }
                    }
                }).bind('click.jstree', function (e) {
                    var eventNodeName = e.target.nodeName;
                    if (eventNodeName == 'INS') {
                        return;
                    } else if (eventNodeName == 'A') {
                        //选择的id值
                        $("#NavigationMenuId").val($(e.target).parents('li').attr('id'));
                    }
                });
            }
        }
    });
    //初始化图片上传
    Global.initImgUpload({ server: '/Articles/UploadImg' }, $('#filePicker'), $('#fileList'), $("#Picture"));
    //初始化表单验证
    Global.initFormValidate(_$form, {
        rules: {    //设置要验证的字段
            Title: { required: true },
            Introduce: { required: true },
            //Picture: { required: true },
            //Content: { required: true }
        },
        messages: {//设置对应的错误信息
            Title: { required: abp.localization.localize("Required", "PrepareData") },
            Introduce: { required: abp.localization.localize("Required", "PrepareData") },
            //Picture: { required: abp.localization.localize("Required", "Mdevc") },
            //Content: { required: abp.localization.localize("Required", "PrepareData")}
        },
        submitHandler: function (form) {
            var model = _$form.serializeFormToObject();
            model.IsCheck = $('#IsCheck').is(':checked') ? 1 : 0;
            model.IsTop = $('#IsTop').is(':checked') ? 1 : 0;
            if (ue.getContent() == null || ue.getContent() == "") {
                abp.message.info("请输入文章内容！！");
                return false;
            }

            abp.ui.setBusy(_$modal);
            var opt = model.Id == "0" ? _Service.createArticleAndGetId(model) : _Service.update(model);
            opt.done(function () {
                abp.message.success("保存成功！");
                _$modal.closeModal();
                location.href = abp.appPath + "Articles/ArticleIndex";
                $(".query_btn").click();
            }).always(function () {
                abp.ui.clearBusy(_$modal);
            });

        }

    });

    $list2 = $('#fileList2');
    $list2.on("click", ".del", function () {
        //var Id = $(this).parent().attr("id");
        //uploader.removeFile(uploader.getFile(Id, true));
        //$(this).parent().remove();
        //$list2.empty();
        $list2.remove();
        $("#filePicker").css("display", "block");
        $("#Picture").val("");
    });
    //显示删除按钮
    $(document).on("mouseover", ".cp_img", function () {
        $(this).children(".del").css('display', 'block');
    });
    //隐藏删除按钮
    $(document).on("mouseout", ".cp_img", function () {
        $(this).children(".del").css('display', 'none');
    });
});