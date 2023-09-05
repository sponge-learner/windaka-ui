<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { BaseMapProps } from 'typings/map';
import useBigeMap from '~/utils/useBigeMap';

const props = withDefaults(defineProps<BaseMapProps>(),{
  mapId: `bige-map-${new Date().getTime()}-${Math.random() * 10}-${Math.random() * 10}`,
});

/* BigeMap地图对象 */
const bigeMap = ref<any>();
// 是否已经初始化地图
const isInit = ref(false)
// 初始化地图
const initMap = () => {
  if (isInit.value) return
  useBigeMap({ mapIp: props.mapIp }).then(() => {
    if (bigeMap.value) bigeMap.value.remove();
    BM.Config.HTTP_URL = `http://${props.mapIp}`;
    bigeMap.value = BM.map(props.mapId, `bigemap.${props.streetIp}`, {
      center: [36, 120.15],
      minZoom: 10,
      maxZoom: 18,
      zoom: 12,
      zoomControl: false,
      attributionControl: false,
      doubleClickZoom: false,
    });
    // 将地图视图限制为给定边界
    bigeMap.value.setMaxBounds([
      [37.02235, 118.925],
      [35.42934, 121.775],
    ]);
    isInit.value = true
  });
};
onMounted(async () => {
  await initMap();
});

defineOptions({
  name: 'w-basemap'
})
</script>

<template>
  <div :id="props.mapId" :class="props.className" class="wdt-base-map">
    <template v-if="!!bigeMap">
      <slot :bige-map="bigeMap" text="地图"></slot>
    </template>
  </div>
</template>

<style lang="scss" scoped>
:deep(.bigemap-bottom.bigemap-left) {
  display: none !important;
}

.wdt-base-map {
  width: 100%;
  height: 100%;
}
</style>
