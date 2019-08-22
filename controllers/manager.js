const ManagerModel = require('./../models/managerModel');

const managerController = {
    managerRender: async (ctx, next) => {  //获取所有管理员数据
        try {
            let managerAll = await ManagerModel.getAll();
            ctx.body = managerAll
        } catch (err) {
            ctx.body = '获取失败';
            ctx.status = err.status || 500;
        }
    },
    managerSingle: async (ctx, next) => {
        let id = ctx.params.id;
        try {
            let managerSingle = await ManagerModel.single(id);
            ctx.body = managerSingle
            ctx.status = 200
        } catch (error) {
            ctx.body = '获取失败';
            ctx.status = err.status || 500;
        }
    },
    managerAdd: async (ctx, next) => {  //新增管理员数据
        //获取输入的信息
        //需要安装插件koa-bodyParser
        let name = ctx.request.body.name;
        let phone = ctx.request.body.phone;
        let password = ctx.request.body.password;
        //判断输入值
        if (!name || !phone || !password) {
            return ctx.body = '缺少参数'
        }
        
        try {
            await ManagerModel.insert({ name, phone, password })
            //返回状态码
            ctx.status = 200
            ctx.body = '新增成功'
        } catch (err) {
            ctx.body = '增加失败';
            ctx.status = err.status || 0;
        }
    },
    managerEdit: async (ctx, next) => {
        let pathId = ctx.params.id;
        let name = ctx.request.body.name;
        let phone = ctx.request.body.phone;
        let password = ctx.request.body.password;
        //判断输入值
        if (!name || !phone || !password) {
            return ctx.body = '缺少参数'
        }

        try {
            //获取需要修改的ID 进行更改
            await ManagerModel.updated(pathId,{ name, phone, password })
            //返回状态码
            ctx.status = 200
            ctx.body = '新增成功'
        } catch (err) {
            ctx.body = '增加失败';
            ctx.status = err.status || 0;
        }
    },
    managerDelete: async (ctx, next) => {
        let pathId = ctx.params.id;
        try {
            //获取需要修改的ID 进行更改
            await ManagerModel.deleteDate(pathId)
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