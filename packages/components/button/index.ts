import WButton from './src/Button.vue';
import { App } from 'vue';

WButton.install = (Vue: App) => {
    Vue.component(WButton.name, WButton)
}

export default WButton;