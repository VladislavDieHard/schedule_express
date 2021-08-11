const express = require('express');
const router = express.Router();
const models = require('../models/models');
const api = require('../modules/api');

const modelTypes = {
    'teacher': models.Teacher,
    'class': models.Class,
    'lesson': models.Lesson,
    'user': models.User,
}

router.post('/create', async (req, res) => {res.send(await api.create(req))});

router.post('/update', async (req, res) => {res.send(await api.update(req))});

router.post('/delete', async (req, res) => {res.send(await api.delete(req))});

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