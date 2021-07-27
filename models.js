const dbApi = require('./db_agregation');
const relationModel = require('./relations_model');

const Models = {
    async addItem(data, user) {
        return await dbApi.addModel(this.model, data, user);
    },

    async getAllDataForModel(user) {
        return await dbApi.getAllDataForModel(this.model, user);
    },

    async getIdRelData(user, relModel, model, id) {
        return await dbApi.relationGet(user, relModel, model, id);
    },

    async getIdDataForModel(model, id) {

    },
}

const Lesson = {
    model: 'lessons',
}

Lesson.__proto__ = Models;

const Class = {
    model: 'classes',
    relationModel: 'class_to_lesson'
}

Class.__proto__ = Models;

const Teacher = {
    model: 'teachers',
    relationModel: 'teacher_to_lesson'
}

Teacher.__proto__ = Models;

module.exports.models = {
    Lesson: Lesson,
    Class: Class,
    Teacher: Teacher,
};