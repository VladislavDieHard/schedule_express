const sequelize = require('../models');
const cryptography = require('./crypto')

const auth = {
    async auth(user) {
        let dbUserData = await sequelize.models.User.findOne({
            where: {
                login: user.login
            }
        });
        if (dbUserData === null) {return null;}
        let dbUser = dbUserData.dataValues;

        if (dbUser.isDeleted) {return 'User is deleted'}

        let token;
        if (dbUser.password !== null) {
            let password = cryptography.decipherPass(dbUser.password);
            if (user.password === password) {
                token = cryptography.createToken(user);

                await sequelize.models.Session.create(
                    {
                        login: dbUser.login,
                        token: token,
                        adminPermissions: dbUser.isAdmin,
                        UserId: dbUser.id
                    }
                )

            } else {
                return null;
            }
        } else {
            return  null;
        }
        return {
            token: token,
            login: dbUser.login,
            schoolId: dbUser.SchoolId,
            isAdmin: dbUser.isAdmin
        };
    },

    async authUser(token) {
        const sessionData = await sequelize.models.Session.findOne({
            where: {
                token: token
            },
            attributes: ['id', 'login', 'updatedAt']
        });
        let authenticated = {};
        if (sessionData === null) {return authenticated.verify = false;}
        let session = sessionData.dataValues

        if (session !== undefined && session !== null) {
            const sessionTime = 1000 * 60 * process.env['SESSION_TIME'];
            const sessionDate = +new Date(session.updatedAt);
            const now = new Date();
            if (((+now - sessionDate) / 1000 / 60) <= (sessionTime / 1000 / 60)) {
                await sequelize.models.Session.update({id: sessionData.id}, {where: {id: sessionData.id}});
                authenticated.verify = true;
                authenticated.login = session.login;
                return authenticated
            } else {
                authenticated.verify = false;
                return authenticated;
            }
        } else {
            authenticated.verify = false;
            return authenticated;
        }
    },
}

module.exports = auth;