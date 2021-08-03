const modelsModule = require('../modules/models_module');

const Lesson = {
    model: 'lesson',
    tableModel: 'lessons'
}

Lesson.__proto__ = modelsModule;

const Class = {
    model: 'class',
    tableModel: 'classes',
    relationModel: 'class_to_lesson'
}

Class.__proto__ = modelsModule;

const Teacher = {
    model: 'teacher',
    tableModel: 'teachers',
    relationModel: 'teacher_to_lesson'
}

Teacher.__proto__ = modelsModule;

const User = {
    models: 'user',
    tableModel: 'users'
}

User.__proto__ = modelsModule;

module.exports = {
    Lesson: Lesson,
    Class: Class,
    Teacher: Teacher,
    User: User,
};