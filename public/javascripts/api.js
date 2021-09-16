class FetchApi{
    constructor() {
        this.token   = getCookie('token');
    }
    async response(){
        let response = await fetch(this.api, {
            method : 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body : JSON.stringify(this)
        })
        return await response.json()
    }
}

class Api extends FetchApi{
    async getApi(parameters, include){
        this.api = 'api/get'
        this.method = 'getAll';
        this.where  = parameters;
        this.include = include;
        return await this.response()
    }
    async updateUserApi(id, password){
        this.api    = 'api/update/item'
        this.where  = {id : id};
        this.data   = {password : password}
        return await this.response()
    }
    async createUserApi(id, log, pas){
        this.api    = 'api/create/item'
        this.data   = {
            SchoolId  : id,
            login     : log,
            password  : pas,
        }
        return await this.response()
    }
    async updateApi(id, name){
        this.api    = 'api/update/item'
        this.where  = {id : id};
        this.data   = {name : name}
        return await this.response()
    }
    async createApi(id, name){
        this.api    = 'api/create/item'
        this.data   = {
            SchoolId  : id,
            name      : name,
        }
        return await this.response()
    }
    async createRelationApi() {
        this.api    = 'api/create/relation'
    }
    async removeRelationApi() {
        this.api    = 'api/delete/relation'
    }
}
class User extends Api{
    async get(parameters, include){
        this.model = "User"
        return await this.getApi(parameters, include)
    }
    async update(parameters, name){
        this.model = "User"
        return await this.updateUserApi(parameters, name)
    }
    async create(id, login, password){
        this.model = "User"
        return await this.createUserApi(id, login, password)
    }
}
class Teacher extends Api{
    async get(parameters, include){
        this.model = "Teacher"
        return await this.getApi(parameters, include)
    }
    async update(parameters, name){
        this.model = "Teacher"
        return await this.updateApi(parameters, name)
    }
    async create(id, name){
        this.model = "Teacher"
        return await this.createApi(id, name)
    }
}
class Lesson extends Api{
    async get(parameters, include){
        this.model = "Lesson"
        return await this.getApi(parameters, include)
    }
    async update(parameters, name){
        this.model = "Lesson"
        return await this.updateApi(parameters, name)
    }
    async create(id, name){
        this.model = "Lesson"
        return await this.createApi(id, name)
    }
}
class Class extends Api{
    async get(parameters, include){
        this.model = "Class"
        return await this.getApi(parameters, include)
    }
    async update(parameters, name){
        this.model = "Class"
        return await this.updateApi(parameters, name)
    }
    async create(id, name){
        this.model = "Class"
        return await this.createApi(id, name)
    }
}
class Relation extends Api{
    async add(from, to){
        this.fromModel = from;
        this.toModel = to;
        return await this.createRelationApi()
    }
    async remove(from, to){
        this.fromModel = from;
        this.toModel = to;
        return await this.removeRelationApi()
    }
}

const models = {
    Class: new Class(),
    Lesson: new Lesson(),
    Teacher: new Teacher(),
    User: new User(),
    Relation: new Relation()
}