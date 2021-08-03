const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');
const models = require('../models/models');
const adminApi = require('../modules/admin_panel')

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const token = req.cookies.adminToken;

    if (token !== undefined) {
        const authenticated = await auth.authUser(token, true);
        if (authenticated.verify) {
            let users = models.User.getUsersData()
            res.render('admin_dash',{
                title: 'admin dash',
                users: JSON.stringify(users)
            });
        } else {
            res.redirect('/admin');
        }
    } else {
        res.redirect('/admin');
    }
});

router.post('/', async function(req, res, next) {
    res.send(adminApi.controller(req.call, req.data));
});

module.exports = router;