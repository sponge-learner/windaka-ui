<template>
  <!-- <div>组件示例</div>
  <WButton type="success">按钮</WButton>
  <div class="map-box">
    <WBaseMap map-ip="10.10.7.200:9000" street-ip="0v8b4qex" />
  </div>
  <CarType /> -->
  <button @click="nextHandle">下一张</button>
  <TargetImage :source="source" :height="500" :width="500" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { WButton, WBaseMap, CarType, TargetImage } from "~/index";
let source = ref({
  targetList: [
    { x: 0, y: 200, w: 1500, h: 600 },
    { x: 100, y: 900, w: 500, h: 600 },
  ],
  imgUrl:
    "https://www4.bing.com//th?id=OHR.PeakDistrictNP_ZH-CN1987784653_UHD.jpg",
});

const nextHandle = function () {
  source.value = {
    targetList: [],
    imgUrl:
      "https://www4.bing.com//th?id=OHR.BowingCrane_ZH-CN0143761293_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
  };
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.map-box {
  margin: 10px auto;
  width: 400px;
  height: 300px;
}
</style>
