const sequelize = require('../models');

async function update(req, permissions) {
    console.log(req)
    let fstTarget = await sequelize.models[req.fstModel].findOne({
        where: {
            id: req.data.fstId
        }
    });
    let secTarget = await sequelize.models[req.secModel].findOne({
        where: {
            id: req.data.secId
        }
    });
    let result = await fstTarget.addLessons(secTarget);
    console.log(result);
    return result;
}

module.exports = update;