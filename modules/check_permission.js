const models = require('../models/models');

async function checkPermission(token) {
    let result = await models.Session.findOne({
        where: {
            token: token
        },
        attributes: ['adminPermissions']
    });
    if (result !== null) {
        return result.dataValues;
    } else {
        return '';
    }
}

module.exports = checkPermission;