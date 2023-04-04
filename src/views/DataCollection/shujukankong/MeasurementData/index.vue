<!--
 * @Author: xiaoHao
-->
<!--
  Map
 * @Author: xiaoHao
-->

<template>
    <div class="container">
      <div id="map" ref="map"></div>
    </div>
  </template>
  
  <script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import 'leaflet-draw/dist/leaflet.draw.css';
  import 'leaflet-draw/dist/leaflet.draw';
  
  export default {
    name: 'MeasurementData',
    isRouter: true,
    data() {
      return {
        map: null,
        drawnItems: null,
      };
    },
    mounted() {
      // 初始化地图
      // this.map = L.map(this.$refs.map).setView([51.505, -0.09], 13);
      
    this.map = L.map(this.$refs.map).setView([39.736861245030326, 116.13991336098002], 13);
      // 添加地图图层
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(this.map);
      L.marker([39.736861245030326, 116.13991336098002]).addTo(this.map)
        .bindPopup('marker')
        .openPopup();
  
      // 初始化绘图层
      this.drawnItems = new L.FeatureGroup();
      this.map.addLayer(this.drawnItems);
  
      // 添加绘图控件
      const drawControl = new L.Control.Draw({
        edit: {
          featureGroup: this.drawnItems,
        },
        draw: {
          polygon: true,
          polyline: true,
          rectangle: true,
          circle: true,
          marker: true,
        },
      });
      this.map.addControl(drawControl);
  
      // 监听绘图事件
      this.map.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer;
        this.drawnItems.addLayer(layer);
        this.$emit('addFeature', layer.toGeoJSON());
      });
    },
  };
  </script>
  
  <style>
  #map {
    height: 100%;
  }
  </style>