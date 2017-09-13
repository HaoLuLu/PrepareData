$(document).ready(function () {
    var site_url = window.location.href.toLowerCase();
    /*switch (true) {		
		default :
			$("#nav li").attr("class","");
			$("#nav li").eq(0).attr("class","nav_lishw");
			$(".nav_lishw .v a").attr("class","sele");
			$(".nav_lishw .kind_menu").show();
	} */

    $(document).on("mouseover", "#nav li",
            function () {
                clearTimeout(setTimeout("0") - 1);

                $("#nav .bg").hide();
                $("#nav li .v .onehover").attr("class", "shutAhover");
                $(this).attr("id", "nav_hover")
                $(this).attr("id1", "nav_hover")
                $("#nav_hover .v a").attr("class", "onehover");
                $("#nav_hover .bg").show();
            }).on("mouseout", "#nav li",
                function () {

                    if ($(this).attr("class") != "nav_lishw") {
                        $("#nav_hover .v .onehover").attr("class", "");
                        $("#nav_hover .bg").hide();
                    }

                    $(this).attr("id", "")
                    $(this).attr("id1", "")
                    $("#nav li .v .shutAhover").attr("class", "onehover");
                    setTimeout(function () {
                        $(".nav_lishw .bg").show();
                        $(".nav_lishw .v a").attr("class", "onehover");
                    }, 50);
                }
        );


    $(document).on("click", ".click",
        function () {
            $(this).children('a').addClass("now");
            $(this).siblings().children('a').removeClass("now");
            var id = $(this).parent().attr('id');
            $(".in_list").css("display", "none");
            $(".now").removeClass("now");
            $("#in_list" + id).css("display", "block");
            $("#" + id).children('a').addClass("now");

        });



    var deplay = 1000;
    var pageSize = 1;
    var page = Math.ceil($("#service_items > li").length / pageSize) - 2;//一行几张图片，翻到最后一张
    var current = 1;
    var dir = true;
    function seekTo(i) {
        var left = $("#service_items > li").eq(i).position().left;
        $("#service_items").animate({ left: -left }, 300, "swing")
    }
    function goNext() {
        if (current == page) return;
        seekTo(pageSize * current);
        current++;
    }
    function goPrev() {
        if (current == 1) return;
        current--;
        seekTo(pageSize * (current - 1));
    }
    $("#service_next").click(function () {
        goNext()
    })
    $("#service_prev").click(function () {
        goPrev()
    });


    ///*-- 导航高亮处理，你懂得-- Code By @LESTER斯特*/
    //var currentUrl = window.location.href;
    //function highLight() {
    //    if (currentUrl.indexOf('guanyulantian') > 1) {
    //        $("a[href='/guanyulantian/']").attr('class', 'now');
    //    } else if (currentUrl.indexOf('xinwenzhongxin') > 1) {
    //        $("a[href='/xinwenzhongxin/']").attr('class', 'now');
    //    } else if (currentUrl.indexOf('lantianchanye') > 1) {
    //        $("a[href='/lantianchanye/']").attr('class', 'now');
    //    } else if (currentUrl.indexOf('renliziyuan') > 1) {
    //        $("a[href='/renliziyuan/']").attr('class', 'now');
    //        $('.b_link').attr('class', 'b_link_right');
    //    } else if (currentUrl.indexOf('qiyedangjian') > 1) {
    //        $("a[href='/qiyedangjian/']").attr('class', 'now');
    //        $('.b_link').attr('class', 'b_link_right');
    //    } else if (currentUrl.indexOf('qiyedangjian') > 1) {
    //        $("a[href='/qiyedangjian/']").attr('class', 'now');
    //        $('.b_link').attr('class', 'b_link_right');
    //    } else if (currentUrl.indexOf('qiyewenhua') > 1) {
    //        $("a[href='/qiyewenhua/']").attr('class', 'now');
    //        $('.b_link').attr('class', 'b_link_right');
    //    } else if (currentUrl.indexOf('lianxiwomen') > 1) {
    //        $("a[href='/lianxiwomen/']").attr('class', 'now');
    //        $('.b_link').attr('class', 'b_link_right');
    //    } else {
    //        $("p[class='n_left_bg'] a").attr('class', 'now');
    //    }
    //    //alert();
    //}
    //highLight();
    //setTimeout(highLight, 1000);

})

