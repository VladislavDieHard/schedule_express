const models = require('../models/models');

async function get(req, permissions) {
    if (req.includeRelations) {

    } else {
        if (contains(Object.keys(req.data), permissions[req.model])) {

        }
    }
}

function contains(where, what){
    for(let i=0; i<what.length; i++){
        if(where.indexOf(what[i]) == -1) return false;
    }
    return true;
}

module.exports = get;