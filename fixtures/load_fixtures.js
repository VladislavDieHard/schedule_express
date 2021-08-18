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
                if (item.password !== undefined) {item.password = cryptography.cipherPass(item.password)}
                model.create(item);
            });
        });
    }
}

async function loadFixture() {
    await fixturesLoad.addData();
}

module.exports = loadFixture;