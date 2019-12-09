# 工程质量管理平台

## 技术栈
前端：vue.js,Element-UI,echarts

后端：SpringBoot、Mybatis、Spring Security 等框架，利用 MybatisPlus、swagger2 等工具提高开发效率。

前后端分离，前端分 PC 端和移动端，前端部分数据使用 mockjs 模拟,部分采用真实后台数据。

此项目只包含前端部分，后端部分正在整理。

## 启动

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

```

## 目录结构
* build - webpack config files
* config - webpack config files
* dist - build
* src -your app
    * api
    * assets
    * common
    * components - your vue components
    * mock
    * styles
    * views - your pages
    * vuex
    * App.vue
    * main.js - main file
    * routes.js
* static - static assets

## 多页面配置

src/views文件夹下的js文件为入口文件，html文件为网页路径,例如

http://localhost:8090/views/project.html 对应的就是src/views/project中的模块，html文件名称需与 views 下的文件夹名称一致，具体可查看 util.js 中的 getMultiEntry 方法。


## 浏览器支持

Modern browsers and IE 10+.

## License
[MIT](http://opensource.org/licenses/MIT)


