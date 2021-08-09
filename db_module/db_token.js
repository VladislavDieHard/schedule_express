const db = require('./db_connect');

async function confirmToken(token, isAdmin) {
    try {
        return await getToken(token, isAdmin);
    } catch (e) {
        return false;
    }
}

function getToken(token, isAdmin) {
    let SQL;
    if (isAdmin) {
        SQL = `SELECT EXISTS (SELECT * FROM moderator_sessions WHERE id = '${token}')`;
    } else {
        SQL = `SELECT EXISTS (SELECT * FROM user_sessions WHERE token = '${token}')`;
    }
    return new Promise((resolve, reject) => {
        let data;
        db.all(SQL, (e, rows) => {
            if (e) {
                reject(e);
            } else if (!rows[0][SQL.substr(7)]) {
                reject('unrecognized token');
            } else {
                data = rows;
                resolve(data);
            }
        });
    });
}

module.exports = confirmToken;