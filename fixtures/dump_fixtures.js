const models = require('../models/models');
const fs = require('fs');
const cryptography = require('../modules/crypto')
const fixtures = JSON.parse(fs.readFileSync('./fixtures.json', 'utf8'));

const fixturesLoad = {
    async dumpData() {
        let data = {
            'User': [],
            'Lesson': [],
            'Teacher': [],
            'Class': [],
        };

        const users = await models.User.findAll({});
        if (users !== null) {
            users.forEach((item) => {
                cryptography.decipherPass(item.dataValues.password);
                data['User'].push(item.dataValues);
            });
        }
        const lessons = await models.User.findAll({});
        if (lessons !== null) {
            lessons.forEach((item) => {
                data['Lesson'].push(item.dataValues);
            });
        }
        const teachers = await models.User.findAll({});
        if (teachers !== null) {
            teachers.forEach((item) => {
                data['Teacher'].push(item.dataValues);
            });
        }
        const classes = await models.User.findAll({});
        if (classes !== null) {
            users.forEach((item) => {
                data['Class'].push(item.dataValues);
            });
        }

        let date = new Date().toISOString()

        // try {
        //     fs.writeFileSync(`fixtures_${date}.json`, JSON.stringify(data))
        //     console.log('файл успешно перезаписан')
        // } catch (err) {
        //     console.error(err)
        // }
    }
}

async function dumpFixture() {
    fixturesLoad.dumpData().then();
}

dumpFixture().then()