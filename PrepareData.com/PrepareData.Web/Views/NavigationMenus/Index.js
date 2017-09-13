(function () {
    $(function () {
        var _service = abp.services.app.navigationMenu;
        var _$modal = $('#modalEdit');
        var _$form = _$modal.find('form');
        var _$table = $("#datatable");
        var tree = $('#tree');

        load_Tree();

        var tableOption = {
            "ajax": {
                "url": abp.appPath + 'NavigationMenus/List'
            },
            "columns": [
                { "data": "OrderBy" },
                { "data": "Name" },
                { "data": "Parent.Name", "render": function (data) { return data == null ? "导航栏目" : data } },
                { "data": "Type", "render": function (data) { return data == 1 ? "文章" : "单页" } },
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

        Global.init(_service, function (formData) {
            if (formData) {
                Global.initFormData(formData);
                if (formData.isActive) {
                    $("#IsActive").attr("checked", "checked").val("true");
                } else {
                    $("#IsActive").removeAttr("checked").val("false");
                }
                if (formData.type == 1) {
                    $("#Type").attr("checked", "checked").val(1);
                } else {
                    $("#Type").removeAttr("checked").val(0);
                }
                if (formData.id > 0) {
                    if (formData.parentId != null) {
                        $("#parentName").val(formData.parent.name);
                        $("#parentIdc").val(formData.parentId);
                    } else {
                        $("#parentName").val("导航栏目");
                        $("#parentIdc").val(-1);
                    }
                }
            }
        });

        Global.initFormValidate(_$form, {
            rules: {
                Name: { required: true }
            },
            submitHandler: function (form) {
                var model = _$form.serializeFormToObject();
                model.IsActive = $('#IsActive').is(':checked');
                model.Type = $('#Type').is(':checked') ? 1 : 0;
                abp.ui.setBusy(_$modal);
                var opt = model.Id == "0" ? _service.create(model) : _service.update(model);
                opt.done(function () {
                    _$modal.closeModal();
                    $.jstree.destroy();
                    load_Tree();
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

        $("#add_doc").on("click", function (ee) {
            var ids = tree.jstree('get_selected');
            var text = tree.jstree('get_node', ids).text;
            if ($("#levelId").val() > 2) {
                abp.notify.info("只能添加两级栏目！！")
                return false;
            }
            if (text == null || ids == null) {
                abp.notify.info("请选择上级栏目！！")
                return false;
            }
            $("#parentIdc").val(ids);
            $("#parentName").val(text);
        });

        function load_Tree() {
            abp.ajax({
                url: abp.appPath + 'NavigationMenus/Tree',
                type: 'POST',
                success: function (result) {
                    if (result) {
                        tree.jstree({
                            'plugins': ["types", "contextmenu"], //
                            "contextmenu": {
                                "items": {
                                    "create": null,
                                    "rename": null,
                                    "remove": null,
                                    "ccp": null,
                                    //"add": {
                                    //    'icon': "fa fa-plus-circle",
                                    //    "label": "添加下级",
                                    //    "action": function (obj) {
                                    //        $("#add_doc").click();

                                    //        //var inst = jQuery.jstree.reference(obj.reference);
                                    //        //var clickedNode = inst.get_node(obj.reference);
                                    //        //alert("add operation--clickedNode's id is:" + clickedNode.id);
                                    //    }
                                    //}
                                }
                            },


                            'core': {
                                'data': result,
                                'themes': { "responsive": false }
                            },
                            'types': {
                                'default': { 'icon': "fa fa-file-text" },
                                '1': { 'icon': "fa fa-folder" },
                                'root': { 'icon': "fa fa-archive" },
                                'open': { 'icon': "fa fa-archive" }
                            }
                        }).bind('click.jstree', function (e) {
                            var eventNodeName = e.target.nodeName;
                            if (eventNodeName == 'INS') {
                                return;
                            } else if (eventNodeName == 'A') {
                                var $subject = $(e.target).parent();
                                //var id = tree.jstree('get_selected');
                                //$("#parentId").val(id);
                                $("#parentId").val($(e.target).parents('li').attr('id'));
                                $("#levelId").val($(e.target).parents('li').attr('aria-level'));
                                $(".query_btn").click();

                            }
                        });
                        //.bind('dblclick.jstree', function (e) {
                        //}).bind("open_node.jstree close_node.jstree", function (e, data) {
                        //    data.node.icon = 'open';
                        //});
                    }
                }
            });
        }
    });

})();