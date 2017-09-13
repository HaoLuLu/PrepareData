$(function () {
    $('.carousel.carousel-slider').carousel({ full_width: true });
    load_Menu();

});

function load_Menu() {
    abp.ajax({
        url: abp.appPath + 'NavigationMenus/Tree',
        type: 'POST',
        success: function (result) {
            var html = '';
            if (result && result.id == -1 && result.children.length > 0) {
                $.each(result.children, function (index, item) {
                    if (item.children && item.children.length > 0) {
                        html += '<li ' + (index == 0 ? 'class="active"' : '') + ' ><a class="dropdown-button waves-effect waves-light" href="#!" data-hover="true" data-belowOrigin="true" data-activates="dropdown' + item.id + '">' + item.text + '</a></li>';
                        var dropdown = '<ul id="dropdown' + item.id + '" class="dropdown-content">';
                        $.each(item.children, function (i, v) {
                            dropdown += '<li><a class="waves-effect waves-light" href="#!">' + v.text + '</a></li><li class="divider"></li>';
                        });
                        dropdown += '</ul>';
                        $('body').append(dropdown);
                    } else {
                        html += '<li ' + (index == 0 ? 'class="active"' : '') + ' ><a class="waves-effect waves-light" href="#!">' + item.text + '</a></li>';
                    }
                });
                $("#nav-mobile").append(html);
                $(".dropdown-button").dropdown({ hover: true, alignment: 'bottom', belowOrigin: true });
            }
        }
    });
}