import { PropType, DefineComponent, ExtractPropTypes } from "vue"
/** 按钮类型 */
export type ButtonType = 'success' | 'error' | 'info' | 'warning'

/** 组件入参 */
export type Button = {
    /** 按钮类型 */
    type: {
        type: PropType<ButtonType>;
        required: true;
    },
    text: {
        type: PropType<string>
        required: false;
    }
}

/** 组件参数类型 */
export type ButtonProps = ExtractPropTypes<Button>
