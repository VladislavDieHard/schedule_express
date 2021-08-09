const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');
const models = require('../models/models');
const dbApi = require('../db_module');

const modelTypes = {
    'teacher': models.Teacher,
    'class': models.Class,
    'lesson': models.Lesson,
    'classToLesson': models.ClassToLesson,
    'teacherToLesson': models.TeacherToLesson
}

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

router.post('/create', async (req, res) => {
    if (req.body.token) {
        let confirmToken = await dbApi.token(req.body.token);
        if (confirmToken) {
            res.send(await modelTypes[req.body.model].add(
                req.body.data,
                req.body.user,
                req.body.isRelation
            ));
        } else {
            res.send(confirmToken);
        }
    } else {
        res.send('token was not get');
    }
});

router.post('/update', async (req, res) => {
    if (req.body.token) {
        let confirmToken = await dbApi.token(req.body.token);
        if (confirmToken) {
            res.send(await modelTypes[req.body.model].update(
                req.body.id,
                req.body.data,
                req.body.user,
                req.body.isRelation
            ));
        } else {
            res.send(confirmToken);
        }
    } else {
        res.send('token was not get');
    }
});

router.post('/delete', async (req, res) => {
    if (req.body.token) {
        let confirmToken = await dbApi.token(req.body.token);
        if (confirmToken) {
            res.send(await modelTypes[req.body.model].delete(
                req.body.id,
                req.body.user,
                req.body.isRelation
            ));
        } else {
            res.send(confirmToken);
        }
    } else {
        res.send('token was not get');
    }
});

router.post('/get', async (req, res) => {
    if (req.body.token) {
        let confirmToken = await dbApi.token(req.body.token);
        if (confirmToken) {
            let data = await modelTypes[req.body.model].get(
                req.body.id,
                req.body.user,
                req.body.isRelation
            );
            if (data) {
                res.send(JSON.stringify(data));
            } else {
                res.send(data);
            }
        } else {
            res.send(confirmToken);
        }
    } else {
        res.send('token was not get');
    }
});

module.exports = router;