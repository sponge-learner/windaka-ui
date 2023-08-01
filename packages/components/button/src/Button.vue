<template>
    <button class="nd-btn" :style="{ background: btnColor[props.type] }">
        <span v-if="$slots.default">

            <slot></slot>
        </span>
    </button>
</template>
  
<script lang="ts" setup>
import type { ButtonProps, ButtonType } from 'typings/button';

const props = defineProps<ButtonProps>()

const btnColor: {
    [key in ButtonType]: string
} = {
    success: 'green',
    warning: "orange",
    info: "blue",
    error: "red"
}

defineOptions({
    name: "w-button"
})

</script>
  
<style scoped>
.nd-btn {
    border-width: 0px;
    border-radius: 4px;
    padding: 2px 8px;
}
</style>