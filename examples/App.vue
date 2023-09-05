<template>
  <div>组件示例</div>
  <WButton type='success'>按钮</WButton>
  <div class="map-box">
    <WBaseMap map-ip='10.10.7.200:9000' street-ip="0v8b4qex" />
  </div>
</template>

<script lang="ts" setup>
import { WButton, WBaseMap } from '~/index';


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