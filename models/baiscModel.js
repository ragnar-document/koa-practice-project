const knex = require('./knex');

class Base {
    constructor(props) {
        this.table = props;
    }
    // 获取所有信息
    getAll() {
        return knex(this.table).whereNull('isdeleted').select();
    }
    //获取单个信息
    single(id) {
        return knex(this.table).where('id', '=', id).select();
    }
    // 插入获取数据 @params 
    insert(params) {
        return knex(this.table).insert(params);
    }
    // 更新数据
    updated(id,params) {
        return knex(this.table).where('id', '=', id).update(params);
    }
    // 软删除数据 
    deleteDate(id) {
        return knex(this.table).where('id', '=', id).update({ isdeleted: 1 })
    }

}

module.exports = Base