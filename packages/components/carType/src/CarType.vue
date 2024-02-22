<template>
  <div class="car-type-container">
    <div class="car-type-box">
      <div class="car-type-label">车辆型号</div>
      <el-popover
        content="this is content, this is content, this is content"
        trigger="click"
        :show-arrow="false"
        :offset="0"
      >
        <template #reference>
          <div writeabled class="car-type-input">
            <div class="car-name">
              {{ carBrandVal.brand ? carBrandVal.brand.v + " /" : "" }}
              {{ carBrandVal.type ? carBrandVal.type.v + " /" : "" }}
              {{ carBrandVal.year ? carBrandVal.year.v : "" }}
            </div>
            <div v-if="carBrandVal.brand" class="clear-icon">
              <el-icon @click.stop="clearCarType"><CircleClose /></el-icon>
            </div>
          </div>
        </template>
        <div class="car-brand-box">
          <div class="car-type-select">
            <div class="a-z">
              <div
                class="a-z-item"
                @click="englishClick(item)"
                v-for="item in englishLetters"
                :key="item"
              >
                {{ item }}
              </div>
            </div>
            <div class="car-type-select-list car-box-item">
              <div class="car-type-search">
                <el-input
                  ref="carBrandInputRef"
                  v-model="carBrandInput"
                  @input="carBrandChange"
                  class="search-input"
                  clearable
                ></el-input>
              </div>
              <div class="car-type-list">
                <div v-for="item in Object.keys(carBrand)" :key="item">
                  <div :id="'english' + item">{{ item }}</div>
                  <div
                    @click="carBrandHandle(i)"
                    class="car-type-item"
                    v-for="i in carBrand[item]"
                    :key="i.k"
                  >
                    {{ i.v }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="carBrandVal.brand" class="car-box-item">
            <div class="car-type-search">
              <el-input
                ref="carTypeInputRef"
                @change="carTypeChange"
                v-model="carTypeInput"
                class="search-input"
                clearable
              ></el-input>
            </div>
            <div class="car-type-list">
              <div v-for="item in Object.keys(carBrand)" :key="item">
                <div
                  @click="carTypeHandle(i)"
                  class="car-type-item"
                  :class="{ 'active-item': true }"
                  v-for="i in carBrand[item]"
                  :key="i.k"
                >
                  {{ i.v }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="carBrandVal.type" class="car-box-item">
            <div class="car-type-search">
              <el-input
                ref="carYearInputRef"
                @change="carYearChange"
                v-model="carYearInput"
                class="search-input"
                clearable
              ></el-input>
            </div>
            <div class="car-type-list">
              <div v-for="item in Object.keys(carBrand)" :key="item">
                <div
                  @click="carYearHandle(i)"
                  class="car-type-item"
                  v-for="i in carBrand[item]"
                  :key="i.k"
                >
                  {{ i.v }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from "vue";
import englishLetters from "~/assets/data/englishLetters.js";
import useDebounce from "~/utils/useDebounce";

const emit = defineEmits(["update:modelValue", "onchange"]);
const props = defineProps(["modelValue"]);

let carBrand = {
  A: [
    {
      k: 1,
      v: "奥迪",
    },
    {
      k: 2,
      v: "奥迪",
    },
    {
      k: 3,
      v: "奥迪",
    },
    {
      k: 4,
      v: "奥迪",
    },
    {
      k: 5,
      v: "奥迪",
    },
    {
      k: 6,
      v: "奥迪",
    },
    {
      k: 7,
      v: "奥迪",
    },
    {
      k: 4123,
      v: "奥迪",
    },
    {
      k: 5123,
      v: "奥迪",
    },
    {
      k: 6123,
      v: "奥迪",
    },
    {
      k: 7123,
      v: "奥迪",
    },
  ],
  B: [
    {
      k: 12,
      v: "奥迪",
    },
    {
      k: 22,
      v: "奥迪",
    },
    {
      k: 32,
      v: "奥迪",
    },
    {
      k: 42,
      v: "奥迪",
    },
    {
      k: 52,
      v: "奥迪",
    },
    {
      k: 62,
      v: "奥迪",
    },
    {
      k: 72,
      v: "奥迪",
    },
  ],
  C: [
    {
      k: 123,
      v: "奥迪",
    },
    {
      k: 223,
      v: "奥迪",
    },
    {
      k: 323,
      v: "奥迪",
    },
    {
      k: 423,
      v: "奥迪",
    },
    {
      k: 523,
      v: "奥迪",
    },
    {
      k: 623,
      v: "奥迪",
    },
    {
      k: 723,
      v: "奥迪",
    },
  ],
  D: [
    {
      k: 123,
      v: "奥迪",
    },
    {
      k: 223,
      v: "奥迪",
    },
    {
      k: 323,
      v: "奥迪",
    },
    {
      k: 423,
      v: "奥迪",
    },
    {
      k: 523,
      v: "奥迪",
    },
    {
      k: 623,
      v: "奥迪",
    },
    {
      k: 723,
      v: "奥迪",
    },
  ],
  E: [
    {
      k: 123,
      v: "奥迪",
    },
    {
      k: 223,
      v: "奥迪",
    },
    {
      k: 323,
      v: "奥迪",
    },
    {
      k: 423,
      v: "奥迪",
    },
    {
      k: 523,
      v: "奥迪",
    },
    {
      k: 623,
      v: "奥迪",
    },
    {
      k: 723,
      v: "奥迪",
    },
  ],
};

type CarBrandOptions = { k: string; v: string };

type CarBrandVal = {
  brand: null | CarBrandOptions;
  type: null | CarBrandOptions;
  year: null | CarBrandOptions;
};
let carBrandVal = ref<CarBrandVal>({
  brand: null,
  type: null,
  year: null,
});

let carBrandInputRef = ref();

let carBrandInput = ref("");
// 车辆品牌选择
const carBrandHandle = function (item: CarBrandOptions) {
  carBrandVal.value = {
    ...carBrandVal.value,
    brand: item,
    type: null,
    year: null,
  };
  getBrandData();
  carTypeInputRef.value?.clear();
  carYearInputRef.value?.clear();
};

let timeoutFn = useDebounce(500);

const carBrandChange = function (e) {
  timeoutFn(() => {
    getTypeData();
  });
};

let carTypeInputRef = ref();

let carTypeInput = ref("");
// 车辆类型选择
const carTypeHandle = function (item: CarBrandOptions) {
  carBrandVal.value = { ...carBrandVal.value, type: item, year: null };
  getYearData();
  carYearInputRef.value?.clear();
};

const carTypeChange = function (e) {
  timeoutFn(() => {
    getYearData();
  });
};

let carYearInputRef = ref();

let carYearInput = ref("");
// 车辆年份选择
const carYearHandle = function (item: CarBrandOptions) {
  carBrandVal.value = { ...carBrandVal.value, year: item };
  getTypeData();
};
const carYearChange = function (e) {
  console.log(e);
};

// 英文字母点击
const englishClick = function (item: string) {
  let dom = document.querySelector("#english" + item);
  if (dom) {
    dom.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
};

// 清楚
const clearCarType = function (e) {
  carBrandVal.value = {
    brand: null,
    type: null,
    year: null,
  };
};

const getBrandData = function () {};

const getTypeData = function () {};

const getYearData = function () {};

watch(carBrandVal, () => {
  emit("update:modelValue", carBrandVal);
});

onMounted(() => {
  getBrandData();
});
</script>

<style lang="scss">
.car-type-list {
  margin-top: 10px;
  overflow-y: auto;
  height: 400px;
  /* 自定义整个滚动条 */
  &::-webkit-scrollbar {
    width: 5px; /* 设置滚动条的宽度 */
    background-color: #f9f9f9; /* 滚动条的背景色 */
    border-radius: 0px; /* 轨道的圆角 */
  }

  /* 自定义滚动条轨道 */
  &::-webkit-scrollbar-track {
    background: #e1e1e1; /* 轨道的背景色 */
    border-radius: 10px; /* 轨道的圆角 */
  }

  /* 自定义滚动条的滑块（thumb） */
  &::-webkit-scrollbar-thumb {
    background-color: #c1c1c1; /* 滑块的背景色 */
    border-radius: 10px; /* 滑块的圆角 */
  }

  /* 滑块hover效果 */
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8; /* 滑块hover时的背景色 */
  }
}
.car-box-item {
  padding: 0px 5px;
}
.car-brand-box {
  display: flex;
}
.search-input {
  width: 130px !important;
  border-radius: 20px !important;
}
.car-type-item {
  user-select: none;
  cursor: pointer;
}
.el-popper {
  width: auto !important;
}
.car-type-select {
  display: flex;
}
.a-z {
  height: 450px;
  overflow: auto;
}
:deep(.el-popover.el-popper) {
  padding: 0;
}
.a-z-item {
  font-size: 13px;
  width: 25px;
  height: 17px;
  text-align: center;
  line-height: 17px;
  user-select: none;
  cursor: pointer;
}
.car-type-container {
  width: auto;
  //   height: 100px;
}
.car-type-box {
  display: flex;
  align-items: center;
}
.car-type-input {
  position: relative;
  text-align: left;
  line-height: 32px;
  padding-left: 10px;
  width: 200px;
  height: 32px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .car-name {
    width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .clear-icon {
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    right: 10px;
    color: #999;
    .el-icon {
      cursor: pointer;
      transition: all 0.33s;
    }
    .el-icon:hover {
      color: #409eff;
    }
  }
}
</style>
