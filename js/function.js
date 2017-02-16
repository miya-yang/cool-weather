var init = {
    _url : "json/china-city-list.json",
    //根据时间改变背景图片
    changeBg : function(){
        var date = new Date();
        var hour = date.getHours();
        if(hour >= 0 && hour <= 6){
            $(".container").css("background","url('img/background/0.jpg') no-repeat");
        }else if(hour > 6 && hour <= 12){
            $(".container").css("background","url('img/background/1.jpg') no-repeat");
        }else if(hour > 12 && hour <= 18){
            $(".container").css("background","url('img/background/2.jpg') no-repeat");
        }else if(hour > 18 && hour < 24){
            $(".container").css("background","url('img/background/3.jpg') no-repeat");
        }
        $(".container").css("background-size","cover");
    },
    //改变窗口大小
    changeWindow : function(){
        var height = $(window).height();
        $(".container").css("height",height + "px");
    },
    //读取省市下拉列表
    readProvince : function(){
        $.ajax({
            url : this._url,
            success : function(data){
                //data = eval('(' + data + ')');
                var province = {};
                //将JSON省份存入 province 对象并去重
                for(var i = 0;i < data.length;i++){
                    if(province[data[i].provinceZh] == undefined){
                        province[(data[i].provinceZh)] = true;
                    }
                }
                //遍历追加
                for(var k in province){
                    $("#province").append("<option>" + k + "</option>");
                }
                //加载默认天气
                init.readCity();
            },
            error : function(error){
                alert(JSON.stringify(error));
                return false;
            }
        });
    },
    //读取城市下拉列表
    readCity : function(){
        var province = $("#province").val();
        $.ajax({
            url : this._url,
            success: function(data){
                //data = JSON.parse(data);
                //重置数据
                $("#city").children("option").remove();
                //添加数据
                for(i = 0;i < data.length;i++){
                    if(data[i].provinceZh == province){
                        $("#city").append("<option>" + data[i].cityZh + "</option>")
                    }
                }
                weather.get();
            },
            error : function(error){
                alert(JSON.stringify(error));
                return false;
            }
        });
    }
};

var weather = {
    //获取天气信息
    get : function(){
        var city = $("#city").val();
        $.ajax({
            url : "https://free-api.heweather.com/v5/now",
            type : "get",
            async : true,
            data : {
                city : city,
                key : '015a8767026e49c2b90684ed46960ad0'
            },
            success : function(results){
                var res = results.HeWeather5[0];
                $(".city-name").text(res.basic.city);
                $("#datetime").text(res.basic.update.loc);
                $("#temperature").text(res.now.tmp);

            },
            error : function(error){
                alert(JSON.stringify(error));
                return false;
            }
        });
    }
};