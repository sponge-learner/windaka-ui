import { App } from 'vue'
import WButton from '~/components/button'
import CarType from '~/components/carType'
import TargetImage from '~/components/targetImage'
import {
    WBaseMap
} from '~/components/map'

// 所有组件列表
const components = [WButton, WBaseMap, CarType, TargetImage]

// 定义 install 方法， App 作为参数
const install = (app: App): void => {
    // 遍历注册所有组件
    components.map((component) => app.component(component.name, component))
}

export {
    WButton,
    WBaseMap,
    CarType,
    TargetImage
}

export default {
    install
}