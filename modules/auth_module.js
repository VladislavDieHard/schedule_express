const dbApi = require('./db_module');
const crypto = require('crypto');
const fs = require('fs');
const settings = JSON.parse(fs.readFileSync('./settings/settings.json', 'utf8'));

const auth = {
    async auth(user, admin = false) {
        let userDB;
        if (admin) {
            userDB = await dbApi.getModerator(user.login, true);
        } else {
            userDB = await dbApi.getUser(user.login, true);
        }

        let token;
        if (userDB !== null) {
            let password = this.decipherPass(userDB.password);
            if (user.password === password) {
                token = this.createToken(user);
                let data = {
                    login: userDB.login,
                    token: token,
                    date: new Date().toISOString(),
                    relation: userDB.relation
                }
                if (admin === false) {
                    await dbApi.addUserSession(data, admin);
                } else {
                    await dbApi.addUserSession(data, admin);
                }
            } else {
                token = null;
            }
        } else {
            token = null;
        }

        return token;
    },

    async authUser(token, admin = false) {
        const session = await dbApi.getUserToken(token, admin);
        let authenticated = {};
        if (session !== undefined) {
            const sessionTime = 1000 * 60 * settings.sessionTime;
            const sessionDate = +new Date(session.date);
            const now = +new Date();
            if (((now - sessionDate) / 1000 / 60) <= (sessionTime / 1000 / 60)) {
                authenticated.verify = true;
                authenticated.login = session.login;
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
        const decipher = crypto.createDecipher('aes192',settings.password);
        let decrypted = decipher.update(pass,'hex','utf8');

        decrypted = decrypted + decipher.final('utf8');

        return decrypted;
    }
}

module.exports = auth;