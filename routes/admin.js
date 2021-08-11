const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');
const models = require('../models/models');

router.get('/', async function(req, res, next) {
    const token = req.cookies.token;

    if (token !== undefined) {
        const authenticated = await auth.authUser(token);
        if (authenticated.verify) {
            let user = await models.User.findOne({
                where: {login: authenticated.login},
                attributes: ['id', 'login']
            });
            let users = await models.User.findAll({
                attributes: ['id', 'login', 'isDeleted', 'createdAt', 'updatedAt', ]
            });

            res.render('admin_dash',{
                title: 'admin dash',
                user: JSON.stringify(user),
                users: JSON.stringify(users)
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

module.exports = router;