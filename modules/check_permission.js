const sequelize = require('../models');

async function checkPermission(token) {
    let result = await sequelize.models.Session.findOne({
        where: {
            token: token
        },
        attributes: ['adminPermissions']
    });
    if (result !== null) {
        return result.dataValues.adminPermissions;
    } else {
        return new Error('token not found');
    }
}

module.exports = checkPermission;