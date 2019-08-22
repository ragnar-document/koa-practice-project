const Koa = require('koa');     // 引入 koa 框架
const app = new Koa();          // 实例化应用
const bodyParser = require('koa-bodyparser');  //  下载:npm i koa-bodyparser
app.use(bodyParser());          //引入koa-body

// 引入 路由
const manager = require('./routes/manager').prefix('/api');

// 使用路由
app.use(manager.routes()).use(manager.allowedMethods())



// 使用路由，监听3000 端口
app.listen(3000)
console.log('ok 3000!')