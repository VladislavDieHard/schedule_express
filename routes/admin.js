const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');
const models = require('../models/models');
const adminApi = require('../modules/admin_panel');

const modelTypes = {
    'teacher': models.Teacher,
    'class': models.Class,
    'lesson': models.Lesson,
    'classToLesson': models.ClassToLesson,
    'teacherToLesson': models.TeacherToLesson,
    'user': models.User,
}

router.get('/', async function(req, res, next) {
    const token = req.cookies.token;

    if (token !== undefined) {
        const authenticated = await auth.authToken(token, true);
        console.log(authenticated)
        if (authenticated.verify) {
            let users = await models.User.get(true);
            console.log(users)

            res.render('admin_dash',{
                title: 'admin dash',
                users: JSON.stringify(users)
            });
        } else {
            res.redirect('/admin');
        }
    } else {
        res.redirect('/admin');
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