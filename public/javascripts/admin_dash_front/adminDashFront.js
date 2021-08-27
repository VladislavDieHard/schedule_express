const addData = {
    async getData(model){
        let req  = models[model]
        let data = await req.get()
        data.forEach(element => addData.dataOutput(element, model))
    },
    async updateData(id){
        let model   = document.getElementById(`model`).value
        let inputData = document.getElementById(`input-data${id}`).value
        let req = models[model]
        req.update(id, inputData)


    },
    async deleteData(){
        if(document.getElementById('accordion')){
            let contentItem = document.getElementById('content-item')
            contentItem.remove()
            let content = document.getElementById('content')
            let child   = document.createElement('div')
            child.id = 'content-item'
            content.appendChild(child)
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
        let accordion        = document.createElement('button')
        let accordionContent = document.createElement('div')

        if(data.login) name = data.login, updateData = 'Пароль'
        else name = data.name, updateData = 'Имя'

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