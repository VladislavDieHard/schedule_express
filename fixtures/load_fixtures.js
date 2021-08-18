const sequelize = require('../models');
const fs = require('fs');
const cryptography = require('../modules/crypto');
const path = require('path');
const fixtures = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures.json'), 'utf8'));

const fixturesLoad = {
    addData() {
        let data = fixtures;

        Object.keys(data).forEach((key) => {
            let model = sequelize.models[key]
            data[key].forEach((item) => {
                model.create({
                    login: item.login,
                    password: cryptography.cipherPass(item.password.toString()),
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    isAdmin: item.isAdmin,
                    isDeleted: item.isDeleted,
                    SchoolId: item.SchoolId
                });
            });
        });
    }
}

async function loadFixture() {
    await fixturesLoad.addData();
}

module.exports = loadFixture;