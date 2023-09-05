import { Button } from './button'
import { BaseMap } from './map'
import { DefineComponent } from 'vue'
declare module 'windaka-ui' {
    /** 按钮  */
    export const WButton: DefineComponent<Button>
    /** 地图 */
    export const WBaseMap: DefineComponent<BaseMap>
}