const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');
const models = require('../models/models');

router.get('/', async function(req, res, next) {
    const token = req.cookies.token;

    if (token !== undefined) {
        let authenticated = auth.authUser(token);

        if (authenticated.verify) {
            let isAdmin = (await models.Session.findOne({
                where: {
                    token: token
                },
                attributes: ['isAdmin']
            })).dataValues;

            if (isAdmin) {
                res.redirect('/admin');
            } else {
                res.redirect('/schedule');
            }
        } else {
            res.render('index', { title: 'Войдите в систему' });
        }
    } else {
        res.render('index', { title: 'Войдите в систему' });
    }
});

module.exports = router;