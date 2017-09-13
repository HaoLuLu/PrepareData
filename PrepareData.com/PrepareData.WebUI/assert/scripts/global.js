var Global = function () {
    //abp.appPath = 'http://117.78.52.105:88';
    abp.appPath = 'http://localhost:61814';
    var tenid = null;
    return {
        init: function () {
            //window.location.href = abp.appPath + "/Account/Login";
            $("#login").attr("href", abp.appPath + "/Account/Login");
            //$('.top-pushpin').pushpin({ top: $('.top-pushpin').offset().top });
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
                   var html = '<li ' + (selected ? 'class="active"' : '') + ' ><a class="waves-effect waves-light" href="javascript:location.reload();">网站首页</a></li>';
                   if (result && result.id == -1 && result.children.length > 0) {
                       $.each(result.children, function (index, item) {
                           if (item.children && item.children.length > 0) {
                               html += '<li ' + (item.id == selected ? 'class="active"' : '') + ' ><a class="dropdown-button waves-effect waves-light" href="#!" data-hover="true" data-belowOrigin="true" data-activates="dropdown' + item.id + '">' + item.text + '</a></li>';
                               var dropdown = '<ul id="dropdown' + item.id + '" class="dropdown-content">';
                               $.each(item.children, function (i, v) {
                                   dropdown += '<li><a class="waves-effect waves-light page-type-' + v.type + '" href="' + v.id + '">' + v.text + '</a></li><li class="divider"></li>';
                               });
                               dropdown += '</ul>';
                               $('body').append(dropdown);
                           } else {
                               html += '<li ' + (item.id == selected ? 'class="active"' : '') + ' ><a class="waves-effect waves-light page-type-' + item.type + '" href="' + item.id + '">' + item.text + '</a></li>';
                           }
                       });
                       $("#nav-mobile").append(html);
                       $(".dropdown-button").dropdown({ hover: true, alignment: 'bottom', belowOrigin: true });
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
                    switch (value.name) {
                        case "name":
                            $("#data-name").text(value.text);
                            break;
                        case "logo":
                            $("#data-logo").attr("src", abp.appPath + value.text);
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
                var html = '<div class="col s12 l12">';
                html += '<div class="list-panel">';
                //html += '<div class="truncate">';
                //html += '<div class="row list-title">';//
                //html += '<h4 class="truncate"><a href="' + result.navId + '"> ' + result.nav + '</a></h4>';//
                //html += '<div class="divider"></div>';
                //html += '</div>';
                //html += '<div class="card-content list-content">';
                //html += '<div class="first-item clearfix">';
                //if (result.picture)
                //    html += '<div class="item-img left"><img class="responsive-img materialboxed" data-caption="' + result.title + '" src="' + abp.appPath + result.picture + '" /></div>';
                //html += '<a href="#!" >';//class="list-item"
                html += '<div class="row">';
                html += '<h5 class="center">' + result.title + '</h5>';
                html += '<span class="grey-text text-lighten-1 right">' + result.date + '</span>';
                html += '</div>';
                //html += '</a>';
                html += '<div class="crol-text">';
                html += '<div>' + result.content + '</div>';
                //html += '</div></div>';
                html += '</div></div></div>';
                $("#data-content").html(html);

                $(".crol-text").find("img").each(function (i, v) {
                    $(v).attr("src", abp.appPath + $(v).attr("src"));
                    $(v).css("max-width", "98%");
                });
                Materialize.fadeInImage("#data-content > div");
                return false;
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
                    $("#data-content").html(Global.load_Article_Style_1(result[0].items));
                } else {
                    $.each(result, function (index, value) {
                        var style = Global.load_Article_Style_1;
                        if (index % 2 === 1) {
                            style = Global.load_Article_Style_2;
                        }
                        $("#data-content").append(style(value.items));
                    });
                }
                Materialize.fadeInImage("#data-content > div");
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
                var html = '<div class="col s12 l12"><div class="list-panel">';
                html += '<div class="list-title">';
                html += '<h4 class="truncate"><a class="page-type-1" href="' + result.navId + '"> ' + result.nav + '</a></h4>';
                html += '<div class="divider"></div></div>';
                html += '<a href="#!" class="list-item"><h5 class="center"> ' + result.title + '</h5></a>';
                html += '<div class="center"> <div class="chip">更新时间：' + result.date + '</div>';
                html += '<div class="chip">来源：' + result.source + '</div>';
                html += ' <div class="chip">关键词：' + result.keywords + '</div>';
                html += '<div class="chip">作者：' + result.author + '</div></div>';
                html += '<div class="card-content list-content">';
                html += '<div class="first-item clearfix">';
                //if (result.picture)
                //    html += '<div class="item-img left"><img class="responsive-img materialboxed" data-caption="' + result.title + '" src="' + abp.appPath + result.picture + '" /></div>';
                html += '<div class="crol-text"><div>' + result.content + '</div>';
                html += '</div></div>';
                html += '</div></div></div>';
                $("#data-content").html(html);
                $(".crol-text").find("img").each(function (i, v) {
                    $(v).attr("src", abp.appPath + $(v).attr("src"));
                    $(v).css("max-width", "98%");
                });
                Materialize.fadeInImage("#data-content > div");
                return false;
            });
        },
        load_Article_Style_1: function (obj) {
            var html = '<div class="col s12 l12"><div class="list-panel">';
            html += '<div class="list-title">';
            html += '<h4 class="truncate"><a class="page-type-1" href="' + obj[0].navId + '"><i class="fa fa-fighter-jet"></i> ' + obj[0].nav + '</a></h4>';
            html += '<div class="divider"></div></div>';
            html += '<div class="card-content list-content">';
            $.each(obj, function (index, item) {
                if (index == 0) {
                    html += '<div class="first-item clearfix">';
                    if (item.picture)
                        html += '<div class="item-img left"><img class="responsive-img materialboxed" data-caption="' + item.title + '" src="' + abp.appPath + item.picture + '" /></div>';
                    html += '<a href="' + item.id + '" class="list-item page-type-art"><span class="item-text"> ' + item.title;
                    html += item.isTop ? '<span class="badge red">置顶</span>' : '';
                    html += '</span><span class="grey-text text-lighten-1 right">' + item.date + '</span></a>';
                    html += '<div class="crol-text"><p class="small grey-text text-lighten-1">' + item.introduce + '…</p>';
                    html += '</div></div><div class="row"><div class="collection list-coll">';
                } else {
                    html += '<a href="' + item.id + '" class="collection-item list-item col s12 l6 page-type-art">';
                    html += '<span class="grey-text text-lighten-1">[' + item.date + ']</span><span class="item-text truncate">' + item.title;
                    html += item.isTop ? '<span class="badge red">置顶</span>' : '';
                    html += '</span></a>';
                }
            });
            html += '</div></div></div></div></div>';
            return html;
        },
        load_Article_Style_2: function (obj) {
            var html = '<div class="col s12 l12"><div class="list-panel">';
            html += '<div class="list-title">';
            html += '<h4 class="truncate"><a class="page-type-1" href="' + obj[0].navId + '"><i class="fa fa-fighter-jet"></i> ' + obj[0].nav + '</a></h4>';
            html += '<div class="divider"></div></div>';
            html += '<div class="card-content list-content">';
            $.each(obj, function (index, item) {
                html += '<div class="col s12 l4"><div class="card hoverable small">';
                if (item.picture)
                    html += '<div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + abp.appPath + item.picture + '"></div>';
                html += '<div class="card-content card-home"><span class="card-title activator grey-text text-darken-4">' + item.title;
                html += ' </span><p><a class="page-type-art" href="' + item.id + '">查看更多</a></p></div>';
                html += '<div class="card-reveal card-home"><span class="card-title grey-text text-darken-4">' + item.title + '<i class="fa fa-remove right"></i></span>';
                html += '<p>' + item.introduce + '</p></div></div></div>';
            });
            html += '</div></div></div></div>';
            return html;
        },
        load_TenantGroups: function (ajaxParams) {
            var apiUrl = abp.appPath + '/api/services/app/TenantGroup/GetTenantGroupsInfo';
            //var apiUrl = abp.appPath + '/api/services/app/Tenant/GetTenantsInfo';
            abp.ajax($.extend({
                url: apiUrl,
                type: 'POST',
                data: JSON.stringify({})
            }, ajaxParams)).done(function (result) {
                if (!result || result.length < 1)
                    return;
                $("#data-tenantGroups").append(Global.html_TenantGroups(result.items));
                $.each(result.items, function (index, item) {
                    Global.load_Tenants({
                        data: JSON.stringify({ id: item.id })
                    }, item.id);
                });
            });
        },
        html_TenantGroups: function (data) {
            var html = '';
            $.each(data, function (index, item) {
                html += '<div class="row">';
                html += '<h5 class="center tenant-group-name">' + item.name + '</h5>'
                html += '<div class="col s12 l8 data-group' + item.id + '"></div>';
                html += '<div class="col s12 l4 data-msg' + item.id + '"></div>';
                html += '<div class="row more">';
                html += '<div class="progress">';
                html += '<div class="determinate arrow-left"></div>';
                html += '</div>';
                html += '<a class="btn-floating btn-large waves-effect waves-light">更多</a>';
                html += '<div class="progress ">';
                html += '<div class="determinate arrow-right"></div>';
                html += '</div>';
                html += '</div></div>';
            });
            return html;
        },
        load_Tenants: function (ajaxParams, id) {
            var apiUrl = abp.appPath + '/api/services/app/Tenant/GetTenantsInfo';
            abp.ajax($.extend({
                url: apiUrl,
                type: 'POST',
                data: JSON.stringify({})
            }, ajaxParams)).done(function (result) {
                if (!result || result.length < 1)
                    return;
                $(".data-group" + id).append(Global.html_tenants(result));
                $(".data-msg" + id).append(Global.html_msgs(result));
            });
        },
        html_tenants: function (data) {
            var html = '';
            html += '<div class="tenantGroup"><ul class="center hide-on-med-and-down">';
            $.each(data, function (index, result) {
                html += '<li><div class="card"><div class="card-image"><a href="/layout/' + result.template + '/index.html?tenid=' + result.id + '"><img src="' + abp.appPath + result.picture + '"><span class="truncate">' + result.name + '</span></a></div></div></li>';
            });
            html += '</ul></div>';
            return html;
        },
        html_msgs: function (data) {
            var html = '';
            if (data.length > 0) {
                html += '<ul class="collapsible" data-collapsible="accordion">';
                html += '<li>';
                html += '<div class="collapsible-header"><i class="fa fa-commenting-o small"></i>First</div>';
                html += '<div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>';
                html += '</li>';
                html += '<li>';
                html += '<div class="collapsible-header"><i class="fa fa-commenting-o small"></i>Second</div>';
                html += '<div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>';
                html += '</li>';
                html += '<li>';
                html += '<div class="collapsible-header"><i class="fa fa-commenting-o small"></i>Third</div>';
                html += '<div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>';
                html += '</li>';
                html += '</ul>';
                html += '</div>';
            }
            return html;
        }

    }

}();
