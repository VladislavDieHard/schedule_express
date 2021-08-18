const sequelize = require('../models');

async function get(req, permissions) {
    if (contains(Object.keys(req.data), permissions[req.model])) {
        let result = await sequelize.models[req.model].findAll({
            where: {
                SchoolId: req.SchoolId
            }
        });
        if (result === null) {
            return new Error('Has no matches');
        } else {
            return result;
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

module.exports = get;