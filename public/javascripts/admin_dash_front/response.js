class RequestPayload{
    constructor() {
        this.token   = document.cookie.split("; ")[0].split("=")[1];
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

class Api extends RequestPayload{
    async getApi(parameters){
        this.api = 'api/get'
        this.method = 'getAll';
        this.where  = parameters;
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
    async createApi(id, nam){
        this.api    = 'api/create/item'
        this.data   = {
            SchoolId  : id,
            name      : nam,
        }
        return await this.response()
    }
}
class User extends Api{
    async get(parameters){
        this.model = "User"
        return await this.getApi(parameters)
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
    async get(parameters){
        this.model = "Teacher"
        return await this.getApi(parameters)
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
    async get(parameters){
        this.model = "Lesson"
        return await this.getApi(parameters)
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
    async get(parameters){
        this.model = "Class"
        return await this.getApi(parameters)
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

