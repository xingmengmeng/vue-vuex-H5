## vue-webpack多页面打包

### install dependencies
npm install安装依赖
接口ajax调用使用axios

### 开发打包
webpack --watch

### 上线打包
npm run build

### nginx 配置  配合路由刷新
```
location / {
    try_files $uri $uri/ /index.html;
}
```