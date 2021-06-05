const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');

const dbApi = {
    dbConnect(sql, some = true) {

    },

    updateData() {

    },
}

function dbConnect(sql, some = true) {
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
            db.get(sql, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                data = rows;
                resolve(data);
            });
        }
    });
}

async function updateData() {

}

async function getData(sql, some) {
    let data = await dbConnect(sql, some);
    return data;
}

exports.db = getData;