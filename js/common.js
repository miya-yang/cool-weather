$(function(){
    init.changeBg();
    init.readProvince();
    init.changeWindow();
    $("#province").change(function(){
        init.readCity();
    });
    $("#city").click(function(){
        weather.get();
    });
});
//动态改变窗口大小
$(window).resize(function() {
    init.changeWindow();
});