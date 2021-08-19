const sequelize = require('../models');

// async function get(req, permissions) { // Request model
//
//     if (contains(Object.keys(req.data), permissions[req.model])) {
//         let result = await sequelize.models[req.model].findAll({
//             where: {
//                 SchoolId: req.SchoolId
//             }
//         });
//         if (result === null) {
//             return new Error('Has no matches');
//         } else {
//             return result;
//         }
//     } else {
//         return new Error('Have not permission for model attributes');
//     }
// }

const get = {
    async getOne(req, permission) {
        try {
            return sequelize.models[req.model].findOne({
                where: req.where,
                attributes: permission[req.model],
                include: req.include
            }).toJSON();
        } catch (e) {
            return e;
        }
    },

    async getAll(req, permission) {
        try {
            return await sequelize.models[req.model].findAll({
                where: req.where,
                attributes: permission[req.model],
                include: sequelize.models[req.includeModel]
            });
        } catch (e) {
            return e;
        }
    }
}

module.exports = get;