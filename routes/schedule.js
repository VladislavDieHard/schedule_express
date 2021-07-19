const express = require('express');
const router = express.Router();
const dbApi = require('../db_agregation');
const objProcessor = require('../object_processing');
const auth = require('../auth_module');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const token = req.cookies.token;

    if (token !== undefined) {
        const authenticated = await auth.authUser(token, false);
        if (authenticated.verify) {
            let teachers = objProcessor(authenticated.relation, 'teachers');
            let lessons = objProcessor(authenticated.relation, 'lessons');
            let classes = objProcessor(authenticated.relation, 'classes');
            // let lessons = await dbApi.getData(`lessons_${authenticated.relation}`, true);

            res.render('schedule',{
                title: 'Расписание',
                teachersData: JSON.stringify(teachers),
                lessonsData: JSON.stringify(lessons),
                classesData: JSON.stringify(classes),
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