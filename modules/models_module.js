const dbApi = require('../db_module');

const Models = {
    async getUserTableName(userId) {
        return await dbApi.get.getTableName(this.table, userId);
    },

    async addUser() {

    },

    async deleteUser() {

    },

    async updateUser() {

    },

    async getUser() {
        try {
            let userObj = await dbApi.get.dbGet(this.table, id, isAdmin);
            let result = [];
            userObj.forEach((item) => {
                result.push({
                    id: item.id,
                    username: item.username,
                    login: item.login,
                    is_deleted: item.is_deleted,
                })
            });
            return result;
        } catch (e) {
            return e;
        }
    },

    async add(data, userId) {
        try {
            let table = await this.getUserTableName(userId);
            return await dbApi.add.dbInsert(table, data);
        } catch (e) {
            return e;
        }
    },

    async get(id, userId, isAdmin){
        try {
            let table = await this.getUserTableName(userId);
            return await dbApi.get.dbGet(table, id, isAdmin);
        } catch (e) {
            return e;
        }
    },

    async update(id, data, userId, isAdmin){
        try {
            let table = await this.getUserTableName(userId);
            return await dbApi.update.dbUpdate(table, id, data);
        } catch (e) {
            return e;
        }
    },

    async delete(id, userId, isAdmin){
        try {
            let table = await this.getUserTableName(userId);
            return await dbApi.delete.dbDelete(table, id);
        } catch (e) {
            return e;
        }
    },
}

module.exports = Models;