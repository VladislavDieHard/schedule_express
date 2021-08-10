const dbApi = require('../db_module');
const crypto = require('crypto');
const fs = require('fs');
const settings = JSON.parse(fs.readFileSync('./settings/settings.json', 'utf8'));

const auth = {
    authDB: dbApi.auth,

    async auth(user) {
        let userDB;
        userDB = await this.authDB.getUser(user.login);
        if (Boolean(userDB.is_deleted)) {
            return false;
        }

        let token;
        if (userDB[0] !== null) {
            let password = this.decipherPass(userDB[0].password);
            if (user.password === password) {
                token = this.createToken(user);
                let data = {
                    login: userDB[0].login,
                    token: token,
                    date: new Date().toISOString(),
                    is_admin: userDB[0].is_admin
                }
                await this.authDB.addSession(data);

            } else {
                token = null;
            }
        } else {
            token = null;
        }

        return token;
    },

    async authToken(token) {
        const session = await this.authDB.getSession(token);
        let authenticated = {};
        if (session[0] !== undefined) {
            const sessionTime = 1000 * 60 * settings.sessionTime;
            const sessionDate = +new Date(session[0].date);
            const now = +new Date();
            if (((now - sessionDate) / 1000 / 60) <= (sessionTime / 1000 / 60)) {
                authenticated.verify = true;
                authenticated.login = session[0].login;
                authenticated.is_admin = Boolean(session[0].is_admin);
                return authenticated
            } else {
                authenticated.verify = false;
                return authenticated;
            }
        } else {
            authenticated.verify = false;
            return authenticated;
        }
    },

    createToken(user) {
        let login = user.login;
        let dateTime = new Date().toISOString();
        let token = `${login}/${dateTime}`;

        const secret = settings.password;
        const hash = crypto.createHmac('sha256',secret)
            .update(token)
            .digest('hex');

        return hash;
    },

    cipherPass(pass) {
        const cipher = crypto.createCipher('aes192',settings.password);
        let encrypted = cipher.update(pass,'utf8','hex');

        encrypted = encrypted + cipher.final('hex');

        return encrypted;
    },

    decipherPass(pass) {
        const decipher = crypto.createDecipher('aes192', settings.password);
        let decrypted = decipher.update(pass,'hex','utf8');

        decrypted = decrypted + decipher.final('utf8');

        return decrypted;
    }
}

// function cipherPass(pass) {
//     const cipher = crypto.createCipher('aes192',settings.password);
//     let encrypted = cipher.update(pass,'utf8','hex');
//
//     encrypted = encrypted + cipher.final('hex');
//
//     return encrypted;
// }
//
// console.log(cipherPass('test_password'));

module.exports = auth;