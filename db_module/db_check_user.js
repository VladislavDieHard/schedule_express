const db = require('./db_connect');

async function confirmToken(token) {
    try {
        return await dbCall(`SELECT EXISTS (SELECT * FROM user_sessions WHERE token = '${token}')`);
    } catch (e) {
        return false;
    }
}

async function userCheck(login) {
    try {
        return await dbCall(`SELECT is_admin FROM user_sessions WHERE login = '${login}'`);
    } catch (e) {
        return false;
    }
}

async function permissionCheck(login, token) {
    return {
        userCheck: await userCheck(login),
        tokenCheck: await confirmToken(token)
    }
}

function dbCall(SQL) {
    return new Promise((resolve, reject) => {
        let data;
        db.all(SQL, (e, rows) => {
            if (e) {
                reject(e);
            } else if (!Object.values(rows[0])[0]) {
                reject('unrecognized token');
            } else {
                data = Object.values(rows[0])[0];
                resolve(Boolean(data));
            }
        });
    });
}

module.exports = permissionCheck;