$(function () {
    var _Service = abp.services.app.singlePage;
    var _$modal = $('#modalEdit');
    var _$form = _$modal.find('form');
    var ue = UE.getEditor('Content', {
        //initialFrameWidth: 860,
        initialFrameHeight: 500,
        scaleEnabled: true
    });
    var tree = $('#tree'),
    _menuTree = abp.appPath + 'NavigationMenus/Tree?isActive=true&type=0';

    load_Tree();
    Global.initImgUpload({ server: '/SinglePages/UploadImg' }, $('#filePicker'), $('#fileList'), $("#Picture"));

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15,// Creates a dropdown of 15 years to control year
        dateFormat: "yyyy-MM-dd"
    });

    //初始化表单验证
    Global.initFormValidate(_$form, {
        rules: {    //设置要验证的字段
            Title: { required: true, maxlength: 50 },
            Introduce: { required: true,maxlength:120 },
            //Picture: { required: true },
            //Content: { required: true }
        },
        messages: {//设置对应的错误信息
            //Title: { required: abp.localization.localize("Required", "Mdevc") },
            Introduce: { required: abp.localization.localize("Required", "PrepareData") },
            //Picture: { required: abp.localization.localize("Required", "Mdevc") },
            //Content: { required: abp.localization.localize("Required", "Mdevc") }
        },
        submitHandler: function (form) {

            var model = _$form.serializeFormToObject();
            model.IsPublish = $('#IsPublish').is(':checked') ? 1 : 0;
            //debugger;
            //var ids = tree.jstree('get_selected');
            ////if (ids.length > 1) {
            ////    abp.message.info("不能选择多个栏目！！！");
            ////    return false;
            ////} else {
            //    model.NavigationMenuId = ids[0] == -1 ? null : ids[0];
            ////}
            abp.ui.setBusy(_$modal);
            var opt = model.Id == "0" ? _Service.createSinglePageAndGetId(model) : _Service.update(model);
            opt.done(function () {
                _$modal.closeModal();
                location.href = abp.appPath + "SinglePages/SinglePageIndex";
                $(".query_btn").click();
            }).always(function () {
                abp.ui.clearBusy(_$modal);
            });

        }

    });

    //初始化树
    function load_Tree() {
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
                    },
                }).bind('click.jstree', function (e) {
                    var eventNodeName = e.target.nodeName;
                    if (eventNodeName == 'INS') {
                        return;
                    } else if (eventNodeName == 'A') {
                        //选择的id值
                        var id = $(e.target).parents('li').attr('id');
                        if (id < 1) {
                            load_Tree();
                        }else{
                            $("#NavigationMenuId").val(id);
                        }
                    }
                });
            }
        }
    });
        };
    ////var ue = UE.getEditor('Content');
    //$list = $('#fileList');
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