const models = require('../models/models');
const checkPermission = require('../modules/check_permission');
const fs = require('fs');
const permissions = JSON.parse(fs.readFileSync('../permissions.json'))

const index = {
    permissions: permissions,

    permission: null,

    async create(req) {
        checkPermission(req.token).then(console.log)
    },

    async update(req) {

    },

    async get(req) {

    }
}

module.exports = index;