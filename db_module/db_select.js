const db = require('./db_connect');

const dbSelect = {
    async dbGet(table, id, userLogin) {
        let SQL = this.sqlConstructor(table, id, userLogin);
        let result = await this.selectFromDB(SQL);
        return result;
    },

    sqlConstructor(table, id, userLogin) {
        let customSQL;
        if (userLogin !== undefined || null) {
            return `SELECT relation FROM users WHERE login='${userLogin}'`
        }
        if (id === undefined || id === null) {
            customSQL = `SELECT * FROM ${table} WHERE is_deleted = '0'`
        } else {
            customSQL = `SELECT * FROM ${table} WHERE id = '${id}' AND is_deleted = '0'`
        }
        return customSQL;
    },

    selectFromDB(sql) {
        return new Promise((resolve, reject) => {
            let data = [];
            db.all(sql, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                data = rows;
                resolve(data);
            });
        });
    },

    async getSession(table, token) {
        let result = await this.selectFromDB(`SELECT * FROM ${table} WHERE token='${token}'`);
        return result;
    },

    async getUser(table, login) {
        let result = await this.selectFromDB(`SELECT * FROM ${table} WHERE login='${login}'`);
        return result;
    }
}

module.exports = dbSelect;