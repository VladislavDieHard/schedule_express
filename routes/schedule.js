var express = require('express');
var router = express.Router();
let dbApi = require('../db_agregation')

/* GET users listing. */
router.get('/', async function(req, res, next) {
    let teachers = await dbApi.get('teachers', true);
    let lessons = await dbApi.get('lessons', true);

    res.render('schedule',{
        title: 'Расписание',
        teachersData: JSON.stringify(teachers),
        lessonsData: JSON.stringify(lessons),
    });
});

router.post('/', async function(req, res, next) {
    let teacher = {
        id: req.body.id,
        name: req.body.name,
    }
    res.send(JSON.stringify(teacher));
})

module.exports = router;