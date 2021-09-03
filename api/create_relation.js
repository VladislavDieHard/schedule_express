const sequelize = require('../models');

async function createRelation(req) {
    return new Promise(async (resolve, reject) => {
        let fromModel = await sequelize.models[req.fromModel.name].findOne({where: {id: req.fromModel.id}});
        let toModel = await sequelize.models[req.toModel.name].findOne({where: {id: req.toModel.id}});
        fromModel.addRelation(toModel, {through: {hours: req.toModel.hours}})
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
}

module.exports = createRelation;