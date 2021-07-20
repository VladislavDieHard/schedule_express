const dbApi = require('./db_agregation');

const Models = {
    async addItem(data, user) {
        return await dbApi.addModel(this.model, data, user);
    },

    async getAllDataForModel(user) {
        return dbApi.getData(this.model, user);
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
}

Class.__proto__ = Models;

const Teacher = {
    model: 'teachers',
}

Teacher.__proto__ = Models;

module.exports.models = {
    Lesson: Lesson,
    Class: Class,
    Teacher: Teacher,
};