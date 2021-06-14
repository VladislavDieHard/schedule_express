const express = require('express');
const router = express.Router();
const auth = require('../auth_module');

router.get('/', async function(req, res, next) {
    const token = req.cookies.adminToken;

    if (token !== undefined) {
        const authenticated = await auth.authUser(token, true);
        if (authenticated.verify) {
            res.redirect('/admin_dash');
        } else {
            res.render('admin', { title: 'Войдите в систему' });
        }
    } else {
        res.render('admin', { title: 'Войдите в систему' });
    }
});

router.post('/', async function(req, res, next) {
    const user = req.body;
    const token = await auth.auth(user, true);

    if (token !== null) {
        res.send(token);
    } else {
        res.send(null);
    }
});

module.exports = router;