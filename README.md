# mall-admin-web
<p>
  <a href="#公眾號"><img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/%E5%85%AC%E4%BC%97%E5%8F%B7-macrozheng-blue.svg" alt="公眾號"></a>
  <a href="#公眾號"><img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/%E4%BA%A4%E6%B5%81-%E5%BE%AE%E4%BF%A1%E7%BE%A4-2BA245.svg" alt="交流"></a>
  <a href="https://github.com/macrozheng/mall"><img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AE-mall-blue.svg" alt="後台項目"></a>
  <a href="https://github.com/macrozheng/mall-swarm"><img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/Cloud%E7%89%88%E6%9C%AC-mall--swarm-brightgreen.svg" alt="SpringCloud版本"></a>
  <a href="https://gitee.com/macrozheng/mall-admin-web"><img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/%E7%A0%81%E4%BA%91-%E9%A1%B9%E7%9B%AE%E5%9C%B0%E5%9D%80-orange.svg" alt="碼雲"></a>
</p>

## 前言

該項目為前後端分離項目的前端部分，後端項目`mall`地址：[傳送門](https://github.com/macrozheng/mall)。

## 項目介绍

`mall-admin-web`是一個電商後台管理系統的前端項目，基於Vue+Element實現。主要包括商品管理、訂單管理、會員管理、促銷管理、運营管理、内容管理、統計報表、財務管理、權限管理、設置等功能。

### 項目演示

項目在線演示地址：[http://www.macrozheng.com/admin/](http://www.macrozheng.com/admin/)  

![後台管理系統功能演示](http://img.macrozheng.com/mall/project/mall_admin_show.png)

### 技術選型

技術 | 說明 | 官網
----|----|----
Vue | 前端框架 | [https://vuejs.org/](https://vuejs.org/)
Vue-router | 路由框架 | [https://router.vuejs.org/](https://router.vuejs.org/)
Vuex | 全局狀態管理框架 | [https://vuex.vuejs.org/](https://vuex.vuejs.org/)
Element | 前端UI框架 | [https://element.eleme.io/](https://element.eleme.io/)
Axios | 前端HTTP框架 | [https://github.com/axios/axios](https://github.com/axios/axios)
v-charts | 基於Echarts的圖表框架 | [https://v-charts.js.org/](https://v-charts.js.org/)
Js-cookie | cookie管理工具 | [https://github.com/js-cookie/js-cookie](https://github.com/js-cookie/js-cookie)
nprogress | 進度條控件 | [https://github.com/rstacruz/nprogress](https://github.com/rstacruz/nprogress)
vue-element-admin | 項目腳手架参考 | [https://github.com/PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

### 項目布局

``` lua
src -- 源碼目錄
├── api -- axios網路請求定義
├── assets -- 靜態圖片資源文件
├── components -- 通用組件封装
├── icons -- svg矢量圖片文件
├── router -- vue-router路由配置
├── store -- vuex的狀態管理
├── styles -- 全局css樣式
├── utils -- 工具類
└── views -- 前端頁面
    ├── home -- 首頁
    ├── layout -- 通用頁面加載框架
    ├── login -- 登入頁
    ├── oms -- 訂單模塊頁面
    ├── pms -- 商品模塊頁面
    └── sms -- 營銷模塊頁面
```

## 搭建步骤
- 下載node併安装：[https://nodejs.org/dist/v12.14.0/node-v12.14.0-x64.msi](https://nodejs.org/dist/v12.14.0/node-v12.14.0-x64.msi);
- 該項目為前後端分離項目，訪問本地訪問接口需搭建後台環境，搭建請参考後端項目[傳送門](https://github.com/macrozheng/mall);
- 訪問在線接口無需搭建後台環境，只需將`config/dev.env.js`文件中的`BASE_API`改為[http://admin-api.macrozheng.com](http://admin-api.macrozheng.com)即可;
- 如果你對接的是[mall-swarm](https://github.com/macrozheng/mall-swarm)微服務後台的话，所有接口都需要通過網關訪問，需要將`config/dev.env.js`文件中的`BASE_API`改為[http://localhost:8201/mall-admin](http://localhost:8201/mall-admin)；
- 克隆源代碼到本地，使用IDEA打開，併完成編譯;
- 在IDEA命令行中運行命令：npm install,下載相關依賴;
- 在IDEA命令行中運行命令：npm run dev,運行項目;
- 訪問地址：[http://localhost:8090](http://localhost:8090) 即可打開後台管理系統頁面;
- 具體部署過程請参考：[mall前端項目的安装與部署](http://www.macrozheng.com/#/deploy/mall_deploy_web)
- `注意`：如果遇到無法運行npm命令，需要配置npm的環境變量，如在path變量中添加：C:\Users\zhenghong\AppData\Roaming\npm;
- `注意`：如果遇到npm install無法成功下載依賴，請参考[使用Jenkins一鍵打包部署前端應用，就是這麼6！](http://www.macrozheng.com/#/reference/jenkins_vue) 中`遇到的坑`部分。

## 公眾號

學習不走彎路，關注公眾號「**macrozheng**」，回覆「**學習路線**」，獲取mall項目專屬學習路線！

加微信群交流，公眾號後台回覆「**加群**」即可。

![公眾號圖片](http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/banner/qrcode_for_macrozheng_258.jpg)

## 許可證

[Apache License 2.0](https://github.com/macrozheng/mall-admin-web/blob/master/LICENSE)

Copyright (c) 2018-2021 macrozheng
