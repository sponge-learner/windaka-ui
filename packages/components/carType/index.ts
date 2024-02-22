import CarType from './src/CarType.vue'
import { App } from 'vue'

CarType.install = (app: App) => {
    app.component(CarType.name, CarType)
}

export default CarType