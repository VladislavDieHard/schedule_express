const sequelize = require('../models');

const get = {
    getOne(req, permission) {
        return new Promise((resolve, reject) => {
            sequelize.models[req.model].findOne({
                where: {...req.where, isDeleted: false},
                attributes: permission[req.model],
                include: req.include
            }).toJSON()
                .then((result) => {resolve(result);})
                .catch((err) => {reject(err);});
        });
    },

    getAll(req, permission) {
        return new Promise((resolve, reject) => {
            sequelize.models[req.model].findAll({
                where: {...req.where, isDeleted: false},
                attributes: permission[req.model],
                include: req.include
            })
                .then((result) => {resolve(result);})
                .catch((err) => {reject(err);});
        });
    }
}

module.exports = get;
