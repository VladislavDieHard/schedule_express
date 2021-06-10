const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');

const dbApi = {
    dbConnect(sql, some = true) {
        return new Promise((resolve, reject) => {
            let data = [];
            if (some) {
                db.all(sql, (err, rows) => {
                    if (err) {
                        return reject(err);
                    }
                    data = rows;
                    resolve(data);
                });
            } else {
                db.get(sql, (err, row) => {
                    if (err) {
                        console.log(err);
                    }
                    data = row;
                    resolve(data);
                });
            }
        });
    },

    async addSession(data) {
        let customSQL = (`INSERT INTO user_sessions (login, token, date, relation)
     VALUES (
     '${data.login}',
      '${data.token}',
       '${data.date}',
        '${data.relation}')`
        );
        db.run(customSQL);
    },

    async getToken(token) {
        let customSQL = `SELECT * FROM user_sessions WHERE token = '${token}'`;
        return await this.dbConnect(customSQL, true);
    },

    async getUser(login) {
        let customSQL = `SELECT * FROM users WHERE login = '${login}'`;
        return await this.dbConnect(customSQL, false);
    },

    async getData(object, some) {
        let customSQL = 'SELECT * FROM ' + object;
        return await this.dbConnect(customSQL, some);
    },

}

module.exports = dbApi;