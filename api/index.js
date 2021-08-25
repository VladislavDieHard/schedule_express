const checkPermission = require('../modules/check_permission');
const fs = require('fs');
const path = require('path');
const permissions = JSON.parse(fs.readFileSync(path.join(__dirname, 'permissions.json'), 'utf8'));
const createItem = require('./create');
const deleteItem = require('./delete');
const updateItem = require('./update');
const get = require('./get');
const createRelation = require('./create_relation');
const deleteRelation = require('./delete_relation');

const index = {
    permissions: permissions,

    permission: null,

    async deleteItem(req) {
        return new Promise((resolve, reject) => {
            if (checkPermission(req.token)) {
                if (this.permissions.admin.availableModels.includes(req.model)) {
                    deleteItem(req)
                        .then((result) => {resolve(result)})
                        .catch((err) => {reject(err)});
                } else {
                    reject(new Error('Not permission for model'));
                }
            } else {
                if (this.permissions.user.availableModels.includes(req.model)) {
                    deleteItem(req)
                        .then((result) => {resolve(result)})
                        .catch((err) => {reject(err)});
                } else {
                    reject(new Error('Not permission for model'));
                }
            }
        });
    },

    async deleteRelation(req) {
        return new Promise((resolve, reject) => {
            if (checkPermission(req.token)) {
                if (this.permissions.admin.availableModels.includes(req.model)) {
                    deleteRelation(req)
                        .then((result) => {resolve(result)})
                        .catch((err) => {reject(err)});
                } else {
                    reject(new Error('Not permission for model'));
                }
            } else {
                if (this.permissions.user.availableModels.includes(req.model)) {
                    deleteRelation(req)
                        .then((result) => {resolve(result)})
                        .catch((err) => {reject(err)});
                } else {
                    reject(new Error('Not permission for model'));
                }
            }
        });
    },

    async createRelation(req) {
        return new Promise((resolve, reject) => {
            if (checkPermission(req.token)) {
                if (this.permissions.admin.availableModels.includes(req.model)) {
                    createRelation(req)
                        .then((result) => {resolve(result)})
                        .catch((err) => {reject(err)});
                } else {
                    reject(new Error('Not permission for model'));
                }
            } else {
                if (this.permissions.user.availableModels.includes(req.model)) {
                    createRelation(req)
                        .then((result) => {resolve(result)})
                        .catch((err) => {reject(err)});
                } else {
                    reject(new Error('Not permission for model'));
                }
            }
        });
    },

    async create(req) {
        return new Promise((resolve, reject) => {
            if (checkPermission(req.token)) {
                if (this.permissions.admin.availableModels.includes(req.model)) {
                    createItem(req, permissions.admin.createAttributes)
                        .then((result) => {resolve(result)})
                        .catch((err) => {reject(err)});
                } else {
                    reject(new Error('Not permission for model'));
                }
            } else {
                if (this.permissions.user.availableModels.includes(req.model)) {
                    createItem(req, permissions.user.createAttributes)
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
                    updateItem(req, permissions.admin.updateAttributes)
                        .then((result) => {resolve(result)})
                        .catch((err) => {reject(err)});
                } else {
                    reject(new Error('Not permission for model'));
                }
            } else {
                if (this.permissions.user.availableModels.includes(req.model)) {
                    updateItem(req, permissions.user.updateAttributes)
                        .then((result) => {resolve(result)})
                        .catch((err) => {reject(err)});
                } else {
                    reject(new Error('Not permission for model'));
                }
            }
        });
    },

    async get(req) {
        console.log(req)
        return new Promise(async (resolve, reject) => {
            let getMethods = {
                'getOne': get.getOne,
                'getAll': get.getAll
            };
            if (await checkPermission(req.token)) {
                if (this.permissions.admin.availableModels.includes(req.model)) {
                    resolve(await getMethods[req.method](req, permissions.admin.getAttributes));
                } else {
                    reject(new Error('Not permission for model'));
                }
            } else {
                if (this.permissions.user.availableModels.includes(req.model)) {
                    resolve(await getMethods[req.method](req, permissions.user.getAttributes));
                } else {
                    reject(new Error('Not permission for model'));
                }
            }
        });
    }
}

module.exports = index;