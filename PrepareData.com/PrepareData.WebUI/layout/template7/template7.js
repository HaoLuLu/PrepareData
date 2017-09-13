var Global = function () {
    //abp.appPath = 'http://117.78.52.105:88';
    abp.appPath = 'http://localhost:61814';
    //var tenid = null;
    return {
        init: function () {
            //$("#login").attr("href", abp.appPath + "/Account/Login");
            //sigle page
            $(document).on("click", ".page-type-0", function (e) {
                if (e && e.preventDefault) //阻止默认浏览器动作(W3C)
                    e.preventDefault();
                var _$this = $(this);
                $("#banner-bottom").remove();
                $("#msg-text").remove();
                $("#msg-text-bottom").remove();
                $("#head").remove();
                $("#data-page").html('');
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
                $("#banner-bottom").remove();
                $("#msg-text").remove();
                $("#msg-text-bottom").remove();
                $("#head").remove();
                $("#data-page").html('');
                Global.load_ArticleList({
                    id: _$this.attr("href")
                }, {}, true);
                return false;
            });
            $(document).on("click", ".page-type-art", function (e) {
                if (e && e.preventDefault) //阻止默认浏览器动作(W3C)
                    e.preventDefault();
                var _$this = $(this);
                $("#banner-bottom").remove();
                $("#msg-text").remove();
                $("#msg-text-bottom").remove();
                $("#head").remove();
                $("#data-page").html('');
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
                       html += '<ul class="nav navbar-nav pull-right mainNav">';
                       html += '<li class="active"><a href="javascript:location.reload();">首页</a></li>';
                       $.each(result.children, function (index, item) {
                           if (item.children && item.children.length > 0) {
                               html += '<li id="' + item.id + '" class="openmenu ' + (item.id == selected ? 'active' : '') + '">';
                               html += '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' + item.text + '<b class="caret"></b></a>';
                               html += '<ul class="dropdown-menu" id="menu' + item.id + '">';
                               $.each(item.children, function (i, v) {
                                   html += '<li><a href="' + v.id + '" class="page-type-' + v.type + '">' + v.text + '</a></li>';
                               });
                               html += '</ul>';
                               html += '</li>';
                           } else {
                               html += '<li ' + (item.id == selected ? 'class="active"' : '') + ' >';
                               html += '<a href="' + item.id + '" class="page-type-' + item.type + '" >' + item.text + '</a>';
                               html += '</li>';
                           }
                       });
                       html += '</ul>';
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
                    switch (value.name) {
                        case "name":
                            $("#data-name").text(value.text);
                            $("#data-title").text(value.text);
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

                html += '<header id="head" class="secondary">';
                html += '<div class="container">';
                html += '<h1>' + result.title + '</h1>';
                html += '<p>发表时间：' + result.date + '</p>';
                html += '</div>';
                html += '</header>';


                html += '<div class="container">';
                html += '<div class="row">';
                html += '<section class="col-sm-8 maincontent">';
                html += '<h3 style="margin-bottom: 50px;">' + result.title + '</h3>';
                html += '<div class="crol-text">' + result.content + '</div>';
                html += '</section>';
                html += '<!-- /main -->';

                html += '<!-- Sidebar -->';
                html += '<aside class="col-sm-4 sidebar-right">';

                html += '<div class="list styled custom-list">';
                html += '<h3 class="title-box_primary"><strong>尊享服务区</strong></h3>';
                html += '<ul class="list-unstyled list-spaces">';
                html += '<li><h4><strong>采购招标</strong></h4></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">采购公告</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">招标结果公示</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">客户关系管理</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">资质备案智能管理</a></li>';
                html += '<li><h4><strong>专属办公</strong></h4></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">采购订单管理</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">耗材物流链管理</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">设备运维保障支持</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">设备质控管理</a></li>';
                html += '<li><h4><strong>精细管理</strong></h4></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">设备成本效益分析</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">耗材流量流向管控</a></li>';
                html += '<li><h4><strong>市场支持</strong></h4></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">找产品</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">找总代</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">市场询价</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">征询参数</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">找服务</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">交流互动</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">行业技术交流</a></li>';
                html += '</ul>';
                html += '</div>';
                html += '</aside>';

                html += '</div>';
                html += '</div>';


                $("#data-page").html(html);

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
                //html += '<div class="list-title">';
                //html += '<h4 class="truncate"><a class="page-type-1" href="' + result.navId + '"> ' + result.nav + '</a></h4>';
                //html += '<div class="divider"></div></div>';
                //html += '<a href="#!" class="list-item"><h5 class="center"> ' + result.title + '</h5></a>';
                //html += '<div class="center"> <div class="chip">更新时间：' + result.date + '</div>';
                //html += '<div class="chip">来源：' + result.source + '</div>';
                //html += ' <div class="chip">关键词：' + result.keywords + '</div>';
                //html += '<div class="chip">作者：' + result.author + '</div></div>';
                //html += '<div class="card-content list-content">';
                //html += '<div class="first-item clearfix">';
                ////if (result.picture)
                ////    html += '<div class="item-img left"><img class="responsive-img materialboxed" data-caption="' + result.title + '" src="' + abp.appPath + result.picture + '" /></div>';
                //html += '<div class="crol-text"><div>' + result.content + '</div>';
                //html += '</div></div>';
                //html += '</div></div></div>';
                html += '<header id="head" class="secondary">';
                html += '<div class="container">';
                html += '<h1>' + result.title + '</h1>';
                html += '<p>发表时间：' + result.date + '&nbsp;&nbsp;&nbsp;&nbsp;作者：' + result.author + '&nbsp;&nbsp;&nbsp;&nbsp;关键词：' + result.keywords + '</p>';
                html += '</div>';
                html += '</header>';


                html += '<div class="container">';
                html += '<div class="row">';
                html += '<section class="col-sm-8 maincontent">';
                //html += '<h3 style="margin-bottom:25px;">' + result.title + '</h3>';
                //html += '<h5 class="" style="margin-top:15px;margin-bottom:20px;">发表时间：' + result.date + '作者：' + result.author + '关键词：' + result.keywords + '</h5>';
                html += '<div class="crol-text">' + result.content + '</div>';
                html += '</section>';
                html += '<!-- /main -->';

                html += '<!-- Sidebar -->';
                html += '<aside class="col-sm-4 sidebar-right">';

                html += '<div class="list styled custom-list">';
                html += '<h3 class="title-box_primary"><strong>尊享服务区</strong></h3>';
                html += '<ul class="list-unstyled list-spaces">';
                html += '<li><h4><strong>采购招标</strong></h4></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">采购公告</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">招标结果公示</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">客户关系管理</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">资质备案智能管理</a></li>';
                html += '<li><h4><strong>专属办公</h4></strong></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">采购订单管理</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">耗材物流链管理</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">设备运维保障支持</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">设备质控管理</a></li>';
                html += '<li><h4><strong>精细管理</h4></strong></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">设备成本效益分析</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">耗材流量流向管控</a></li>';
                html += '<li><h4><strong>市场支持</h4></strong></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">找产品</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">找总代</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">市场询价</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">征询参数</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">找服务</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">交流互动</a></li>';
                html += '<li><a href="http://www.mdevc.com" target="_blank">行业技术交流</a></li>';
                html += '</ul>';
                html += '</div>';
                html += '</aside>';

                html += '</div>';
                html += '</div>';



                $("#data-page").html(html);
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
                   //html += '<div class="wmuSliderWrapper">';
                   $.each(result, function (index, item) {
                       //html += ' <a href="http://' + item.url + '" target="_blank">'
                       html += '<div data-src="' + abp.appPath + item.picture + '" title="' + item.name + '"></div>'
                       //html += ' </a>'

                   });
                   //html += '</div>'
                   $("#camera_wrap_4").append(html);

                   $('#camera_wrap_4').camera({
                       transPeriod: 500,
                       time: 1000,
                       height: '400',
                       loader: 'false',
                       pagination: true,
                       thumbnails: false,
                       hover: false,
                       playPause: false,
                       navigation: false,
                       opacityOnGrid: false,
                       //imagePath: 'assets/images/'
                   });

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
                //    setTimeout(function () {
                //        location.reload();
                //    }, 2000);
                //abp.message.info("无数据，两秒后刷新！！");
                    return;
                if (isHtml) {
                    $("#data-page").html(Global.load_Article_Style_2(result));//文章列表
                } else {
                    var style1 = Global.load_Article_Style_1;//热点新闻
                    var style3 = Global.load_Article_Style_3;//首页文章展示

                    $("#focus-news").append(style1(result));
                    style3(result);
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
            var html2 = '';
            var html3 = '';
            var html4 = '';

            html += '<header id="head" class="secondary">';
            html += '<div class="container">';
            html += '<h1>' + result[0].items[0].nav + '</h1>';
            //html += '<p>发表时间：' + result.date + '作者：' + result.author + '关键词：' + result.keywords + '</p>';
            html += '</div>';
            html += '</header>';
            html += '<div class="container">';


            html3 += '<section class="row maincontent">';
            html3 += '<table width="95%" border="0" align="center">';


            $.each(result, function (index, value) {
                $.each(value.items, function (i, item) {
                    if (i < 6) {
                        html2 += '<div class="col-md-4">';
                        html2 += '<div class="featured-box row">';
                        html2 += '<div class="col-sm-4">';
                        html2 += '<a href="' + item.id + '" class="page-type-art">';
                        html2 += '<img src="' +abp.appPath+ item.picture + '" >';
                        html2 += '</a>';
                        html2 += '</div>';
                        html2 += '<div class="col-sm-8">';
                        html2 += '<a href="' + item.id + '" class="page-type-art">';
                        html2 += '<h3 class="media-heading">' + item.title + '</h3>';
                        html2 += '</a>';
                        html2 += '<p>' + item.introduce.substring(0,40) + '···</p>';
                        html2 += '</div>';
                            2
                        html2 += '</div>';
                        html2 += '</div>';


                    } else if (i < 20) {
                        //html += '<div class="row">';
                        //html += '<ul class="list-unstyled list-spaces">';
                        //$.each(value.items, function (i, item) {

                        html3 += '<tr>';
                        html3 += '<td width="80%"><h3><a class="page-type-art" href="' + item.id + '">' + item.title + '</a></h3></td>';
                        html3 += '<td><h3>' + item.date + '</h3></td>';
                        html3 += '</tr>';
                        

                   
                        //});
                        //html += '</ul>';
                        //html += '</div>';
                    }
                });

            });
            html4 += '</div>';
            html3 += '</table>';
            html3 += '</section><!-- Article content --></div>';
            return html+html2+html3+html4;

        },
        load_Article_Style_3: function (result) {
            var html = '';
            var html2 = '';
            var html3 = '';

            $.each(result, function (index, value) {
                if (index === 0) {
                    html += '<div class="row">';
                    $.each(value.items, function (i, item) {
                        if (i > 3) {
                            return false;
                        }

                        html += '<div class="col-md-3">';
                        html += '<div class="grey-box-icon">';
                        html += '<div class="icon-box-top grey-box-icon-pos">';
                        html += '<img src="' + abp.appPath + item.picture + '" class="img-circle" style="width:140px;height:140px;"/>';
                        html += '</div><!--icon box top -->';
                        html += '<h4>' + item.title + '</h4>';
                        html += '<p>' + item.introduce + '</p>';
                        html += '<p><a class="page-type-art" href="' + item.id + '"><em>更多→</em></a></p>';
                        html += '</div><!--grey box -->';
                        html += '</div><!--/span3-->';

                    });
                    html += '</div>';
                    $("#banner-bottom").append(html);

                } else if (index === 1) {

                    html2 += '<div class="container">';
                    html2 += '<h2><span>' + value.items[0].nav + '</span></h2>';
                    html2 += '<div class="row">';

                    $.each(value.items, function (i, item) {
                        if (i > 2) {
                            return false;
                        }
                        html2 += '<div class="col-lg-4 col-md-4 col-sm-12">';
                        html2 += '<div class="newsBox">';
                        html2 += '<div class="thumbnail">';
                        html2 += '<figure><img src="' + abp.appPath + item.picture + '" height="90"></figure>';
                        html2 += '<div class="caption maxheight2">';
                        html2 += '<div class="box_inner">';
                        html2 += '<div class="box">';
                        html2 += '<p class="title"><h5>' + item.title + '</h5></p>';
                        html2 += '<p><a href="' + item.id + '" class="page-type-art">更多…</a></p>';
                        html2 += '</div>';
                        html2 += '</div>';
                        html2 += '</div>';
                        html2 += '</div>';
                        html2 += '</div>';
                        html2 += '</div>';
                    });

                    html2 += '</div>';
                    html2 += '</div>';
                    $("#msg-text").append(html2);
                } else if (index === 2) {
                    //$.each(value.items, function (i, item) {
                    //    if (i > 2) {
                    //        return false;
                    //    }
                    //});
                    html3 += '<div class="row">';
                    html3 += '<div class="title-box clearfix "><h2 class="title-box_primary">' + value.items[0].nav + '</h2></div>';
                    html3 += '<div class="col-md-8">';
                    $.each(value.items, function (i, item) {
                        if (i > 2) {
                            return false;
                        }
                        html3 += '<a href="' + item.id + '" class="page-type-art">';
                        html3 += '<img src="' + abp.appPath + item.picture + '" alt="' + item.title + '" title="' + item.title + '" width="30%" style="margin-right:3%">';
                        html3 += '</a>';
                    });
                    html3 += '</div>';

                    html3 += '<div class="col-md-4">';
                    //html3 += '<div class="title-box clearfix "><h2 class="title-box_primary">合作客户</h2></div>';
                    html3 += '<div class="list styled custom-list" style="width:260px;float:center;height:220px;">';

                    html3 += '<marquee scrollamount="3" direction="up" height="100%" style="margin-left:40px">';
                    html3 += '<ul>';

                    $.each(value.items, function (i, item) {
                        if (i > 10) {
                            return false;
                        }
                        html3 += '<a href="' + item.id + '" class="page-type-art"><img src="' + abp.appPath + item.picture + '" alt="' + item.title + '" title="' + item.title + '" height="80" style="margin-bottom:5px;width:100%;"></a>';
                    });
                    //html3 += '<img src="assets/images/hzkh1.jpg" height="80" style="margin-bottom:5px">';
                    //html3 += '<img src="assets/images/hzkh2.jpg" height="80" style="margin-bottom:5px">';
                    //html3 += '<img src="assets/images/hzkh3.jpg" height="80" style="margin-bottom:5px">';
                    //html3 += '<img src="assets/images/hzkh4.jpg" height="80" style="margin-bottom:5px">';
                    //html3 += '<img src="assets/images/hzkh5.jpg" height="80" style="margin-bottom:5px">';

                    html3 += '</ul>';
                    html3 += '</marquee>';
                    html3 += '</div>';

                    html3 += '</div>';
                    html3 += '</div>';

                    $("#msg-text-bottom").append(html3);
                }
            });
        },
    }

}();
