const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');
const models = require('../models/models');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const token = req.cookies.token;
    if (token !== undefined) {
        const authenticated = await auth.authUser(token, false);
        if (authenticated.verify) {
            let classes = await models.Class.findAll();
            let teachers = await models.Teacher.findAll();
            let lessons = await models.Lesson.findAll();
            let user = await models.User.findOne({
                where: {
                    login: authenticated.login
                },
                attributes: ['id', 'login']
            });

            res.render('schedule',{
                title: 'Расписание',
                username: user.login,
                user: JSON.stringify(user),
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