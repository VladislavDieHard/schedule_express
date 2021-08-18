async function findData(model){
    let User = {
        "token": document.cookie.split("; ")[0].split("=")[1],
        "method": "getAll",
        "model": model,
        "where": {"isAdmin": true},
        "includeModel": "School"
    }

    // Отправка данных на сервер по адресу api/get
    let response = await fetch('api/get', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(User)});   // Сам запрос

}

const models = {
    'User' : writeData.User,
    'School' : writeData.School,

}

const writeData ={
    async User(req){
        let div = document.getElementById("teacherId")
        let li  = document.createElement('div')
        li.innerText = JSON.stringify({
            id        : req.id,
            login     : req.login,
            isDeleted : req.isDeleted,
            createdAt : req.createdAt,
            updatedAt : req.updatedAt,
            School    : req.School,
        })
        div.appendChild(li)
    },

    async School(req){
        let parent  = document.getElementById("teacherId")
        let element = document.createElement('div')

        element.innerText = JSON.stringify({
            id        : req.id,
            name      : req.name,
            isDeleted : req.isDeleted,
            createdAt : req.createdAt,
            updatedAt : req.updatedAt,
        })
        parent.appendChild(element)
    }

}