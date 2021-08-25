const cryptoJS = require('crypto-js');
require('dotenv').config();

const cryptography = {
    createToken(user) {
        let login = user.login;
        let dateTime = new Date().toISOString();
        let token = `${login}/${dateTime}`;
        return cryptoJS.SHA256(token).toString();
    },

    cipherPass(pass) {
        return cryptoJS.DES.encrypt(pass, process.env['SECRET_KEY']).toString();
    },

    decipherPass(pass) {
        let bytes = cryptoJS.DES.decrypt(pass, process.env['SECRET_KEY']);
        return bytes.toString(cryptoJS.enc.Utf8);
    }
}

module.exports = cryptography