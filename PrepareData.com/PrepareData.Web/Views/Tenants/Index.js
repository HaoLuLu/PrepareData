(function () {
    $(function () {
        var _tenantService = abp.services.app.tenant;
        var _groupService = abp.services.app.tenantGroup;
        var _$modal = $('#modalEdit');
        var _$form = _$modal.find('form');
        var _$table = $("#datatable");
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 ,// Creates a dropdown of 15 years to control year
            dateFormat: "yyyy-MM-dd"
        });

        var tableOption = {
            "ajax": {
                "url": abp.appPath + 'Tenants/List'
            },
            "columns": [
                { "data": "OrderBy" },
                { "data": "TenancyName" },
                { "data": "Name" },
                { "data": "Contact" },
                { "data": "ContactTel" },
                { "data": "E_Mail" },
                { "data": "Address" },
                { "data": "AuthorizedEndTime", "render": function (data) { return moment(data).format("YYYY-MM-DD") } },
                { "data": "IsHot", "render": function (data) { return data ? "是" : "否" } },
                { "data": "TenantGroup.Name" },
                { "data": "IsActive", "render": function (data) { return data ? "是" : "否" } },
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
        

        Global.init(_tenantService, function (formData) {
            if (formData) {
                Global.initFormData(formData);
                Global.initImgUpload({ server: '/Tenants/UploadImg' }, $('#filePicker'), $('#fileList'), $("#Picture"));
                Global.initImgPreview(formData);
                if (formData.isActive) {
                    $("#IsActive").attr("checked", "checked").val("true");
                } else {
                    $("#IsActive").removeAttr("checked").val("false");
                }
                if (formData.isHot) {
                    $("#IsHot").attr("checked", "checked").val("true");
                } else {
                    $("#IsHot").removeAttr("checked").val("false");
                }
                $("#AdminEmailAddress").val(formData.e_Mail);
                $("#AuthorizedEndTime").val(moment(formData.authorizedEndTime).format("YYYY-MM-DD"));
                load_Select_List(_groupService, $("#TenantGroup"), { seledtedId: (formData && formData.id) || "" });//加载列表
            }
        });
    
        Global.initFormValidate(_$form, {
            rules: {
                TenancyName: { required: true },
                Name: { required: true }
            },
            submitHandler: function (form) {
                var model = _$form.serializeFormToObject();
                model.IsActive = $('#IsActive').is(':checked');
                model.IsHot = $('#IsHot').is(':checked');
                abp.ui.setBusy(_$modal);
                var opt = model.Id == "0" ? _tenantService.createTenant(model) : _tenantService.update(model);
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

    //加载列表
    function load_Select_List(service, el, option) {
        option = $.extend({
            typeId: null,
            seledtedId: null
        }, option);
        service.getSelectList(option.typeId || "").done(function (result) {
            if (result && result.length > 0) {
                var html = '';
                $.each(result, function (index, value) {
                    html += '<option value="' + value.id + '" ' + (value.id == option.seledtedId ? "selected" : "") + '>' + value.text + '</option>';
                });
                el.empty().append(html).material_select();
            }
            else {
                el.append('').material_select();
            }
        });
    }


})();