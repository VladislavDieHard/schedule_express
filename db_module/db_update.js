const db = require('./db_connect');

const dbUpdate = {
    async dbUpdate(table, id, data) {
        let SQL = this.sqlConstructor(table, data, id);
        let result = await this.updateDataForDB(SQL);
        return result;
    },

    sqlConstructor(table, data, id) {
        let customSQL;
        let entries = Object.entries(data);
        let updateData = [];
        entries.forEach((item) => {
            updateData.push(item.join(' = '))
        })
        customSQL = `UPDATE ${table} SET ${updateData.join(',')} WHERE id = '${id}'`
        return customSQL;
    },

    updateDataForDB(sql) {
        db.run(sql, (err) => {
            return !err;
        });
    }
}

module.exports = dbUpdate;