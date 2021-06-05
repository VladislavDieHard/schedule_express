var express = require('express');
var router = express.Router();
let dbApi = require('../db_agregation')

/* GET users listing. */
router.get('/', async function(req, res, next) {
    let teachers = await dbApi.db('SELECT * FROM teachers', true);
    let lessons = await dbApi.db('SELECT * FROM lessons', true);

    res.render('schedule',{
        title: 'schedule',
        teachersData: JSON.stringify(teachers),
        lessonsData: JSON.stringify(lessons),
    });
});

module.exports = router;
