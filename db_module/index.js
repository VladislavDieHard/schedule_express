const dbUpdate = require('./db_update');
const dbSelect = require('./db_select');
const dbDelete = require('./db_delete');
const dbInsert = require('./db_insert');
const dbAuth = require('./db_auth');
const dbToken = require('./db_token');

const dbApi = {
    get: dbSelect,
    update: dbUpdate,
    delete: dbDelete,
    add: dbInsert,
    auth: dbAuth,
    token: dbToken
}

module.exports = dbApi;