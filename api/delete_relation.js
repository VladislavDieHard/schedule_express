const sequelize = require('../models');

function deleteRelation(req) {
    return new Promise(async (resolve, reject) => {
        let fromModel = await sequelize.models[req.fromModel.name].findOne({include: "Relation", where: {id: req.fromModel.id}});
        let toModel = await sequelize.models[req.toModel.name].findOne({raw: true, where: {id: req.toModel.id}});
        console.log(fromModel)
        console.log(toModel)
        fromModel.removeRelation(toModel)
            .then((result) => {resolve(Boolean(result))})
            .catch((err) => {reject(err)});
    })
}

module.exports = deleteRelation;