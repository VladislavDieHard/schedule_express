const express = require('express');
const router = express.Router();
const dbApi = require('../db_agregation');
const auth = require('../auth_module');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const token = req.query.token;
    if (token !== undefined) {
        const authenticated = await auth.authUser(token);
        if (authenticated.verify) {
            let teachers = await dbApi.getData(`teachers_${authenticated.relation}`, true);
            let lessons = await dbApi.getData(`lessons_${authenticated.relation}`, true);

            res.render('schedule',{
                title: 'Расписание',
                teachersData: JSON.stringify(teachers),
                lessonsData: JSON.stringify(lessons),
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.post('/', async function(req, res, next) {
    let user = await dbApi.getData('users', true);
    res.send(user);
})

module.exports = router;