const models = require('../models/models');
const fs = require('fs');
const cryptography = require('../modules/crypto')
const fixtures = JSON.parse(fs.readFileSync('./fixtures.json', 'utf8'));

const modelTypes = {
    'User': models.User,
    'Class': models.Class,
    'Teacher': models.Teacher,
    'Lesson': models.Lesson,
    'Session': models.Session
}

const fixturesLoad = {
    addData() {
        let data = fixtures;

        Object.keys(data).forEach((key) => {
            let model = modelTypes[key]
            data[key].forEach((item) => {
                model.create({
                    login: item.login,
                    password: cryptography.cipherPass(item.password),
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    isAdmin: item.isAdmin,
                    isDeleted: item.isDeleted,
                });
            });
        });
    }
}

async function loadFixture() {
    fixturesLoad.addData();
}

loadFixture().then()