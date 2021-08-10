const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');
const models = require('../models/models');

router.get('/', async function(req, res, next) {
    const token = req.cookies.token;

    if (token !== undefined) {
        const authenticated = await auth.authToken(token, true);
        if (authenticated.verify) {
            let users = await models.User.get(true);

            res.render('admin_dash',{
                title: 'admin dash',
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