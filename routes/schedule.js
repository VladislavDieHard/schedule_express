var express = require('express');
var router = express.Router();
let dbApi = require('../db_agregation')

let teacherList;
let lessonsList;


dbApi.db('SELECT * FROM teachers', (err, rows) => {
    if (rows !== undefined) {
        teacherList = rows;
    } else {
        throw err;
    }
});

dbApi.db('SELECT * FROM lessons', (err, rows) => {
    if (rows !== undefined) {
        lessonsList = rows;
    } else {
        throw err;
    }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('schedule',{
        title: 'schedule',
        teachersData: JSON.stringify(teacherList),
        lessonsData: JSON.stringify(lessonsList),
    });
});

module.exports = router;
