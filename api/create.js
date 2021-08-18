const models = require('../models/models');

async function create(req, permissions) {
    if (contains(Object.keys(req.data), permissions[req.model])) {
        let result = (await models[req.model].create(req.data)).dataValues;
        if (result !== null) {
            return true;
        }
    } else {
        return new Error('Have not permission for model attributes');
    }
}

function contains(where, what){
    for(let i=0; i<what.length; i++){
        if(where.indexOf(what[i]) == -1) return false;
    }
    return true;
}

module.exports = create;