const db = require('./db_connect');

const dbSelect = {
    async dbGet(table, model, id, isAdmin) {
        let SQL = this.sqlConstructor(table, model, id, isAdmin);
        try {
            return await this.selectFromDB(SQL);
        } catch (e) {
            return e;
        }
    },

    sqlConstructor(table, model, id, isAdmin) {
        let customSQL;

        console.log('isAdmin');
        console.log(isAdmin);
        if (isAdmin) {
            customSQL = `SELECT ${Object.keys(model.rows)} FROM ${table}`;
        } else {
            let rows = [];
            Object.keys(model.rows).forEach((item) => {
                if (!model.rows[item].permission) {
                    rows.push(item);
                }
            });
            customSQL = `SELECT ${rows} FROM ${table} WHERE is_deleted = '0'`;
        }

        return customSQL;
    },

    selectFromDB(sql) {
        return new Promise((resolve, reject) => {
            let data = [];
            db.all(sql, (e, rows) => {
                if (e) {
                    return reject(e);
                } else if (rows.length === 0) {
                    return reject(`no matches found for ${sql}`);
                } else {
                    data = rows;
                    console.log(data)
                    resolve(data);
                }
            });
        });
    },

    async getSession(token) {
        try {
            return await this.selectFromDB(`SELECT * 
                FROM user_sessions 
                WHERE token='${token}'`
            );
        } catch (e) {
            return e;
        }
    },

    async getTableName(table, userId) {
        try {
            let result = await this.selectFromDB(
                `SELECT ${table}
             FROM user_to_tables
             WHERE user_id='${userId}'`);
            return result[0][table]
        } catch (e) {
            return e;
        }
    },

    async getUser(login) {
        try {
            return await this.selectFromDB(
                `SELECT * 
                FROM users 
                WHERE login='${login}'`
            );
        } catch (e) {
            return e;
        }
    }
}

module.exports = dbSelect;