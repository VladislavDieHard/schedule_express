const models = require('../models/models');

const adminApi = {
    controller(call, data) { // 0 = updateData, 1 = get, 2 = createUser, 3 = updateRelation
        const externalFunctions = [
            0,
            1,
            models.User.createUser(data),
            3,
        ];

        return externalFunctions[call](data);
    }
}

module.exports = adminApi;