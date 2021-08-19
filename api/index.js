const checkPermission = require('../modules/check_permission');
const fs = require('fs');
const path = require('path');
const permissions = JSON.parse(fs.readFileSync(path.join(__dirname, 'permissions.json'), 'utf8'));
const create = require('./create');
const update = require('./update');
const get = require('./get');

const index = {
    permissions: permissions,

    permission: null,

    async create(req) {
        return new Promise((resolve, reject) => {
            if (checkPermission(req.token)) {
                if (this.permissions.admin.availableModels.includes(req.model)) {
                    create(req, permissions.admin.createAttributes)
                        .then((result) => {resolve(result)})
                        .catch((err) => {reject(err)});
                } else {
                    reject(new Error('Not permission for model'));
                }
            } else {
                if (this.permissions.user.availableModels.includes(req.model)) {
                    create(req, permissions.user.createAttributes)
                        .then((result) => {resolve(result)})
                        .catch((err) => {reject(err)});
                } else {
                    reject(new Error('Not permission for model'));
                }
            }
        });
    },

    async update(req) {
        return new Promise((resolve, reject) => {
            if (checkPermission(req.token)) {
                if (this.permissions.admin.availableModels.includes(req.model)) {
                    console.log(req)
                    update(req, permissions.admin.updateAttributes)
                        .then((result) => {resolve(result)})
                        .catch((err) => {reject(err)});
                } else {
                    reject(new Error('Not permission for model'));
                }
            } else {
                if (this.permissions.user.availableModels.includes(req.model)) {
                    update(req, permissions.user.updateAttributes)
                        .then((result) => {resolve(result)})
                        .catch((err) => {reject(err)});
                } else {
                    reject(new Error('Not permission for model'));
                }
            }
        });
    },

    async get(req) {
        let getMethods = {
            'getOne': get.getOne,
            'getAll': get.getAll
        };
        try {
            if (await checkPermission(req.token)) {
                if (this.permissions.admin.availableModels.includes(req.model)) {
                    return await getMethods[req.method](req, permissions.admin.getAttributes);
                } else {
                    return new Error('Not permission for model');
                }
            } else {
                if (this.permissions.user.availableModels.includes(req.model)) {
                    return await getMethods[req.method](req, permissions.user.getAttributes);
                } else {
                    return new Error('Not permission for model');
                }
            }
        } catch (e) {
            return e;
        }
    }
}

module.exports = index;