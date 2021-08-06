const db = require('./db_connect');

async function confirmToken(token, isAdmin) {
    let result = await getToken(token, isAdmin);
    return Boolean(result);
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
        db.all(SQL, (err, rows) => {
            if (err) {
                return reject(err);
            }
            data = rows;
            resolve(data);
        });
    });
}

module.exports = confirmToken;