const crypto = require('crypto');
const fs = require('fs');
const env = JSON.parse(fs.readFileSync('../env.json', 'utf8'));

const cryptography = {
    createToken(user) {
        let login = user.login;
        let dateTime = new Date().toISOString();
        let token = `${login}/${dateTime}`;

        return crypto.createHmac('sha256', env.cryptoKey)
            .update(token)
            .digest('hex');
    },

    cipherPass(pass) {
        const cipher = crypto.createCipher('aes192', env.cryptoKey);
        let encrypted = cipher.update(pass,'utf8','hex');

        encrypted = encrypted + cipher.final('hex');

        return encrypted;
    },

    decipherPass(pass) {
        const decipher = crypto.createDecipher('aes192', env.cryptoKey);
        let decrypted = decipher.update(pass,'hex','utf8');

        decrypted = decrypted + decipher.final('utf8');

        return decrypted;
    }
}

module.exports = cryptography