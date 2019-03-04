/* MENU ICON SIDENAV OVERLAY */

$(document).ready(function(){
    $(".icon-item").click(function(){
        $(".menu-overlay").css({width: "200px"});
    });

    $(".menu-closebtn, .menu-overlay a").click(function(){
        $(".menu-overlay").css({width: 0});
    });

});
