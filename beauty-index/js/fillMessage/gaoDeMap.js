var map = new AMap.Map('myMap', {
    resizeEnable: true
});
var marker = new AMap.Marker();
var options = {
        'showButton': true,
        'buttonPosition': 'RB',
        'buttonOffset': new AMap.Pixel(10, 20),
        'markerOptions': {
            'offset': new AMap.Pixel(-18, -36),
            'content': '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
        },
        'showCircle': true,
        'circleOptions': {
            'strokeColor': '#0093FF',
            'noSelect': true,
            'strokeOpacity': 0.5,
            'strokeWeight': 1,
            'fillColor': '#02B0FF',
            'fillOpacity': 0.25
        },
        'zoomToAccuracy': true
    }
    //定位当前位置
function loadMap() {
    AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation(options);
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function(status, result) {
            if (status == 'complete') {
                let address = result.formattedAddress;
                $('.mapInput').val(address)
            }
            // console.log(result)
        })
    });
}


//点击地图重新定位
function regeoCode(e) {
    map.clearMap();
    let lnglat = [e.lnglat.lng, e.lnglat.lat];
    map.add(marker);
    marker.setPosition(lnglat);
    var geolocation = new AMap.Geocoder(lnglat);
    geolocation.getAddress(lnglat, function(status, result) {
        // console.log(result)
        let refreshAddress = result.regeocode.formattedAddress;
        // console.log(refreshAddress)
        $('.mapInput').val(refreshAddress);

    })
}

map.on('click', function(e) {
    regeoCode(e);
})
window.onload = loadMap();

$('.resetPosition').click(function() {
    //loading层
    var index = layer.load(1, {
        shade: [0.3, '#c2c2c2'], //0.1透明度的白色背景
        time: 2000
    });
    loadMap()
})