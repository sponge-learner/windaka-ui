import { App } from 'vue'
import WdButton from './components/button'

// 所有组件列表
const components = [WdButton]

// 定义 install 方法， App 作为参数
const install = (app: App): void => {
    // 遍历注册所有组件
    components.map((component) => app.component(component.name, component))
}

export {
    WdButton
}

export default {
    install
}