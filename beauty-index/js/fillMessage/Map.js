  //实例化地图
  var map = new BMapGL.Map('myMap');
  var geoc = new BMapGL.Geocoder();
  var point = new BMap.Point(116.331398, 39.897445);
  map.centerAndZoom(point, 14);
  map.enableScrollWheelZoom(true);


  map.addEventListener('click', function(e) {
          map.clearOverlays();
          var pt = e.latlng;
          var marker = new BMapGL.Marker(new BMapGL.Point(pt.lng, pt.lat));
          map.addOverlay(marker);
          geoc.getLocation(pt, function(rs) {
              var addComp = rs.addressComponents,
                  changeLocation = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
              $('.mapInput').val(changeLocation)
                  // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
          })
      })
      //点击重新获取地址
  $('.resetPosition').click(function(e) {
      //loading层
      var index = layer.load(1, {
          shade: [0.3, '#c2c2c2'], //0.1透明度的白色背景
          time: 3000
      });
      getPosition()
  })


  //定位用户当前位置
  function getPosition() {
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              map.clearOverlays();
              //   var mk = new BMapGL.Marker(r.point);
              var marker = new BMapGL.Marker(r.point);
              map.addOverlay(marker);
              //   map.addOverlay(mk); 
              //将mack添加到地图
              map.panTo(r.point);
              //   alert(JSON.stringify(r))
              //   alert('您的位置:' + r.point.lng + ',' + r.point.lat);
              //这里是个回调
              var gc = new BMap.Geocoder();
              gc.getLocation(r.point, function(rs) {
                  var addressCity = rs.address;
                  $('.mapInput').val(addressCity)
              })
          } else {
              alert('failed' + this.getStatus())
          }

      }, {
          enableHighAccuracy: true
      })

  }

  //   转换坐标
  translateCallback = function(data) {
      var label = new BMapGL.Label("转换后的百度坐标（正确）", { offset: new BMap.Size(20, -10) });
      marker.setLabel(label); //添加百度label
      map.setCenter(r.point)
  }

  window.onload = getPosition();