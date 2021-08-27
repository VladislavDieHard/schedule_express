const addData = {
    async getData(model){
        let req  = models[model]
        let data = await req.get()
        data.forEach(element => addData.dataOutput(element, model))
    },
    async updateData(id){
        let model     = document.getElementById(`model`).value
        let inputData = document.getElementById(`input-data${id}`).value
        let req       = models[model]
        req.update(id, inputData)
    },
    async createData(){
        let model    = document.getElementById('model').value
        if(model == 'User'){
            let login    = document.getElementById('login').value
            let password = document.getElementById('password').value
            let schoolId = document.getElementById('SchoolId').value
            let req      = models[model]
            req.create(schoolId, login, password)
        }
        else{
            let name     = document.getElementById('name').value
            let schoolId = document.getElementById('SchoolId').value
            let req      = models[model]
            req.create(schoolId, name)
        }
    },
    async deleteData(){
        if(document.getElementById('accordion')){
            let contentItem      = document.getElementById('content-item')
            let content          = document.getElementById('content')
            let newContentItem   = document.createElement('div')
            contentItem.remove()
            newContentItem.id = 'content-item'
            content.appendChild(newContentItem)
        }

    },
    async accordionDown(){
        let accordion = document.getElementsByClassName('accordion')
        for(let i = 0; i < accordion.length; i++){
            accordion[i].onclick = function () {
                this.classList.toggle('active')
                this.nextElementSibling.classList.toggle('show')
            }
        }
    },
    async dataOutput(data, model, name, updateData) {
        let contentItem      = document.getElementById('content-item')
        let createData       = document.createElement('div')
        let accordion        = document.createElement('button')
        let accordionContent = document.createElement('div')
        createData.className = 'create-data'
        createData.id = 'create-data'

        if(data.login) {
            if(!document.getElementById('create-data')){                
                createData.innerHTML = `
                <table>
                    <tr>
                        <td>Логин</td>
                        <td><input id="login"></td>                        
                        <td>Модель</td>
                        <td><input disabled value="${model}" id="model"></td>   
                    </tr>
                    <tr>     
                        <td>Пароль</td>
                        <td><input id="password"></td>
                        <td>SchoolId</td>
                        <td><input id="SchoolId"></td>                       
                        <td colspan="2"><button onclick="addData.createData()">Create</button></td>
                    </tr>
                </table>`
                contentItem.appendChild(createData)
            }
            name = data.login
            updateData = 'Пароль'
        }
        else {
            if(!document.getElementById('create-data')){
                createData.innerHTML = `
                <table>
                    <tr>
                        <td>Имя</td>
                        <td><input id="name"></td>
                        <td>Модель</td>
                        <td><input disabled value="${model}" id="model"></td>                        
                    </tr>
                    <tr>
                        <td>SchoolId</td>
                        <td><input id="SchoolId"></td>                    
                        <td colspan="2"><button onclick='addData.createData()'>Create</button></td>
                    </tr>
                </table>`
                contentItem.appendChild(createData)
            }

            name = data.name
            updateData = 'Имя'
        }

        accordion.className = 'accordion'
        accordion.id = 'accordion'
        accordion.onclick = addData.accordionDown
        accordion.innerHTML = `<table>
                        <tr>
                            <td>id</td>
                            <td><input disabled value="${data.id}"></td>
                            <td>Логин/Имя</td>
                            <td><input disabled value="${name}"></td>
                            <td>Удален</td>
                            <td><input disabled value="${data.isDeleted}"></td>
                            <td>Модель</td>
                            <td><input disabled id="model" value="${model}"></td>
                        </tr>
                        <tr>
                            <td>Создан</td>
                            <td><input disabled value="${data.createdAt}"></td>
                            <td>Изменен</td>
                            <td><input disabled value="${data.updatedAt}"></td>
                            <td>SchoolId</td>
                            <td><input disabled value="${data.SchoolId}"></td>
                        </tr>
                    </table>`

        accordionContent.className = 'panel'
        accordionContent.innerHTML = `
                                       <table>
                                           <tr>
                                               <td>${updateData}</td>
                                               <td><input id="input-data${data.id}" value=""></td>
                                           </tr>
                                           <tr>
                                                <td colspan="2" >
                                                    <button onclick="addData.updateData(${data.id})">Обновить</button>
                                                </td>
                                           </tr>
                                       </table>`

        contentItem.appendChild(accordion)
        contentItem.appendChild(accordionContent)
    },
}

const models = {
    'User'    : new User(),
    'Teacher' : new Teacher(),
    'Class'   : new Class(),
    'Lesson'  : new Lesson(),
}