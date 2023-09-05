import WBaseMap from './src/BaseMap.vue';
import { App } from 'vue';

WBaseMap.install = (Vue: App) => {
  Vue.component(WBaseMap.name, WBaseMap)
}

export default WBaseMap;