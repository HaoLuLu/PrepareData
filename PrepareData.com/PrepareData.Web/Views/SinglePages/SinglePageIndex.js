(function () {
    $(function () {
        var _$table = $("#datatable");
        var _service = abp.services.app.singlePage;

        var tableOption = {
            "ajax": {
                "url": abp.appPath + 'SinglePages/List'
            },
            "columns": [
                { "data": "Title" },
                 { "data": "NavigationMenu.Name" },
                {
                    "orderable": false,
                    "data": "Id",
                    "render": function (data, type, row) {
                        debugger
                        return EditBtn(data) + " " + Global.btnDel(data);
                    }
                }
            ]
        };
        var table = Global.initDataTables(_$table, tableOption);

        Global.init(_service);

        $(".query_btn").on("click", function (e) {
            table.ajax.reload();
            e.preventDefault();
        });
    });

    function EditBtn(id) {
        return '<a class="btn-floating waves-effect waves-light teal margin-right-5" Title="编辑" href="' + abp.appPath + 'SinglePages/SinglePageDetail?Id=' + id + '" data-id="' + id + '" ><i class="fa fa-pencil"></i></a>';
    }
})();