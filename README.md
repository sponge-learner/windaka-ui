# windaka-ui

## 安装

```
npm install windaka-ui
```

# 使用方式

## 1.全局安装

```
import { createApp } from 'vue'
import App from './App.vue'
import windaka from 'windaka-ui''

const app = createApp(App)

app
    .use(windaka)
    .mount('#app')

```

# 2.按需导入

```
<script lang="ts"  setup>
import { reactive, ref } from 'vue';
import { WButton } from 'windaka-ui'
</script>

<template>
    <div class="login">
      <WButton type='info'>1222223</WButton>
    </div>
</template>

```
