$(function () {
    var _friendLinkService = abp.services.app.friendLink;
    var _$modal = $('#modalEdit');
    var _$form = _$modal.find('form');
    var _$table = $("#datatable");
    var tableOption = {
        "ajax": {
            "url": abp.appPath + 'FriendLinks/List'
        },
        "columns": [
            { "data": "OrderBy" },
            { "data": "Name" },
            { "data": "Url" },
            {
                "orderable": false,
                "data": "Id",
                "render": function (data, type, row) {
                    return Global.btnEdit(data) + " " + Global.btnDel(data);
                }
            }
        ]
    };
    var table = Global.initDataTables(_$table, tableOption);

    Global.init(_friendLinkService, function (formData) {
        if (formData) {
            Global.initFormData(formData);
            //初始化图片上传
            Global.initImgUpload({ server: '/FriendLinks/UploadImg' }, $('#filePicker'), $('#fileList'), $("#Picture"));
            //加载预览图片
            Global.initImgPreview(formData);
        }
    });

    Global.initFormValidate(_$form, {
        rules: {
            FriendLinkName: { required: true },
            FriendLinkUrl: { required: true }
        },
        submitHandler: function (form) {
            var model = _$form.serializeFormToObject();
            model.Type = 1;
            abp.ui.setBusy(_$modal);
            var opt = model.Id == "0" ? _friendLinkService.createFriendLinkAndGetId(model) : _friendLinkService.update(model);
            opt.done(function () {
                _$modal.closeModal();
                $(".query_btn").click();
            }).always(function () {
                abp.ui.clearBusy(_$modal);
            });
        }
    });

    $(".query_btn").on("click", function (e) {
        table.ajax.reload();
        e.preventDefault();
    });
});