const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');
const models = require('../models/models');

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

router.post('/create', async (req, res) => {
    if (req.body.token) {
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
    } else {
        res.send('access denied');
    }
});

router.post('/update', async (req, res) => {
    if (req.body.token) {
        let confirmToken = dbApi.token(req.body.token);
        if (confirmToken) {
            try {
                await modelTypes[req.body.model].update(req.body.id, req.body.data, req.body.user, req.body.isRelation);
                res.send('approved');
            } catch (e) {
                res.send(e);
            }
        } else {
            res.send('access denied');
        }
    } else {
        res.send('access denied');
    }
});

router.post('/delete', async (req, res) => {
    if (req.body.token) {
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
    } else {
        res.send('access denied');
    }
});

router.post('/get', async (req, res) => {
    if (req.body.token) {
        let confirmToken = dbApi.token(req.body.token);
        if (confirmToken) {
            let data = await modelTypes[req.body.model].get(req.body.id, req.body.user, req.body.isRelation);
            res.send(JSON.stringify(data));
        } else {
            res.send('access denied');
        }
    } else {
        res.send('access denied');
    }
});

module.exports = router;