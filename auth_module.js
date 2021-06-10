const dbApi = require('./db_agregation');
const crypto = require('crypto');
const fs = require('fs');
const settings = JSON.parse(fs.readFileSync('./settings/settings.json', 'utf8'));

const auth = {
    async auth(user) {
        const users = await dbApi.getData('users');
        let token;

        let authUser;
        users.forEach((item) => {
            if (item.login === user.login) {
                authUser = item;
            } else {
                authUser = null;
            }
        });

        if (authUser !== null) {
            let password = this.decipherPass(authUser.password);
            if (user.password === password) {
                token = this.createToken(user);
                let data = {
                    login: authUser.login,
                    token: token,
                    date: new Date().toISOString(),
                    relation: authUser.relation
                }
                await dbApi.addSession(data);
            } else {
                token = null;
            }
        } else {
            token = null;
        }

        return token;
    },

    async authUser(token) {
        const session = await dbApi.getToken(token);
        const sessionTime = 1000 * 60 * settings.sessionTime;
        const sessionDate = +new Date(session[0].date);
        const now = +new Date();
        let authenticated = {}
        if (session !== null) {
            if (((now - sessionDate) / 1000 / 60) <= (sessionTime / 1000 / 60)) {
                authenticated.verify = true;
                authenticated.relation = session[0].relation;
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