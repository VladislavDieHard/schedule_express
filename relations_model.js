const dbApi = require('./db_agregation');

const Relations = {
    async addRelation(model, data, user) {
        if (model === 'classes') {
            try {
                await dbApi.relationClassAdd(model, data, user);
                return true;
            } catch (err) {
                return false;
            }
        } else {
            try {
                await dbApi.relationTeacherAdd(model, data, user);
                return true;
            } catch (err) {
                return false;
            }
        }
    },

    async getRelations(model, user) {
        try {
            return await dbApi.relationGet(model, user);
        } catch (err) {
            return false;
        }
    },

    
}

module.exports.relations = Relations;