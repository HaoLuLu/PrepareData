var Global = function () {
    //abp.appPath = 'http://117.78.52.105:88';
    abp.appPath = 'http://localhost:61814';
    var tenid = null;
    return {
        init: function () {
            //$("#login").attr("href", abp.appPath + "/Account/Login");
            //sigle page
            $(document).on("click", ".page-type-0", function (e) {
                if (e && e.preventDefault) //阻止默认浏览器动作(W3C)
                    e.preventDefault();
                var _$this = $(this);
                //$("#data-backimg").parent().remove();
                Global.load_Sige_Page({
                    data: JSON.stringify({
                        id: _$this.attr("href")
                    })
                });
                return false;
            });
            $(document).on("click", ".page-type-1", function (e) {
                if (e && e.preventDefault) //阻止默认浏览器动作(W3C)
                    e.preventDefault();
                var _$this = $(this);
                //$("#data-backimg").parent().remove();
                Global.load_ArticleList({
                    id: _$this.attr("href")
                }, {}, true);
                return false;
            });
            $(document).on("click", ".page-type-art", function (e) {
                if (e && e.preventDefault) //阻止默认浏览器动作(W3C)
                    e.preventDefault();
                var _$this = $(this);
                //$("#data-backimg").parent().remove();
                Global.load_Article_Page({
                    data: JSON.stringify({
                        id: _$this.attr("href")
                    })
                });
                return false;
            });
            var ten = Global.getQueryObject();
            tenid = ten.tenid
        },
        //将url的查询参数解析成字典对象
        getQueryObject: function (url) {
            //将url的查询参数解析成字典对象
            url = url == null ? location.search : url; //获取url中"?"符后的字串
            var urlParams = {};
            var match,
                pl = /\+/g,  // Regex for replacing addition symbol with a space
                search = /([^&=]+)=?([^&]*)/g,
                decode = function (s) {
                    return decodeURIComponent(s.replace(pl, " "));
                },
                query = url.substring(1);
            while (match = search.exec(query))
                urlParams[decode(match[1])] = decode(match[2]);
            return urlParams;
        },
        load_Menu: function (selected) {
            var apiUrl = abp.appPath + '/api/NavigationMenus/Tree?tenantId=' + tenid;
            $.getJSON(apiUrl)
               .done(function (data) {
                   var result = data.result;
                   if (result && result.id == -1 && result.children.length > 0) {
                       var html = '';
                       html += '<li class="active"' + ' ><a href="javascript:location.reload();"><i class="home"></i>首页</a></li>'
                       $.each(result.children, function (index, item) {
                           if (item.children && item.children.length > 0) {
                               html += ' <li class="openmenu ' + (item.id == selected ? 'activex' : '" id="' + item.id + '"') + ' ><a href="#" class="hvr-underline-from-left"><i class="picture1"></i>' + item.text + '</a>'
                               html += '<ul class="nav navbar-nav child" style="display:none" id="child' + item.id + '">'
                               $.each(item.children, function (i, v) {  //
                                   html += ' <li' + (item.id == selected ? 'class="active"' : '') + ' ><a href="' + v.id + '" class="hvr-underline-from-left page-type-' + v.type + '"><i class="glyphicon glyphicon-chevron-right"></i>' + v.text + '</a></li>'
                               });
                               html += '</ul>'
                               html += '</li>';
                           } else {
                               html += '<li class="' + (item.id == selected ? 'activex' : '" id="' + item.id + '"') + ' ><a href="' + item.id + '" class="hvr-underline-from-left page-type-' + item.type + '"><i class="picture1"></i>' + item.text + '</a>';
                           }
                       });
                       $("#nav-menu").append(html);
                   }
               })
            .fail(function (jqXHR, textStatus, err) {
                abp.log.error('Error: ' + err);
            });
        },
        load_Configs: function (ajaxParams) {
            var apiUrl = abp.appPath + '/api/services/app/childSysConfig/GetShowConfigs?tenantId=' + tenid;
            abp.ajax($.extend({
                url: apiUrl,
                type: 'POST',
                data: JSON.stringify({})
            }, ajaxParams)).done(function (result) {
                $.each(result, function (index, value) {
                    switch (value.name.replace(/^\s+|\s+$/g, "")) {
                        case "name":
                            $("#data-name").text(value.text);
                            $("#data-title").text(value.text);
                            break;
                        case "logo":
                            $("#data-logo").attr("src", abp.appPath + value.text);
                            break;
                        case "briefing":
                            $("#data-us").text(value.text);
                            break;
                        case "backimg":
                            $("#data-backimg").attr("src", abp.appPath + value.text);
                            break;
                        case "sige":
                            Global.load_Sige({ data: JSON.stringify({ id: value.value }) });
                            break;
                        case "article":
                            Global.load_ArticleList({ "id": value.text });
                            break;
                    }
                });
            });
        },
        load_Sige: function (ajaxParams) {
            var apiUrl = abp.appPath + '/api/services/app/SinglePage/GetHomeSigeInfo?tenantId=' + tenid;
            abp.ajax($.extend({
                url: apiUrl,
                type: 'POST',
                data: JSON.stringify({})
            }, ajaxParams)).done(function (result) {
                if (!result)
                    return;
                $("#data-sige-title").text(result.nav);
                $("#data-sige-img").attr("src", abp.appPath + result.picture);
                $("#data-sige-introduce").text(result.introduce);
            });
        },
        load_Sige_Page: function (ajaxParams) {
            var apiUrl = abp.appPath + '/api/services/app/SinglePage/GetSigePageInfo?tenantId=' + tenid;
            abp.ajax($.extend({
                url: apiUrl,
                type: 'POST',
                data: JSON.stringify({})
            }, ajaxParams)).done(function (result) {
                if (!result)
                    return;
                var html = '';
                //<!-- single -->
                html += '<div class="single">';
                html += '<ol class="breadcrumb">';
                //html += '<li><a href="#">首页</a></li>';
                //html += '<li><a href="#">新闻中心</a></li>';
                //html += '<li><a href="#">医改热点</a></li>';
                html += '<li class="active"><a href="' + result.navId + '" class="page-type-0">' + result.nav + '</a></li>';
                html += '</ol>';
                html += '<h3 align="center">' + result.title + '</h3>';
                html += '<p align="right" class="single-page-date">发表于： <span>' + result.date + '</span></p>';
                html += '<div class="data-text">' + result.content + '</div>';
                html += '</div>';
                //<!-- //single -->
                $("#data-right-page").html('<div id="data-page"></div>');
                $("#data-page").html(html);

                $(".data-text").find("img").each(function (i, v) {
                    $(v).attr("src", abp.appPath + $(v).attr("src"));
                    $(v).css("max-width", "98%");
                    $(v).addClass("img-responsive");
                });
                return false;
            });
        },
        load_Article_Page: function (ajaxParams) {
            var apiUrl = abp.appPath + '/api/services/app/Article/GetArticlePage?tenantId=' + tenid;
            abp.ajax($.extend({
                url: apiUrl,
                type: 'POST',
                data: JSON.stringify({})
            }, ajaxParams)).done(function (result) {
                if (!result)
                    return;
                var html = '';
                html += '<div class="single">';
                html += '<ol class="breadcrumb">';
                //html += '<li><a href="#">首页</a></li>';
                //html += '<li><a href="#">新闻中心</a></li>';
                //html += '<li><a href="#">医改热点</a></li>';
                html += '<li class="active"><a href="' + result.navId + '" class="page-type-1">' + result.nav + '</a></li>';
                html += '</ol>';

                html += '<h3 align="center">' + result.title + '</h3>';
                html += '<p align="right" class="single-page-date">来源：' + result.source + ' 关键词：' + result.keywords + ' 作者：' + result.author + ' 发表于： <span>' + result.date + '</span></p>';
                html += '<div class="data-text">' + result.content + '</div>';
                html += '</div>';
                //<!-- //single -->
                $("#data-right-page").html('<div id="data-page"></div>');
                $("#data-page").html(html);
                $(".data-text").find("img").each(function (i, v) {
                    $(v).attr("src", abp.appPath + $(v).attr("src"));
                    $(v).css("max-width", "98%");
                });
                return false;
            });
        },

        load_Sliders: function (ajaxParams) {
            var apiUrl = abp.appPath + '/api/services/app/FriendLink/GetHomeLinks?type=1&tenantId=' + tenid;
            abp.ajax($.extend({
                url: apiUrl,
                type: 'POST',
                data: JSON.stringify({})
            }, ajaxParams))
               .done(function (result) {
                   if (!result)
                       return;
                   var html = '';
                   $.each(result, function (index, item) {
                       html += '<article class="article">'
                       html += '<div class="banner-wrap" >'
                       html += ' <a href="http://' + item.url + '" target="_blank">'
                       html += ' <img src="' + abp.appPath + item.picture + '" title="' + item.name + '"/>'
                       html += ' </a>'
                       html += '</div>'
                       html += '</article>'

                   });
                   $("#banner").append(html);
                   $('.example1').wmuSlider();
               })
            .fail(function (jqXHR, textStatus, err) {
                abp.log.error('Error: ' + err);
            });
        },
        load_FriendLink: function (ajaxParams) {
            var apiUrl = abp.appPath + '/api/services/app/FriendLink/GetHomeLinks?type=0&tenantId=' + tenid;
            abp.ajax($.extend({
                url: apiUrl,
                type: 'POST',
                data: JSON.stringify({})
            }, ajaxParams))
               .done(function (result) {
                   if (!result)
                       return;
                   var html = '';
                   html += '友情链接：'
                   $.each(result, function (index, item) {
                       html += '<a href="http://' + item.url + '" target="_blank">' + item.name + '</a>'
                   });
                   $("#links").append(html);
               })
            .fail(function (jqXHR, textStatus, err) {
                abp.log.error('Error: ' + err);
            });
        },

        load_ArticleList: function (input, ajaxParams, isHtml) {
            var apiUrl = abp.appPath + '/api/services/app/Article/GetHomeArticleList?tenantId=' + tenid;
            abp.ajax($.extend({
                url: apiUrl,
                type: 'POST',
                data: JSON.stringify(input)
            }, ajaxParams)).done(function (result) {
                if (!result || result.length < 1)
                    return;
                if (isHtml) {
                    $("#data-right-page").html('<div id="data-page"></div>');
                    $("#data-page").html(Global.load_Article_Style_2(result));
                } else {
                    var style1 = Global.load_Article_Style_1;
                    var style3 = Global.load_Article_Style_3;

                    $("#accordion").append(style1(result));//热点新闻
                    $("#data-content").append(style3(result));
                }
            });
        },
        //热点新闻
        load_Article_Style_1: function (result) {
            var html = '';
            var i = 0;
            $.each(result, function (index, value) {
                $.each(value.items, function (index, item) {
                    if (item.isTop === true) {
                        i++;
                        if (i > 3) {
                            return false;
                        }
                        if (i === 1) {
                            html += '<div class="panel panel-default">';
                            html += '<div class="panel-heading" role="tab" id="heading' + item.id + '">';
                            html += ' <h4 class="panel-title truncate">';
                            html += ' <a role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="true" aria-controls="' + item.id + '" href="#' + item.id + '">';
                            html += item.title;
                            html += ' </a>';
                            html += ' </h4>';
                            html += '</div>';
                            html += '<div id="' + item.id + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading' + item.id + '">';
                            html += '<div class="panel-body">';
                            html += '<a href="' + item.id + '" class="page-type-art" >' + item.introduce.substring(0, 40) + '</a>';
                            html += '</div>';
                            html += '</div>';
                            html += '</div>';
                        } else {
                            html += '<div class="panel panel-default">';
                            html += ' <div class="panel-heading" role="tab" id="headingTwo">';
                            html += '<h4 class="panel-title truncate">';
                            html += '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#' + item.id + '" aria-expanded="false" aria-controls="' + item.id + '">';
                            html += item.title;
                            html += '</a>';
                            html += '</h4>';
                            html += '</div>';
                            html += '<div id="' + item.id + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">';
                            html += '<div class="panel-body">';
                            html += '<a href="' + item.id + '" class="page-type-art" >' + item.introduce.substring(0, 40) + '</a>';
                            html += ' </div>';
                            html += '</div>';
                            html += '</div>';
                        }
                    }
                });
            });
            return html;
        },
        //栏目下文章列表
        load_Article_Style_2: function (result) {
            var html = '';
            $.each(result, function (index, value) {
                //<!-- single -->
                html += '<div class="single">';
                html += '<ol class="breadcrumb">';
                //html += '<li><a href="#">首页</a></li>';
                //html += '<li><a href="#">新闻中心</a></li>';
                html += '<li class="active"><a href="' + value.items[0].navId + '" class="page-type-1">' + value.items[0].nav + '</a></li>';
                html += '</ol>';
                html += '<div class="bs-example">';
                html += '<table class="table" id="tables">';
                html += '<tbody>';
                $.each(value.items, function (index, item) {
                    html += ' <tr>';
                    html += '<td><h3><a class="anchorjs-link page-type-art" href="' + item.id + '"><span class="anchorjs-icon">' + item.title + '</span></a></h3></td>';
                    html += '<td class="type-info" align="right">' + item.date + '</td>';
                    html += '</tr>';
                });
                html += '</tbody>';
                html += '</table>';
                html += '</div>';
                html += '</div>';
                //<!-- //single -->
            });
            return html;
        },
        //
        load_Article_Style_3: function (result) {
            var html = '';
            var html2 = '';
            
            $.each(result, function (index, value) {
                if (index === 0) {
                    $.each(value.items, function (index, item) {
                        if (index > 2) {
                            return false;
                        }
                        html += '<div class="col-md-4 banner-left page-type-art" href="' + item.id + '">';
                        html += '<div class="col-xs-3 banner-left1">';
                        html += '<img src="' + abp.appPath + item.picture + '" style="width:50px;height:50px;"/>';
                        html += '</div>';
                        html += '<div class="col-xs-9 banner-right1">';
                        html += '<h3 class="truncate">' + item.title + '</h3>';
                        html += '</div>';
                        html += '<div class="clearfix"></div>';
                        html += '<p class="truncate">' + item.introduce + '</p>';
                        html += '</div>';
                    });

                    $("#banner-bottom").append(html);

                } else if (index === 1) {
                    $.each(value.items, function (index, item) {
                        if (index > 2) {
                            return false;
                        }
                        html2 += '<div class="col-md-4 msg-text-bottom-left">';
                        html2 += '<figure class="effect-winston">';
                        html2 += '<a href="' + item.id + '" class="page-type-art">';
                        html2 += '<img src="' + abp.appPath + item.picture + '" class="img-responsive" />';
                        html2 += '<figcaption></figcaption>';
                        html2 += '</a>';
                        html2 += '</figure>';
                        html2 += '<h3><a class="page-type-art truncate" href="' + item.id + '">' + item.title + '</a></h3>';
                        html2 += '<p>'+item.introduce+'</p>';
                        html2 += '</div>';
                    });
                    $("#msg-text-bottom").append(html2);

                }
            });
        },
    }

}();
