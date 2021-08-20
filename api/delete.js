const sequelize = require('../models');

async function deleteItem(req) {
    return new Promise(function (resolve, reject) {
        sequelize.models[req.model].update({isDeleted: req.isDeleted}, {where: req.where})
            .then((result) => {resolve(result)})
            .catch((err) => {reject(err)});
    });
}

module.exports = deleteItem;