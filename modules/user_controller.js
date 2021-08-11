const models = require('../models/models');

const userController = {
    async changePassword(token, userId, oldPassword, newPassword) {
        const session = (await models.Session.findOne({
            where: {
                token: token
            },
            attributes: ['login']
        })).dataValues;

        let dbUser = (await models.User.findOne({
            where: {
                login: session.login
            },
            attributes: ['login', 'password']
        })).dataValues;

        if (this.decipherPass(dbUser.password) === oldPassword) {
            let result = await models.User.update(
                {
                    password: this.cipherPass(newPassword)
                },
                {
                    where: {
                        login: session.login
                    }
                }
            )
        } else {
            return false;
        }
    },

    async createUser(token, login, password) {
        const isAdmin = (await models.Session.findOne({
            where: {
                token: token
            },
            attributes: ['isAdmin']
        })).dataValues;


        if (isAdmin) {
            return await models.User.create(
                {
                    login: login,
                    password: this.cipherPass(password)
                }
            );
        } else {
            return false;
        }
    }
}

module.exports = userController;