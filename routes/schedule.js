const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');
const models = require('../models/models')

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

router.post('/', async function(req, res, next) { // 0 = init, 1 = refresh data, 2 = add item to db
    let result;
    if (req.body.call === 2) {
        const types = [
            ['Учитель', models.Teacher],
            ['Урок', models.Lesson],
            ['Класс', models.Class]
        ]

        types.forEach((item) => {
            if (item[0] === req.body.type) {
                result = item[1].addItem(req.body.data, req.body.user);
            }
        });
    }

    res.send(result);
})

module.exports = router;