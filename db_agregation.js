const sqlite3 = require('sqlite3').verbose();

function getData(sql, callback) {
    const db = new sqlite3.Database('db.sqlite3');
    let data;
    db.all(sql, (err, rows) => {
        return callback(err, rows);
    });
    db.close();
}

exports.db = getData;