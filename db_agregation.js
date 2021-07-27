const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');

const dbApi = {
    dbGet(sql, some = true) {
        return new Promise((resolve, reject) => {
            let data = [];
            if (some) {
                db.all(sql, (err, rows) => {
                    if (err) {
                        return reject(!err);
                    }
                    data = rows;
                    resolve(data);
                });
            } else {
                db.get(sql, (err, row) => {
                    if (err) {
                        return reject(!err);
                    }
                    data = row;
                    resolve(data);
                });
            }
        });
    },

    // Updates

    async updatePassword(password, login) {
        let customSQL = `UPDATE users SET password=${password} WHERE login=${login}`
        db.run(customSQL, (err) => {
            return !err;
        });
    },

    async updateData(table, data, id) {
        let customSQL = `
        UPDATE ${table}
         
        SET
         name=${data.name},
          is_deleted=${data.is_deleted}
          
        WHERE id=${id}`;

        db.run(customSQL, (err) => {
            return !err;
        });
    },

    //

    async addUserSession(data, admin) {
        let table;
        if (admin) {
            table = 'moderator_sessions';
        } else {
            table = 'user_sessions';
        }
        let customSQL = (`INSERT INTO ${table} (login, token, date, relation)
     VALUES (
     '${data.login}',
      '${data.token}',
       '${data.date}',
        '${data.relation}')`
        );
        db.run(customSQL, (err) => {
            return !err;
        });
    },

    async getAllTablesData(relation) {
        const objectTypes = ['teachers', 'classes', 'lessons'];
        let data = [];
        for (let i = 0; i <= objectTypes.length - 1; i++) {
            let customSQL = `SELECT * FROM ${objectTypes[i]}_${relation}`;
            data.push(await this.dbGet(customSQL, true));
        }
        return data;
    },

    async getUserToken(token, admin) {
        let table;
        if (admin) {
            table = 'moderator_sessions';
        } else {
            table = 'user_sessions';
        }
        let customSQL = `SELECT * FROM ${table} WHERE token = '${token}'`;
        return await this.dbGet(customSQL, false);
    },

    async getUser(login) {
        let customSQL = `SELECT * FROM users WHERE login = '${login}'`;
        return await this.dbGet(customSQL, false);
    },

    async createUser(user) {
        let customSQL = (`INSERT INTO users (username, login, password, relation)
        VALUES (
         '${user.username}',
          '${user.login}',
           '${user.password}',
            '${user.relation}')`
            );
        db.run(customSQL, (err) => {
            return !err;
        });
    },

    ///// Models methods

    async addModel(model, data, user) {
        let rel = await this.getUserRelations(user);
        let customSQL = (`INSERT INTO ${model}_${rel} (name)
        VALUES (
         '${data}');`
        );

        db.run(customSQL, (err) => {
            return !err;
        });
    },

    async getData(model, user) {
        let rel = await this.getUserRelations(user);
        let customSQL = `SELECT * FROM ${model}_${rel}`;
        return await this.dbGet(customSQL, true);
    },

    /////

    ///// Relations methods

    async relationGet(user, table, model, id) {
        let rel = await this.getUserRelations(user);
        let customSQL = (`SELECT * FROM ${table}_${rel} WHERE ${model}=${id}`);
        return await this.dbGet(customSQL, true);
    },

    async relationClassAdd(table, data, user) {
        let rel = await this.getUserRelations(user);
        let customSQL = (`INSERT INTO ${table}_${rel} (class, lesson, hours)
        VALUES (
         '${data.class}',
         '${data.lesson}',
         '${data.hours}')`
        );

        db.run(customSQL, (err) => {
            return !err;
        });
    },

    async relationTeacherAdd(table, data, user) {
        let rel = await this.getUserRelations(user);
        let customSQL = (`INSERT INTO ${table}_${rel} (teacher, lesson)
        VALUES (
         '${data.teacher}',
         '${data.lesson}')`
        );

        db.run(customSQL, (err) => {
            return !err;
        });
    },

    /////

    ///// Service methods

    async getUserRelations(user) {
        let customSQL = (`SELECT relation FROM users WHERE login = '${user}'`);
        return await this.dbGet(customSQL, false);
    },
}

module.exports = dbApi;