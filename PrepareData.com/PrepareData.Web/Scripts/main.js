(function ($) {
    $('.button-collapse').sideNav({ menuWidth: 240 });
    //Notification handler
    abp.event.on('abp.notifications.received', function (userNotification) {
        abp.notifications.showUiNotifyForUserNotification(userNotification);
    });

    //serializeFormToObject plugin for jQuery
    $.fn.serializeFormToObject = function () {
        //serialize to array
        var data = $(this).serializeArray();

        //add also disabled items
        $(':disabled[name]', this).each(function () {
            data.push({ name: this.name, value: $(this).val() });
        });

        //map to object
        var obj = {};
        data.map(function (x) { obj[x.name] = x.value; });

        return obj;
    };

    //Configure blockUI
    if ($.blockUI) {
        $.blockUI.defaults.baseZ = 2000;
    }
    jQuery.extend(jQuery.validator.messages, {
        required: "必选字段",
        remote: "请修正该字段",
        email: "请输入正确格式的电子邮件",
        url: "请输入合法的网址",
        date: "请输入合法的日期",
        dateISO: "请输入合法的日期 (ISO).",
        number: "请输入合法的数字",
        digits: "只能输入整数",
        creditcard: "请输入合法的信用卡号",
        equalTo: "请再次输入相同的值",
        accept: "请输入拥有合法后缀名的字符串",
        maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
        minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
        rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
        range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
        max: jQuery.validator.format("请输入一个最大为{0} 的值"),
        min: jQuery.validator.format("请输入一个最小为{0} 的值")
    });

    $(".loadiframe").on("click", function (e) {
        var $this = $(this),
            $tabs = $("#FrameTabs"),
            url = $this.attr("href"),
            name = $this.data("name"),
            text = $this.find("span").text(),
            tabId = "iFrameTab" + name;
        $tabs.find("a").removeClass("active");
        if ($tabs.find("a[href='#" + tabId + "']").length) {
            $tabs.tabs('select_tab', tabId);
            var $iframe = $("#" + tabId).children();
            $iframe.attr('src', $iframe.attr('src'));
        } else {
            if ($tabs.children("li").length >= 5) {
                abp.notify.info("打开太多页面会影响性能，请先关闭多余页面。");
                return false;
            }
            $tabs.append('<li class="tab col s3 z-depth-1"><a href="#' + tabId + '">' + text + '</a><button class="btn-floating z-depth-0 grey lighten-2 close"><i class="fa fa-close"></i></button><button class="btn-floating z-depth-0 grey lighten-2 refresh"><i class="fa fa-refresh"></i></button></li>');
            $tabs.parent().append('<div id="' + tabId + '" class="col s12 grey lighten-4"><iframe id="iFrame' + name + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" onLoad="iFrameHeight(this)" style="width:100%;" src="' + url + '"></iframe></div>');
            $tabs.tabs();
            $tabs.tabs('select_tab', tabId);
        }
        return false;
    });

    $(document).on("click", ".tab .close", function () {
        var $this = $(this);
        var $atag = $this.siblings("a");
        var $litag = $this.parent();
        var $tab = $litag.parent();
        var $active;
        $($atag.attr("href")).remove();
        if ($atag.hasClass("active")) {
            if ($litag.nextAll("li").length > 0)
                $active = $litag.nextAll("li").first().children("a");
            else
                $active = $litag.prevAll("li").first().children("a");
            $active.addClass("active");
        }
        $litag.next(".indicator").remove();
        $litag.remove();
        $tab.tabs();
        if ($active)
            $tab.tabs('select_tab', $active.attr("href").substr(1));
    });

    $(document).on("click", ".tab .refresh", function () {
        var $this = $(this);
        var $atag = $this.siblings("a");
        var $iframe = $($atag.attr("href")).children();
        $iframe.attr('src', $iframe.attr('src'));
    });

    $(window).on("resize", function () {
        var win_height = window.innerHeight - 188;
        if ($(document).innerHeight() < win_height)
            $(document).height(win_height);
        else
            $(document).height($("body").innerHeight());
    });

})(jQuery);

function iFrameHeight(ifm) {
    var subWeb = ifm.contentDocument;
    if (ifm != null && subWeb != null) {
        var win_height = window.innerHeight - 188;
        if (subWeb.body.scrollHeight < win_height)
            ifm.height=win_height;
        else
            ifm.height = subWeb.body.scrollHeight;
    }
}