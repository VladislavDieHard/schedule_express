const express = require('express');
const router = express.Router();
const fs = require('fs');
const dbApi = require('../db_agregation');

router.get('/', function(req, res, next) {
    const userAdmin = JSON.parse(fs.readFileSync('./settings/settings.json', 'utf8'));
    const auth = req.query;
    if (auth.token === userAdmin.token) {
        res.render('admin', {title: 'admin-dash'});
    } else {
        res.render('admin-auth', {title: 'admin-auth'});
    }
});

router.post('/', function(req, res, next) {
    try {
        const userAdmin = JSON.parse(fs.readFileSync('./settings/settings.json', 'utf8'));
        const userAdminLogin = req.body;
        if (userAdmin.login === userAdminLogin.login && userAdmin.password === userAdminLogin.password) {
            res.send(`/admin?token=${userAdmin.token}`);
        } else {
            res.send('err');
        }
    } catch (e) {
        throw e;
    }
});

module.exports = router;