const sequelize = require('../models');

async function create(req, permissions) {
    return new Promise(function (resolve, reject) {
        if (contains(Object.keys(req.data), permissions[req.model])) {
            try {
                resolve(sequelize.models[req.model].create(req.data));
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