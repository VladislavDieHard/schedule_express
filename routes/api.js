const express = require('express');
const router = express.Router();
const models = require('../models/models');
const adminApi = require('../modules/admin_panel');
const dbApi = require('../db_module');

const modelTypes = {
    'teacher': models.Teacher,
    'class': models.Class,
    'lesson': models.Lesson,
    'classToLesson': models.ClassToLesson,
    'teacherToLesson': models.TeacherToLesson,
    'user': models.User,
}

router.post('/create', async (req, res) => {
    if (req.body.token) {
        let permissionCheck = await dbApi.check(req.body.user.login, req.body.token);
        if (permissionCheck.tokenCheck) {
            res.send(await modelTypes[req.body.model].add(
                req.body.data,
                req.body.user
            ));
        } else {
            res.send(permissionCheck.tokenCheck);
        }
    } else {
        res.send('token was not get');
    }
});

router.post('/update', async (req, res) => {
    if (req.body.token) {
        let permissionCheck = await dbApi.check(req.body.user.login, req.body.token);
        if (permissionCheck.tokenCheck) {
            res.send(await modelTypes[req.body.model].update(
                req.body.id,
                req.body.data,
                req.body.user
            ));
        } else {
            res.send(permissionCheck.tokenCheck);
        }
    } else {
        res.send('token was not get');
    }
});

router.post('/delete', async (req, res) => {
    if (req.body.token) {
        let permissionCheck = await dbApi.check(req.body.user.login, req.body.token);
        if (permissionCheck.tokenCheck) {
            res.send(await modelTypes[req.body.model].delete(
                req.body.id,
                req.body.user
            ));
        } else {
            res.send(permissionCheck.tokenCheck);
        }
    } else {
        res.send('token was not get');
    }
});

router.post('/get', async (req, res) => {
    if (req.body.token) {
        let permissionCheck = await dbApi.check(req.body.user.login, req.body.token);
        console.log(permissionCheck)
        if (permissionCheck.tokenCheck) {
            console.log(req.body)
            let data = await modelTypes[req.body.model].get(
                req.body.id,
                req.body.user.id,
                permissionCheck.userCheck
            );
            if (data) {
                res.send(JSON.stringify(data));
            } else {
                res.send(data);
            }
        } else {
            res.send(permissionCheck.tokenCheck);
        }
    } else {
        res.send('token was not get');
    }
});

module.exports = router;