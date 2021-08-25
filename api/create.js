const sequelize = require('../models');
const crypto = require("../modules/crypto")

async function create(req, permissions) {
    return new Promise(function (resolve, reject) {
        if (contains(Object.keys(req.data), permissions[req.model])) {
            try {
                if (req.data.password){
                    let password = req.data.password
                    req.data.password= crypto.cipherPass(password)
                }
                sequelize.models[req.model].create(req.data)
                    .then((result) => {resolve(result)})
                    .catch((e) => {reject(e)})
            } catch (e) {

                reject(e);
            }
        } else {
            reject(new Error('Have not permission for model attributes'));
        }
    });
} 

function contains(where, what) {
    for ( let i=0; i < what.length; i++ ) {
        if ( where.indexOf(what[i]) == -1 ) return false;
    }
    return true;
}

module.exports = create;