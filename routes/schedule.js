const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');
const sequelize = require('../models');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const token = req.cookies.token;
    if (token !== undefined) {
        const authenticated = await auth.authUser(token, false);
        if (authenticated.verify) {
            let user = await sequelize.models.User.findOne({
                where: {
                    login: authenticated.login
                },
                attributes: ['id', 'login', 'SchoolId']
            });
            let school = await user.getSchool();
            let classes = await sequelize.models.Class.findAll({
                where: {
                    isDeleted: false,
                    SchoolId: school.id
                },
                attributes: ['id', 'name', 'isHided']
            });
            let teachers = await sequelize.models.Teacher.findAll({
                where: {
                    isDeleted: false,
                    SchoolId: school.id
                },
                attributes: ['id', 'name', 'isHided']
            });
            let lessons = await sequelize.models.Lesson.findAll({
                where: {
                    isDeleted: false,
                    SchoolId: school.id
                },
                attributes: ['id', 'name', 'isHided']
            });
            // let classesRel = await classes.getLessons();
            // let teachersRel = await teachers.getLessons();

            res.render('schedule',{
                title: 'Расписание',
                username: user.login,
                user: JSON.stringify(user),
                school: JSON.stringify({
                    id: school.id,
                    name: school.name
                }),
                teachersData: JSON.stringify(teachers),
                lessonsData: JSON.stringify(lessons),
                classesData: JSON.stringify(classes),
                // classRelData: JSON.stringify(classesRel),
                // teacherRelData: JSON.stringify(teachersRel)
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

module.exports = router;