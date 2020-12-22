let province = $("#input_province");
let city = $("#input_city");
let district = $("#input_area");
//初始化省份下拉选择框选项
$(function() {
    //遍历对象
    //注意data在data.js中已经存在
    data.forEach(function(value, index) {
        let provinceName = value.name; //省份名
        province.append("<option value='" + index + "'>" + provinceName + "</option>")
    })
});
//省份下拉框切换事件
province.change(function() {
        //清除城市县两个下拉框选项
        $("#input_city option:not(:first)").remove();
        $("#input_area option:not(:first)").remove();
        let cityList = data[province.val()].city;
        cityList.forEach(function(value, index) {
            let cityName = value.name; //城市名
            city.append("<option value='" + index + "'>" + cityName + "</option>")
        })
    })
    //区县下拉切换
city.change(function() {
        $("#input_area option:not(:first)").remove();
        let cityList = data[province.val()].city;
        let areaList = cityList[city.val()].area;
        areaList.forEach(function(value, index) {
            district.append("<option value = '" + index + "'>" + value + "</option>");
        })
    })
    //获取地区值----------保存地址
$('#saveAddress').click(function() {
    let provinceVal = province.val(); //省
    let cityVal = city.val(); //市
    let areaVal = district.val(); //区 

    let pName = $("#input_province option:selected").text();
    let cName = $("#input_city option:selected").text();
    let aName = $("#input_area option:selected").text();

    console.log("名称" + receiverName + "电话" + phoneNumber + "地址" + pName + cName + aName +
        "详细地址" + detailAddress
    );
})