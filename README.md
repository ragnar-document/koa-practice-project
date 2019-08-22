# koa-practice-project

#### 项目功能：增删改 

#### 技术栈：node/vue/koa/element/axios/knex.js

#### 注意事项：本文并未提供数据库设计请参考：[数据设计](https://ragnar-document.github.io/vueblog/guide/project/LiuYinSheProject.html#%E5%90%8E%E5%8F%B0%E8%AE%BE%E8%AE%A1%E5%88%86%E6%9E%90)

## koa部分

**启动项目** 

```
mkdir koa-project && cd koa-project
>> npm init
>> touch app.js
```

**App.js**

```javascript
const Koa = require('koa');     // 引入 koa 框架
const app = new Koa();          // 实例化应用

// 使用路由，监听3000 端口
app.listen(3000)
console.log('ok 3000!')
```

**配置package.json**

```
"main": "app.js",// 默认index.js
```

**下载需要的包**

```
npm i axios -S
npm i knex -S //数据库连接器
npm i mysql -S //数据库
npm i koa
npm i koa-bodyparser //koa路由中间件
```

**App.js引入中间件**

```
const bodyParser = require('koa-bodyparser'); 
app.use(bodyParser());          //使用koa-body
```

**文件结构**

```
> controllers 	//逻辑层文件
> models				//数据层文件
> node_modules	
> routes				//路由层文件
> v-admin				//vue前端文件
> app.js				//入口文件
config.js				//链接数据库文件
package.json
```

**创建routes/manager.js**

```javascript
const router = require('koa-router')()
//引入操作层
const managerController = require('../controllers/manager.js')
//配置接口
router.get('/manager', managerController.managerRender) //全部
router.get('/manager/:id', managerController.managerSingle) //单个
router.post('/manager', managerController.managerAdd) //增
router.put('/manager/:id', managerController.managerEdit) //改
router.del('/manager/:id', managerController.managerDelete) //删

module.exports = router
```

**创建controller/manager.js**

> 根据路由中配置方法
>
> 分离操作

```javascript
const managerController = {
    managerRender: async (ctx, next) => {  //获取所有管理员数据
        try {
            ctx.status = 200
        } catch (err) {
            ctx.body = '获取失败';
            ctx.status = err.status || 500;
        }
    },
    managerSingle: async (ctx, next) => {
        let id = ctx.params.id;
        try {
          
            ctx.status = 200
        } catch (error) {
            ctx.body = '获取失败';
            ctx.status = err.status || 500;
        }
    },
    managerAdd: async (ctx, next) => {  //新增管理员数据
        try {
            //返回状态码
            ctx.status = 200
            ctx.body = '新增成功'
        } catch (err) {
            ctx.body = '增加失败';
            ctx.status = err.status || 0;
        }
    },
    managerEdit: async (ctx, next) => {
        try {
            //返回状态码
            ctx.status = 200
            ctx.body = '新增成功'
        } catch (err) {
            ctx.body = '增加失败';
            ctx.status = err.status || 0;
        }
    },
    managerDelete: async (ctx, next) => {
        try {
            //返回状态码
            ctx.status = 200
            ctx.body = '删除成功'
        } catch (err) {
            ctx.body = '删除失败';
            ctx.status = err.status || 0;
        }
    }
}

module.exports = managerController;
```

**连接数据库新建config.js**

```javascript
const configs = {
    mysql: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '',
        database: 'liuyinshe'
    }
}

module.exports = configs
```

建立models层knex.js

```javascript
//引入config配置文件
const configs = require('../config.js')
module.exports = require('knex')({
  client:'mysql',
  connection:{
    host: configs.mysql.host,
    port: configs.mysql.port,
    user: configs.mysql.user,
    password: configs.mysql.password,
    database: configs.mysql.database
  }
})
```

**新建models/baiscModel.js作为公共方法配置文件**

> 因为后台许多地方使用到的方法都是相似的所以抽离出来作为一个公共调用文件
>
> 这里的isdeleted是把数据库软删除的信息过滤掉～详细看文件

```javascript
//引入数据库配置文件	
class Base {
  constructor(props){
    this.table = props;
  }
  //获取所有信息
  getAll(){
    return knex(this.table).whereNull('isdeleted').select();
  }
}
```

新建managerModel.js继承basicModel的方法

```javascript
const Base = require('./baiscModel');

class Manager extends Base {
  construtor(props = 'manager') {
    super(props)
  }
}

module.exports = new Manager;
```

**接着回到controller/manager.js中**

> Koa Context 将 node 的 `request` 和 `response` 对象封装到单个对象中

```javascript
//导入数据层文件
const Mangermodel = require('./../models/mangerModel.js')

managerRender: async (ctx, next) => {  //获取所有管理员数据
      try {
          //调用方法获取所有管理员信息
          let managerAll = await ManagerModel.getAll();
        	//发送到body中
          ctx.body = managerAll
      } catch (err) {
          ctx.body = '获取失败';
          ctx.status = err.status || 500;
      }
  },
```

如果需要获得request.body中的内容就需要安装插件koa-bodyParser 在express中是不需要的。这也是koa的优势，按需引入减少体积。接下来几个方法就不在写详细看代码

**引入路由**

App.js 

> .prefix('./api')为公共请求头 例如：api/manager

```javascript
// 引入 路由
const manager = require('./routes/manager').prefix('/api');

// 使用路由
app.use(manager.routes()).use(manager.allowedMethods())
```

到这里为止后台基本上已经搭建好了

接口也配好了，从数据获取方法以及增删改都配好了，就进入vue阶段了

http://localhost:3000/api/manager

http://localhost:3000/api/manager/1

## Vue部分

到了这里基本上已经是我们熟悉的前端页面了，在这里我使用的是elementUI，毕竟又好看又好用加上是给后台人员使用的简单简洁基本上就可以了自己写样式又麻烦不造轮子直接使用element的组件库再次感谢element～～

没有这部分基础的话问题不大文档大部分都有解释比入门JavaScript时要简单～

**安装**

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

**创建一个项目：**

```bash
vue create my-project
```

**解决跨域问题**

配置vue.config.js

```javascript
module.exports = {
	devServer:{
    proxy:"http://localhost:3000"
  }	
}
```

**配置global文件**

> 这个文件夹主要放置发送请求等文件
>
> > Request 
> >
> > Service 

**创建request/request.js**

```javascript
import request from "./../request/request.js";
import API from "./../request/api.js";

export default {
  list(params){
    return request.get(API.manager,params)
  }
}
```

**接下来把数据渲染到网页上**

> 创建render渲染方法再页面创建时调用使用created( )方法

```javascript
import managerModel from "@/global/service/manager";

Methods:{
   render() {
   managerModel.list().then(res => {
      this.tableData = res;
      let totalNum = res.length;
      this.total = totalNum;
  });
}
```

如果没有弄错的话数据现在时正常渲染再网页上了