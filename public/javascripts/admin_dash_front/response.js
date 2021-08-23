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

class Get extends RequestPayload{
    async getAll(parameters){
        this.api = 'api/get'
        this.method = 'getAll';
        this.where  = parameters;
        return await this.response()
    }
}

// class Update extends RequestPayload{
//     async update(parameters, data){
//         this.api = 'api/update/item'
//         this.data = data;
//         this.where  = parameters;
//         return await this.response()
//     }
// }

class User extends Get{
    async get(parameters){
        this.model = "User"
        return await this.getAll(parameters)
    }
}

class Teacher extends Get{
    async get(parameters){
        this.model = "Teacher"
        return await this.getAll(parameters)
    }
}

class Lesson extends Get{
    async get(parameters){
        this.model = "Lesson"
        return await this.getAll(parameters)
    }
}

class Class extends Get{
    async get(parameters){
        this.model = "Class"
        return await this.getAll(parameters)
    }
}

// const get = new User()
// get.get().then(console.log)



