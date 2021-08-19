const sequelize = require('../models');

async function update(req, permissions) {
    return new Promise(async function (resolve, reject) {
        if (contains(permissions[req.model], Object.keys(req.data))) {
            resolve(Boolean((await sequelize.models[req.model].update(req.data, {where: req.where}))[0]));
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

module.exports = update;