const db = require('./db_connect');
const dbUpdate = require('./db_update');
const dbSelect = require('./db_select');
const dbDelete = require('./db_delete');
const dbInsert = require('./db_insert');

const dbAuth = {
    async addUser(data, isAdmin) {
        if (isAdmin) {
            return await dbInsert.dbInsert('moderators', data)
        } else {
            return await dbInsert.dbInsert('users', data)
        }
    },

    async addSession(data, isAdmin) {
        if (isAdmin) {
            return await dbInsert.dbInsert('moderator_sessions', data)
        } else {
            return await dbInsert.dbInsert('user_sessions', data)
        }
    },

    async getUser(login, isAdmin) {
        if (isAdmin) {
            return await dbSelect.getUser('moderators', login)
        } else {
            return await dbSelect.getUser('users', login);
        }
    },

    async getSession(token, isAdmin) {
        if (isAdmin) {
            return await dbSelect.getSession('moderator_sessions', token)
        } else {
            return await dbSelect.getSession('user_sessions', token)
        }
    },
}

module.exports = dbAuth;