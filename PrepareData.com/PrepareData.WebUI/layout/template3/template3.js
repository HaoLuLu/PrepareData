var Global = function () {
    //abp.appPath = 'http://117.78.52.105:88';
    abp.appPath = 'http://localhost:61814';
    var tenid = null;
    return {
        init: function () {
            $("#login").attr("href", abp.appPath + "/Account/Login");
            //sigle page
            $(document).on("click", ".page-type-0", function (e) {
                if (e && e.preventDefault) //阻止默认浏览器动作(W3C)
                    e.preventDefault();
                var _$this = $(this);
                $(".banner").css("display", "none")
                $(".main").css("display", "none")
                $(".p-box").css("display", "none")
                $(".gundong").css("display", "none")
                $(".jianjie").css("display", "none")
                
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
                $(".banner").css("display", "none")
                $(".main").css("display", "none")
                $(".p-box").css("display", "none")
                $(".gundong").css("display", "none")
                $(".jianjie").css("display", "none")
                Global.load_ArticleList({
                    id: _$this.attr("href")
                }, {}, true);
                return false;
            });
            $(document).on("click", ".page-type-art", function (e) {
                if (e && e.preventDefault) //阻止默认浏览器动作(W3C)
                    e.preventDefault();
                var _$this = $(this);
                $(".banner").css("display", "none")
                $(".main").css("display", "none")
                $(".p-box").css("display", "none")
                $(".gundong").css("display", "none")
                $(".jianjie").css("display", "none")
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
                       $.each(result.children, function (index, item) {
                           if (item.children && item.children.length > 0) {
                               html += ' <li ' + (item.id == selected ? 'class="now"' : '') + ' ><span class="v"><a href="#" class="about">' + item.text + '</a></span>'

                               html += '<div class="bg"><div class="b_link">';

                               $.each(item.children, function (i, v) {
                                   html += '<a href="' + v.id + '" class="page-type-' + v.type + '">' + v.text + '</a>';
                               });
                               html += '</div></div></li>';
                               //$('body').append(dropdown);
                           } else {
                               html += ' <li ' + (item.id == selected ? 'class="now"' : '') + ' ><span class="v"><a class="page-type-' + item.type + '" href="' + item.id + '">' + item.text + '</a></span></li>'
                           }
                       });
                       $("#nav-menu").append(html);
                       //$(".bg").dropdown({ hover: true, alignment: 'bottom', belowOrigin: true });
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
                            $("#data-title").text(value.text + '|千睿医蟹联盟');
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
                var html = '';
                html += '<div class="us">';
                html += '<div class="p_center">';
                html += '<div class="tit">';
                html += '<a class="page-type-1" href="' + result.navId + '"><h2>' + result.nav + '</h2></a>';
                html += '<div style="float:right;margin-bottom:5px;line-height: 3;font-size: 12px;">更新时间：' + result.date + '</div>';
                html += '</div>';
                html += '<div class="all_news_zh">';
                //html += '<div style = "font-size:18px;color:#606060;margin:0 auto;margin:10px 0 10px 0px;text-align:center;"><strong>' + result.title + '</strong></div>';
               
                html += '<div class="crol-text">' + result.content + '</div>';
                html += '</div>';
                html += '<div class="clear"></div>';
                html += '</div>';
                html += '</div>';
                $("#wrap-page").html(html);
                $(".crol-text").find("img").each(function (i, v) {
                    $(v).attr("src", abp.appPath + $(v).attr("src"));
                    $(v).css("max-width", "98%");
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
                html += '<div class="us">';
                html += '<div class="p_center">';
                html += '<div class="tit">';
                html += '<a class="page-type-1" href="' + result.navId + '"><h2>' + result.nav + '</h2></a>';
                html += '</div>';
                html += '<div class="all_news_zh">';
                html += '<div style = "font-size:18px;color:#606060;margin:0 auto;margin:10px 0 10px 0px;text-align:center;"><strong>' + result.title + '</strong></div>';
                html += '<div class="item">更新时间：' + result.date + '<span class="space" />来源：' + result.source + '<span class="space" />关键词：' + result.keywords + '<span class="space" />作者：' + result.author + '</div>';
                html += '<div class="crol-text">' + result.content + '</div>';
                html += '</div>';
                html += '<div class="clear"></div>';
                html += '</div>';
                html += '</div>';
                $("#wrap-page").html(html);
                $(".crol-text").find("img").each(function (i, v) {
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

                       html += ' <div class="image" id="image_' + item.id + '">'
                       html += ' <a href="http://' + item.url + '" target="_blank">'
                       html += ' <img src="' + abp.appPath + item.picture + '" title="' + item.name + '"/>'
                       html += ' </a>'
                       html += ' <div class="word"></div>'
                       html += ' </div>'
                   });
                   $("#banner").append(html);
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
                    $("#wrap-page").html(Global.load_Article_Style_2(result));
                } else {
                    var style1 = Global.load_Article_Style_1;
                    var style3 = Global.load_Article_Style_3;

                    $("#focus-news").append(style1(result));
                    $("#data-content").append(style3(result));
                }
            });
        },
        load_Article_Style_1: function (result) {
            var html = '';
            $.each(result, function (index, value) {
                $.each(value.items, function (index, item) {
                    if (item.isTop === true) {
                        html += '<li><a href="' + item.id + '" class="page-type-art" title="' + item.title + '">【' + item.nav + '】' + item.title + '</a><span>' + item.date + '</span></li>'
                    }
                });
            });
            return html;
        },
        load_Article_Style_2: function (result) {

            var html = '';
            html += '<div class="us">';
            html += '<div class="p_center">';
            html += '<div class="tit">';
            html += '';
            $.each(result, function (index, value) {
                html += '<a class="page-type-1" href="' + value.items[0].navId + '"><h2>' + value.items[0].nav + '</h2></a>';
            });
            html += '';
            html += '</div>';
            html += '<div class="p_list">';
            html += '<ul>';
            $.each(result, function (index, value) {
                $.each(value.items, function (index, item) {
                    html += '<li><a href="' + item.id + '" class="page-type-art" target="_blank" style="width: 800px;">' + item.title + '</a><span>' + item.date + '</span></li>'

                });
            });
            html += '</ul>'
            html += '</div>'
            html += '<div class="clear"></div>'
            html += '<div class="page">'
            html += '<span class="p_top"><a href="#">上一页</a></span>1&nbsp;<span class="p_down"><a href="#">下一页</a></span>'
            html += '</div>'
            html += '</div>'
            html += '</div>'
            return html;
        },
        load_Article_Style_3: function (result) {
            var html = '';
            var html2 = '';
            var html3 = '';

            html += '<div class="in_tit">'
            html += '<ul>'
            $.each(result, function (index, value) {
                if (index == 0) {
                    html += '<li id="' + value.items[0].navId + '"><a href="javascript:viod();" class="now click">' + value.items[0].nav + '</a></li>'

                    html2 += ' <div class="in_list" id="in_list' + value.items[0].navId + '">'
                    html2 += '<div class="in_pic">'
                    html2 += '<p>'
                    html2 += ' <img src="' + abp.appPath + value.items[0].picture + '" width="205" height="152" />'
                    html2 += '</p>'
                    html2 += '</div>'
                    html2 += '<div class="pic_list">'
                    html2 += '<ul>'
                    $.each(value.items, function (index, item) {
                        html2 += '<li><a title="' + item.title + '" class="page-type-art" href="' + item.id + '">' + item.title + '</a><span>' + item.date + '</span></li>'
                    });

                    html2 += '</ul>'
                    html2 += '</div>'
                    html2 += '<div class="clear"></div>'
                    html2 += '</div>'
                } else {
                    html += '<li id="' + value.items[0].navId + '"><a href="javascript:viod();"  class="click">' + value.items[0].nav + '</a></li>'

                    html3 += ' <div class="in_list" id="in_list' + value.items[0].navId + '" style="display: none;">'
                    html3 += '<div class="pic_list" style="width:640px;float:left;">'
                    html3 += '<ul>'
                    $.each(value.items, function (index, item) {
                        html3 += '<li><a title="' + item.title + '" class="page-type-art" href="' + item.id + '">' + item.title + '</a><span>' + item.date + '</span></li>'
                    });
                    html3 += '</ul>'
                    html3 += '</div>'
                    html3 += '<div class="clear"></div>'
                    html3 += '</div>'
                }
            });
            html += '</ul>'
            html += '</div>'
            return html + html2 + html3;
        },
    }

}();
