import TargetImage from './src/TargetImage.vue'
import { App } from 'vue'

TargetImage.install = (app: App) => {
    app.component(TargetImage.name, TargetImage)
}

export default TargetImage