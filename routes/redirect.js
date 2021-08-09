const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');

router.get('/', async function(req, res, next) {
    const token = req.cookies.token;

    if (token !== undefined) {
        const authenticated = await auth.authToken(token);
        if (authenticated.verify) {
            if (authenticated.is_admin) {
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