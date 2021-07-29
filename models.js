const dbApi = require('./db_agregation');

const Models = {
    async addItem(data, user) {
        return await dbApi.addModel(this.tableModel, data, user);
    },

    async getRawData(user) {
        return await dbApi.getData(user, this.tableModel);
    },

    async getRelData(user, relModel) {
        return await dbApi.relationGet(user, relModel);
    },

    async getData(user) {
        let data = await this.getRawData(user);
        let relData = await this.getRelData(user, this.relationModel);
        data.forEach((item) => {
            item.relations = this.relationHandler(item.id, relData);
        });
        return data;
    },

    relationHandler(id, relData) {
        let data = [];
        relData.forEach((item) => {
            if (id === item[this.model]) {
                data.push(item);
            }
        });
        return data;
    }
}

const Lesson = {
    model: 'lesson',
    tableModel: 'lessons'
}

Lesson.__proto__ = Models;

const Class = {
    model: 'class',
    tableModel: 'classes',
    relationModel: 'class_to_lesson'
}

Class.__proto__ = Models;

const Teacher = {
    model: 'teacher',
    tableModel: 'teachers',
    relationModel: 'teacher_to_lesson'
}

Teacher.__proto__ = Models;

module.exports = {
    Lesson: Lesson,
    Class: Class,
    Teacher: Teacher,
};