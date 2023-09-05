# windaka-ui

## 安装

```
npm install windaka-ui
```

## 目录结构

```
windaka-ui
│  .browserslistrc
│  .eslintrc.js
│  .gitignore
│  .npmignore
│  package-lock.json
│  package.json
│  README.md
│  tsconfig.json
│  vue.config.js
│   
├─examples                组件示例 run serve 的入口文件夹
│      App.vue
│      main.ts            组件示例 run serve 的入口文件
│      
├─lib                     打包后的代码       
│       
├─packages                组件源码包
│  │  index.ts            组件入口文件
│  │  
│  └─assets               静态文件资源    
│      └─static           
│          └─css  
│          └─js           
│  │  
│  └─components           组件文件夹    
│      └─Button           单个组件文件
│          │  Button.vue
│          │  index.ts    单个组件入口
│                  
├─public
│      favicon.ico
│      index.html
│      
└─typings                   组件类型声明文件  
        button.d.ts
        index.d.ts
        
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

## 2.按需导入

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
