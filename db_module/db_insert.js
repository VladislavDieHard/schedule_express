const db = require('./db_connect');

const dbInsert = {
    async dbInsert(table, data) {
        let SQL = this.sqlConstructor(table, data);
        let result = await this.updateDataForDB(SQL);
        return result;
    },

    sqlConstructor(table, data) {
        let customSQL;
        let entries = Object.entries(data);
        let insertColumns = [];
        let insertData = [];
        entries.forEach((item) => {
            insertColumns.push(item[0]);
            insertData.push(`'${item[1]}'`);
        })
        customSQL = `INSERT INTO ${table} (${insertColumns.join(',')}) VALUES (${insertData.join(',')})`
        return customSQL;
    },

    updateDataForDB(sql) {
        db.run(sql, (err) => {
            return !err;
        });
    }
}

module.exports = dbInsert;