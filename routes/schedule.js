const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');
const models = require('../models/models');

router.get('/', async function(req, res, next) {
    const token = req.cookies.token;
    if (token !== undefined) {
        const authenticated = await auth.authToken(token, false);
        if (authenticated.verify) {
            let classes = await models.Class.get(null, authenticated.login, false);
            let teachers = await models.Teacher.get(null, authenticated.login, false);
            let lessons = await models.Lesson.get(null, authenticated.login, false);


            res.render('schedule',{
                title: 'Расписание',
                userName: authenticated.username,
                login: authenticated.login,
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

module.exports = router;