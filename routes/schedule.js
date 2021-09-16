const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');
const sequelize = require('../models');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const token = req.cookies.token;
    if (token !== undefined) {
        const authenticated = await auth.authUser(token, false);
        if (authenticated.verify) {
            let user = await sequelize.models.User.findOne({
                where: {
                    login: authenticated.login
                },
                attributes: ['id', 'login', 'SchoolId']
            });
            let school = await user.getSchool();

            res.render('schedule',{
                title: 'Расписание',
                username: user.login,
                user: JSON.stringify(user),
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

module.exports = router;