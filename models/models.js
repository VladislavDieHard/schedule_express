const modelsModule = require('../modules/models_module');

const Lesson = {
    model: 'lesson',
    table: 'lessons_table'
}

Lesson.__proto__ = modelsModule;

const Class = {
    model: 'class',
    table: 'classes_table'
}

const ClassToLesson = {
    model: 'ClassToLesson',
    table: 'class_to_lesson_table'
}

Class.__proto__ = modelsModule;
ClassToLesson.__proto__ = modelsModule;

const Teacher = {
    model: 'teacher',
    table: 'teachers_table'
}

const TeacherToLesson = {
    model: 'teacher',
    table: 'teacher_to_lesson_table'
}

Teacher.__proto__ = modelsModule;
TeacherToLesson.__proto__ = modelsModule;

const User = {
    model: 'user',
    table: 'users',

    async createSupply() {
        
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