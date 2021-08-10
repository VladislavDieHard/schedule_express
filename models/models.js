const modelsModule = require('../modules/models_module');

const Lesson = {
    model: 'lesson',
    table: 'lessons_table',
    rows: {
        'id': {
            Number,
        },
        'name': {
            String,
        },
        'is_hided': {
            type: Boolean,
        },
        'is_deleted': {
            type: Boolean,
            permission: true,
        }
    }
}

Lesson.__proto__ = modelsModule;

const Class = {
    model: 'class',
    table: 'classes_table',
    rows: {
        'id': {
            type: Number,
        },
        'name': {
            type: String,
        },
        'is_hided': {
            type: Boolean,
        },
        'is_deleted': {
            type: Boolean,
            permission: true,
        }
    }
}

const ClassToLesson = {
    model: 'ClassToLesson',
    table: 'class_to_lesson_table',
    rows: {
        'id': Number,
        'class': Number,
        'lesson': Number,
        'hours': Number,
        'is_deleted': Boolean
    }
}

Class.__proto__ = modelsModule;
ClassToLesson.__proto__ = modelsModule;

const Teacher = {
    model: 'teacher',
    table: 'teachers_table',
    rows: {
        'id': {
            Number,
        },
        'name': {
            String,
        },
        'is_hided': {
            type: Boolean,
        },
        'is_deleted': {
            type: Boolean,
            permission: true,
        }
    }
}

const TeacherToLesson = {
    model: 'teacher',
    table: 'teacher_to_lesson_table',
    rows: {
        'id': Number,
        'teacher': Number,
        'lesson': Number,
        'is_deleted': Boolean
    }
}

Teacher.__proto__ = modelsModule;
TeacherToLesson.__proto__ = modelsModule;

const User = {
    model: 'user',
    table: 'users',
    rows: {
        'id': Number,
        'username': String,
        'login': String,
        'password': String,
        'is_admin': Boolean,
        'is_deleted': Boolean
    }
}

User.__proto__ = modelsModule;

module.exports = {
    Lesson: Lesson,
    Class: Class,
    ClassToLesson: ClassToLesson,
    Teacher: Teacher,
    TeacherToLesson: TeacherToLesson,
    User: User,
};