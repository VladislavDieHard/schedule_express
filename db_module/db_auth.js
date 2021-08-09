const db = require('./db_connect');
const dbUpdate = require('./db_update');
const dbSelect = require('./db_select');
const dbDelete = require('./db_delete');
const dbInsert = require('./db_insert');

const dbAuth = {
    async addUser(data) {
        return await dbInsert.dbInsert('users', data);
    },

    async getUser(login) {
        return await dbSelect.getUser(login);
    },

    async addSession(data) {
        return await dbInsert.dbInsert('user_sessions', data);
    },

    async getSession(token) {
        return await dbSelect.getSession(token);
    },
}

module.exports = dbAuth;