const dbApi = require('../db_module');

const Models = {
    async getUserTag(user) {
        let tag = await dbApi.get.dbGet(`users`, user.login);
        return tag[0].relation;
    },

    async add(data, user, isRelation) {
        let tag = await this.getUserTag(user);
        if (isRelation) {
            return await dbApi.add.dbInsert(`${this.relationModel}_${tag}`, data)
        } else {
            return await dbApi.add.dbInsert(`${this.tableModel}_${tag}`, data)
        }
    },

    async get(id, user, isRelation){
        let tag = await this.getUserTag(user);
        if (isRelation) {
            return await dbApi.get.dbGet(`${this.relationModel}_${tag}`, id)
        } else {
            return await dbApi.get.dbGet(`${this.tableModel}_${tag}`, id)
        }
    },

    async update(id, data, user, isRelation){
        let tag = await this.getUserTag(user);
        if (isRelation) {
            return await dbApi.update.dbUpdate(`${this.relationModel}_${tag}`, id, data)
        } else {
            return await dbApi.update.dbUpdate(`${this.tableModel}_${tag}`, id, data)
        }
    },

    async delete(id, user, isRelation){
        let tag = this.getUserTag(user);
        if (isRelation) {
            return await dbApi.delete.dbDelete(`${this.relationModel}_${tag}`, id)
        } else {
            return await dbApi.delete.dbDelete(`${this.tableModel}_${tag}`, id)
        }
    },
}

module.exports = Models;