import { PropType, ExtractPropTypes } from "vue"

/** 组件入参 */
export type BaseMap = {
  mapIp: {
    type: PropType<string>,
    required: true,
  },
  streetIp: {
    type: PropType<string>,
    required: true,
  },
  /** 地图容器id */
  mapId: {
    type: PropType<string>,
    required: false,
  },
  /** 样式类名 */
  className: {
    type: PropType<string>,
    required: false,
  },
}

/** 组件参数类型 */
export type BaseMapProps = ExtractPropTypes<BaseMap>

/** BM全局 */
declare global {
  export const BM: any;
}
