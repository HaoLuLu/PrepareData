(function () {
    $(function () {
        var _groupService = abp.services.app.tenantGroup;
        var _$modal = $('#modalEdit');
        var _$form = _$modal.find('form');
        var _$table = $("#datatable");
        var tableOption = {
            "ajax": {
                "url": abp.appPath + 'TenantGroups/List'
            },
            "columns": [
                { "data": "OrderBy" },
                { "data": "Name" },
                { "data": "EnglishName" },
                { "data": "IsActive", "render": function (data) { return data?"是":"否" } },
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

        Global.init(_groupService, function (formData) {
            if (formData) {
                Global.initFormData(formData);
                if (formData.isActive) {
                    $("#IsActive").attr("checked", "checked").val("true");
                } else {
                    $("#IsActive").removeAttr("checked").val("false");
                }
            }
        });

        Global.initFormValidate(_$form, {
            rules: {
                Name: { required: true }
            },
            submitHandler: function (form) {
                var model = _$form.serializeFormToObject();
                model.IsActive=$('#IsActive').is(':checked');
                abp.ui.setBusy(_$modal);
                var opt = model.Id == "0" ? _groupService.create(model) : _groupService.update(model);
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
})();