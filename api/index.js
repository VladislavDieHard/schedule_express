const checkPermission = require('../modules/check_permission');
const fs = require('fs');
const permissions = JSON.parse(fs.readFileSync('../permissions.json'));
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

            } else {

            }
        } catch (e) {
            result = e;
        }
        return result;
    },

    async get(req) {
        try {
            if (await checkPermission(req.token)) {
                if (this.permissions.admin.availableModels.includes(req.model)) {
                    return await get(req, permissions.admin.getAttributes);
                } else {
                    return new Error('Not permission for model');
                }
            } else {
                if (this.permissions.user.availableModels.includes(req.model)) {
                    return await get(req, permissions.user.getAttributes);
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