const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');
const models = require('../models/models');
const dbApi = require('../db_module');

const modelTypes = {
    'teacher': models.Teacher,
    'class': models.Class,
    'lesson': models.Lesson,
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const token = req.cookies.token;
    if (token !== undefined) {
        const authenticated = await auth.authUser(token, false);
        if (authenticated.verify) {
            let classes = await models.Class.get(null, authenticated.login, false);
            let teachers = await models.Teacher.get(null, authenticated.login, false);
            let lessons = await models.Lesson.get(null, authenticated.login, false);


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

router.post('/create', (req, res) => {
    let confirmToken = dbApi.token(req.body.token);
    if (confirmToken) {
        try {
            modelTypes[req.body.model].add(req.body.data, req.body.user, req.body.isRelation);
            res.send('approved');
        } catch (e) {
            res.send(e);
        }
    } else {
        res.send('access denied');
    }
});

router.post('/update', (req, res) => {
    let confirmToken = dbApi.token(req.body.token);
    if (confirmToken) {
        try {
            modelTypes[req.body.model].update(req.body.id, req.body.data, req.body.user, req.body.isRelation);
            res.send('approved');
        } catch (e) {
            res.send(e);
        }
    } else {
        res.send('access denied');
    }
});

router.post('/delete', (req, res) => {
    let confirmToken = dbApi.token(req.body.token);
    if (confirmToken) {
        try {
            modelTypes[req.body.model].delete(req.body.id, req.body.user, req.body.isRelation);
            res.send('approved');
        } catch (e) {
            res.send(e);
        }
    } else {
        res.send('access denied');
    }
});

router.post('/get', (req, res) => {
    let confirmToken = dbApi.token(req.body.token);
    if (confirmToken) {
        try {
            modelTypes[req.body.model].get(req.body.id, req.body.user, req.body.isRelation);
            res.send('approved');
        } catch (e) {
            res.send(e);
        }
    } else {
        res.send('access denied');
    }
});

module.exports = router;