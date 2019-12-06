<template>
    <!--地图容器-->
    <div id="map"></div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  mounted() {
      var map = L.map('map', {
          minZoom: 3,
          maxZoom: 17,
          center: [29.875,121.55683],
          zoom: 12,
          attributionControl: false
      });
      var url = "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}";
      L.tileLayer(url).addTo(map);
      var marker = L.marker([29.875,121.55683]).addTo(map);
      var circle = L.circle([29.875, 121.50], 500, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5
      }).addTo(map);
      var polygon = L.polygon([
          [29.87, 121.55],
          [29.90, 121.56],
          [29.86, 121.53]
      ]).addTo(map);
      marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
      circle.bindPopup("I am a circle.");
      polygon.bindPopup("I am a polygon.");
  }
};
</script>
<style scoped>
    html, body,#map {height: 790px;width: 100%;margin: 0;padding: 0;}
</style>