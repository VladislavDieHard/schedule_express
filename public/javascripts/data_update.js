const userParams = {
    SchoolId: getCookie('schoolId'),
    isDeleted: false
}

const adminParams = {
    isDeleted: false
}

async function dataUpdate() {
    let localData = {
        classes: saveLocal.get('classes'),
        teachers: saveLocal.get('teachers'),
        lessons: saveLocal.get('lessons')
    }

    let serverData;
    if (getCookie('isAdmin')) {
        serverData = {
            classes: await models.Class.get(adminParams, 'Relation'),
            teachers: await models.Teacher.get(adminParams, 'Relation'),
            lessons: await models.Lesson.get(adminParams)
        }
    } else {
        serverData = {
            classes: await models.Class.get(userParams, 'Relation'),
            teachers: await models.Teacher.get(userParams, 'Relation'),
            lessons: await models.Lesson.get(userParams)
        }
    }

    if (JSON.stringify(localData) === JSON.stringify(serverData)) {
        setTimeout(await dataUpdate, 1000);
    } else {
        saveLocal.add('classes', serverData.classes);
        saveLocal.add('teachers', serverData.teachers);
        saveLocal.add('lessons', serverData.lessons);
        setTimeout(await dataUpdate, 1000);
    }
}

document.addEventListener("DOMContentLoaded", dataUpdate);