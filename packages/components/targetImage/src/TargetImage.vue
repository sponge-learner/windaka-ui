<script lang="ts" setup>
import { ref, onMounted, PropType, ExtractPropTypes, watch } from "vue";

interface Target {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface TargetImageType {
  targetList?: Target[];
  imgUrl: string;
}

type TargetImage = {
  source: {
    type: PropType<TargetImageType>;
    required: true;
  };
  width: {
    type: PropType<number>;
    required: true;
  };
  height: {
    type: PropType<number>;
    required: true;
  };
};

let props = defineProps<ExtractPropTypes<TargetImage>>();

const width = ref(props.width);

const height = ref(props.height);

// 缩放比例
let scaleNum = ref(1);

const canvas = ref();

let targetBox = ref();

// 特征列表
let targetList = ref(props.source.targetList);

let loadDone = ref(false);

let ctx;

// 加载图片
const loadImage = (src) => {
  const img = new Image();
  if (ctx === undefined) ctx = canvas.value.getContext("2d");
  img.src = src;
  img.onload = () => {
    if (img.width > (img.height * width.value) / height.value) {
      scaleNum.value = img.width / width.value;
    } else {
      scaleNum.value = img.height / height.value;
    }
    if (canvas.value) {
      canvas.value.width = img.width / scaleNum.value;
      canvas.value.height = img.height / scaleNum.value;
      ctx.drawImage(
        img,
        0,
        0,
        img.width / scaleNum.value,
        img.height / scaleNum.value
      );
      //   createTargetBox();
    }
    loadDone.value = true;
  };
};

// 生成特征框
const createTargetBox = () => {
  if (targetBox.value) {
    // targetList.value.forEach((i) => {
    //   let el = document.createElement("div");
    //   el.style.width = i.w / scaleNum + "px";
    //   el.style.height = i.h / scaleNum + "px";
    //   el.style.left = i.x / scaleNum + "px";
    //   el.style.top = i.y / scaleNum + "px";
    //   el.style.border = " 1px solid red";
    //   el.style.position = "absolute";
    //   targetBox.value.appendChild(el);
    // });
  }
};

// 特征图片缩放比例
let boxScale = ref(1);

// 滚动放大缩小
const wheelHandle = (e) => {
  if (e.wheelDelta > 0) {
    let res = boxScale.value + 0.1;
    boxScale.value = res > 2 ? 2 : res;
  } else {
    let res = boxScale.value - 0.1;
    boxScale.value = res < 0.7 ? 0.7 : res;
  }
};

// 特征图片移动
let boxTranslate = ref({ x: 0, y: 0 });

// 按下时的点位坐标
let downPoint = ref<{ x: number; y: number }>();

// 鼠标按下事件
const mouseDown = (e) => {
  let { offsetX, offsetY } = e;
  downPoint.value = { x: offsetX, y: offsetY };
};

//鼠标抬起事件
const mouseUp = (e) => {
  downPoint.value = undefined;
};

// 上一次渲染的时间
let lastTime = ref<number | undefined>(undefined);

//鼠标移动事件
const mouseMove = (e) => {
  if (downPoint.value) {
    if (lastTime.value === undefined) {
      lastTime.value = +new Date();
    } else {
      if (+new Date() - lastTime.value >= 16) {
        lastTime.value = +new Date();
      } else {
        return;
      }
    }
    let { offsetX, offsetY } = e;
    let { x, y } = downPoint.value;
    if (offsetX > x) {
      boxTranslate.value.x = boxTranslate.value.x + (offsetX - x);
    } else {
      boxTranslate.value.x = boxTranslate.value.x - (x - offsetX);
    }

    if (offsetY > y) {
      boxTranslate.value.y = boxTranslate.value.y + (offsetY - y);
    } else {
      boxTranslate.value.y = boxTranslate.value.y - (y - offsetY);
    }

    // translateX-=([缩放后的宽度-缩放前的宽度]*([当前鼠标 X 轴的坐标到目标元素左上角的距离]/缩放前的宽度))
    // translateY-=([缩放后的高度-缩放前的高度]*([当前鼠标 Y 轴的坐标到目标元素左上角的距离]/缩放前的高度))
  }
};

const mouseLeave = () => {
  downPoint.value = undefined;
};

const clearStatus = () => {
  loadDone.value = false;
  scaleNum.value = 1;
  boxScale.value = 1;
  boxTranslate.value = { x: 0, y: 0 };
};

onMounted(() => {
  loadImage(props.source.imgUrl);
});

watch(
  () => props.source,
  () => {
    targetList.value = props.source.targetList;
    clearStatus();
    loadImage(props.source.imgUrl);
  }
);
</script>

<template>
  <div
    @mouseup="mouseUp"
    class="target-image-container"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <div
      @mousedown="mouseDown"
      @mousemove="mouseMove"
      @wheel="wheelHandle"
      @mouseleave="mouseLeave"
      :style="{
        transform: `translate(${boxTranslate.x}px,${boxTranslate.y}px) scale(${boxScale})`,
      }"
      class="target-image-box"
      ref="targetBox"
    >
      <canvas ref="canvas" class="target-image"></canvas>
      <template v-for="(i, idx) in targetList" :key="idx">
        <div
          v-if="loadDone"
          :style="{
            width: i.w / scaleNum + 'px',
            height: i.h / scaleNum + 'px',
            left: i.x / scaleNum + 'px',
            top: i.y / scaleNum + 'px',
          }"
          class="target-item"
        ></div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.target-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
  overflow: hidden;
}
.target-image-box {
  position: relative;
  padding: 0;
  margin: 0;
  font-size: 0;
}
.target-item {
  position: absolute;
  border: 1px solid red;
}
</style>
