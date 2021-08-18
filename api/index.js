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
        try {
            if (await checkPermission(req.token)) {
                if (this.permissions.admin.availableModels.includes(req.model)) {
                    return await create(req, permissions.admin.createAttributes);
                } else {
                    return new Error('Not permission for model');
                }
            } else {
                if (this.permissions.user.availableModels.includes(req.model)) {
                    return await create(req, permissions.user.createAttributes);
                } else {
                    return new Error('Not permission for model');
                }
            }
        } catch (e) {
            return e;
        }
    },

    async update(req) {
        let result;
        try {
            let isAdmin = await checkPermission(req.token);
            if (isAdmin) {
                return await update(req, permissions.admin.updateAttributes);
            } else {
                return await update(req, permissions.user.updateAttributes);
            }
        } catch (e) {
            result = e;
        }
        return result;
    },

    async get(req) {
        console.log(1)
        let getMethods = {
            'getOne': get.getOne,
            'getAll': get.getAll
        };
        try {
            console.log(await checkPermission(req.token))
            if (await checkPermission(req.token)) {
                console.log(2)
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