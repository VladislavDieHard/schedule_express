const express = require('express');
const router = express.Router();
const dbApi = require('../db_agregation');
const auth = require('../auth_module');
const models = require('../models')

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const token = req.cookies.token;
    if (token !== undefined) {
        const authenticated = await auth.authUser(token, false);
        if (authenticated.verify) {
            let classes = await models.Class.getData(authenticated.login);
            let teachers = await models.Teacher.getData(authenticated.login);
            let lessons = await models.Lesson.getRawData(authenticated.login);


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