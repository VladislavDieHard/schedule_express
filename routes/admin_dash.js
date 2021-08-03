const express = require('express');
const router = express.Router();
const dbApi = require('../modules/db_module');
const auth = require('../modules/auth_module');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const token = req.cookies.adminToken;

    if (token !== undefined) {
        const authenticated = await auth.authUser(token, true);
        if (authenticated.verify) {
            // let users = await dbApi.getData('users', true); FIX IT!!!
            // let userList = [];
            // for (let i = 0; i <= users.length - 1; i++) {
            //     let user = {};
            //     user.id = users[i].id;
            //     user.username = users[i].username;
            //     user.login = users[i].login;
            //     user.relation = users[i].relation;
            //     userList.push(user);
            // }
            res.render('admin_dash',{
                title: 'admin dash',
                // users: JSON.stringify(userList)
            });
        } else {
            res.redirect('/admin');
        }
    } else {
        res.redirect('/admin');
    }
});

router.post('/', async function(req, res, next) {
    let call = req.body.call; // 0 = updateData, 1 = get, 2 = createUser, 3 = updateRelation
    if (call === 0) {
        let table = req.body.table;
        let id = req.body.id;
        let data = req.body.data;
        res.send(JSON.stringify(await dbApi.updateData(table, data, id)));
    } else if (call === 1) {
        let relation = req.body.relation;
        let data = dbApi.getAllTablesData(relation);
        res.send(JSON.stringify(data));
    } else if (call === 2) {
        let user = req.body.user;
        user.password = auth.cipherPass(req.body.password);
        res.send(JSON.stringify(await dbApi.createUser(user)));
    } else if (call === 3) {
        let relation = req.body.relation;
        let id = req.body.id;
        let data = req.body.data;
        res.send(JSON.stringify(await dbApi.updateRelation(relation, data, id)));
    }
});

module.exports = router;