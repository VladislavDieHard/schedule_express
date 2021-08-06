const db = require('./db_connect');

const dbDelete = {
    async dbDelete(table, id) {
        let SQL = this.sqlConstructor(table, id);
        let result = await this.deleteDataFromDB(SQL);
        console.log(SQL)
        return result;
    },

    sqlConstructor(table, id) {
        let customSQL;
        customSQL = `UPDATE ${table} SET is_deleted = '1' WHERE id = '${id}'`
        return customSQL;
    },

    deleteDataFromDB(sql) {
        db.run(sql, (err) => {
            return !err;
        });
    }
}

module.exports = dbDelete;