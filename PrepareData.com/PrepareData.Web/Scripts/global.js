var Global = function () {
    var _service = {},
        ratio = window.devicePixelRatio || 1,// 优化retina, 在retina下这个值是2
        thumbnailWidth = 90 * ratio, // 缩略图大小
        thumbnailHeight = 90 * ratio;
    //显示删除按钮
    $(document).off("mouseover", ".cp_img").on("mouseover", ".cp_img", function () {
        $(this).children(".del").css('display', 'block');

    });
    //隐藏删除按钮
    $(document).off("mouseout", ".cp_img").on("mouseout", ".cp_img", function () {
        $(this).children(".del").css('display', 'none');
    });

    //执行删除方法
    $(document).on("click", ".del", function () {
        var _$list = $(this).parent().parent(),
            _$upBtn = _$list.next(),
            _$input = _$upBtn.next();
        _$list.empty();
        _$upBtn.css("display", "block");
        _$input.val("");
    });
    return {
        //删除按钮
        btnDel: function (id) {
            return '<a class="btn-floating waves-effect waves-light red margin-right-5 delete_btn customer-btn-a" Title="删除" href="javascript:;" data-id="' + id + '"><i class="fa fa-trash-o"></i></a>';
        },
        //编辑按钮
        btnEdit: function (id, model) {
            model = model || "modalEdit";
            return '<a class="btn-floating waves-effect waves-light teal margin-right-5 edit_btn customer-btn-a" Title="编辑" href="#' + model + '" data-id="' + id + '" ><i class="fa fa-pencil"></i></a>';
        },
        init: function (service, initModel) {
            var _service = service;
            initModel = initModel || function (formData) {
                if (formData) {
                    Global.initFormData(formData);
                }
            };
            //删除操作
            $(document).on('click', '.delete_btn', function (e) {
                var $btn = $(this),
                    id = $btn.data("id") || '';
                abp.message.confirm("确定要删除该条数据？", function (isConfirm) {
                    if (isConfirm) {
                        abp.ui.setBusy();
                        _service.cancel(id).done(function (result) {
                            $(".query_btn").click();
                        }).always(function () {
                            abp.ui.clearBusy();
                        });
                    }
                });
                e.preventDefault();
            });
            //编辑操作
            $(document).off('click', '.edit_btn').on('click', '.edit_btn', function (e) {
                var $btn = $(this),
                    _$modal = $($btn.attr("href")),
                   id = $btn.data("id") || -1;
                if (!_$modal.length)
                    abp.message.warn("表单 " + $btn.attr("href") + " 不存在！");
                _$modal.openModal({
                    dismissible: true, // Modal can be dismissed by clicking outside of the modal
                    opacity: .5, // Opacity of modal background
                    in_duration: 300, // Transition in duration
                    out_duration: 200, // Transition out duration
                    starting_top: '4%', // Starting top style attribute
                    ending_top: '10%', // Ending top style attribute
                    ready: function () {

                        abp.ui.setBusy(_$modal);
                        _service.getDetail({ "id": id }).done(initModel).always(function () {
                            abp.ui.clearBusy(_$modal);
                        });
                    },
                    //complete: function () { alert('Closed'); } // Callback for Modal close
                });
                e.preventDefault();
            });
        },
        //初始化表格控件
        initDataTables: function (el, options) {
            if ($.fn.DataTable) {
                return el.DataTable($.extend(true, {
                    "searching": false,
                    "processing": true,
                    "serverSide": true,
                    "ordering": false,
                    "language": {
                        "Processing": "处理中...",
                        "lengthMenu": "", //"每页 _MENU_ 条记录"
                        "zeroRecords": "没有找到记录",
                        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
                        "infoEmpty": "无记录",
                        "infoFiltered": "(从 _MAX_ 条记录过滤)",
                        "EmptyTable": "表中数据为空",
                        "LoadingRecords": "载入中...",
                        "paginate": {
                            "first": "首页",
                            "previous": '‹',
                            "next": '›',
                            "last": "末页"
                        },
                        "aria": {
                            "SortAscending": ": 以升序排列此列",
                            "SortDescending": ": 以降序排列此列",
                            "paginate": {
                                "previous": '上一页',
                                "next": '下一页'
                            }
                        }
                    },
                    //"data": result.items,
                    "ajax": {
                        "data": function (d) {
                            return $.extend({}, d, $(".query_form").serializeFormToObject());
                        },
                        "type": 'POST',
                        "headers": { "Content-Type": 'application/x-www-form-urlencoded' },
                        "cache": false,
                        "contentType": "application/json; charset=UTF-8",
                        "crossDomain": true,
                        "dataType": "json"
                    }
                }, options));
            }
        },
        //初始化表单数据
        initFormData: function (formData, form) {
            if (formData) {
                for (var pro in formData) {
                    if (typeof (formData[pro]) == "function")
                        continue;
                    var idName = pro.substring(0, 1).toUpperCase() + pro.substring(1);
                    if (form && form.length > 0) {
                        form.find("[name='" + idName + "']").val(formData[pro]).focus();
                    } else {
                        $("#" + idName).val(formData[pro]).focus();
                    }
                }
            }
        },
        //初始化表单验证控件
        initFormValidate: function (form, options) {
            if ($.fn.validate) {
                form = form || $("#formValidate");
                form.validate($.extend({}, {
                    errorElement: 'div', //default input error message container
                    errorClass: 'text-danger', // default input error message class
                    ignore: "",
                    rules: {
                        Name: { required: true }
                    },
                    highlight: function (element) {
                        $(element).addClass('invalid');
                    },
                    success: function (label, element) {
                        $(element).removeClass('invalid');
                        label.remove();
                    },
                    submitHandler: function (form) {
                        var _$modal = $('#modalEdit'),
                            formData = $(form).serializeFormToObject();
                        abp.ui.setBusy(_$modal);
                        var opt = Number(formData.Id) > 0 ? _service.update(formData) : _service.create(formData);
                        opt.done(function () {
                            _$modal.closeModal();
                            $(".query_btn").click();
                        }).always(function () {
                            abp.ui.clearBusy(_$modal);
                        });
                        return false;
                    }
                }, options));
            }
        },
        //初始化图片上传控件
        initImgUpload: function (options, upbtn, list, input) {
            /// <summary>初始化图片上传控件</summary>
            /// <param name="options" type="Object">配置参数</param>
            /// <param name="upbtn" type="Object">上传按钮jQuery实例</param>
            /// <param name="list" type="Object">文件列表容器jQuery实例</param>
            /// <param name="input" type="Object">存放图片路径jQuery实例</param>
            options = options || {};
            $.extend(WebUploader.Uploader.options, {
                auto: true,// 选完文件后，是否自动上传。
                disableGlobalDnd: true,
                swf: (window.applicationPath === "" ? "" : window.applicationPath || "../../") + '/Script/Uploader.swf',// swf文件路径
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                fileNumLimit: 1,//验证文件总数量, 超出则不允许加入队列。
                pick: upbtn,
                accept: {   //只允许选择图片
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
                }
            });
            var uploader = WebUploader.create(options);
            uploader.on('fileQueued', function (file) {
                var $li = $('<div id="' + file.id + '" class="cp_img">' +
                            '<img>' +
                        '<div class="cp_img_jian"></div></div>'),
                    $img = $li.find('img');

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
                if ('success' in options)
                    options.success();
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
        },

        //加载预览图片
        initImgPreview: function (formData) {
            if (formData.id > 0) {
                var $list = $('#fileList');
                //加载预览图片
                if (formData.picture != "" && formData.picture != null) {
                    //alert(formData.picture);
                    $list.empty();
                    var $li = $(
                    '<div id="' + formData.id + '" class="cp_img">' +
                        '<img>' +
                    '<div class="del"></div></div>'
                    ),
                    $img = $li.find('img');
                    // $list为容器jQuery实例
                    $list.append($li);
                    $img.attr('src', formData.picture);
                    $("#filePicker").css("display", "none");
                } else {
                    $list.empty();
                    $("#filePicker").css("display", "block");
                    $("#Picture").val("");
                }
            } else {
                $('#fileList').empty();
                $("#filePicker").css("display", "block");
                $("#Picture").val("");
            }
        },

        //将url的查询参数解析成字典对象
        getQueryObject: function (url) {
            //将url的查询参数解析成字典对象
            url = url == null ? location.search : url; //获取url中"?"符后的字串
            var urlParams = {};
            var match,
                pl = /\+/g,  // Regex for replacing addition symbol with a space
                search = /([^&=]+)=?([^&]*)/g,
                decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
                query = url.substring(1);
            while (match = search.exec(query))
                urlParams[decode(match[1])] = decode(match[2]);
            return urlParams;
        },
    }
}();