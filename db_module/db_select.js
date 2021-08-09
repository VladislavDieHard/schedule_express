const db = require('./db_connect');

const dbSelect = {
    async dbGet(table, id, isAdmin) {
        let SQL = this.sqlConstructor(table, id, isAdmin);
        try {
            return await this.selectFromDB(SQL);
        } catch (e) {
            return e;
        }
    },

    sqlConstructor(table, id, isAdmin) {
        console.log(id)
        console.log(isAdmin)
        let customSQL;

        customSQL = `SELECT * FROM ${table}`;
        if(id) customSQL
        if (isAdmin) customSQL += ''
        // if (id === undefined || id === null) {
        //     customSQL = `SELECT * FROM ${table} ${deleteShow}`
        // } else {
        //     customSQL = `SELECT * FROM ${table} WHERE id = '${id}' AND is_deleted = '0'`
        // }

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
            return await this.selectFromDB(
             `SELECT ${table}
             FROM user_to_tables
             WHERE user_id='${userId}'`);
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