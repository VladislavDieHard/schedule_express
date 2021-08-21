const addData = {
    async getData(model){
        let request = {
            token: document.cookie.split("; ")[0].split("=")[1],
            method: 'getAll',
            model: model,
            includeModel: "School"
        }
        let response = await fetch('api/get', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(request)
        })
        const result = await response.json()
        result.forEach(element => addModels[model](element, model))
    },

    async addUser(req, itemModel){
        let parent = document.getElementById('teacherId')
        let element = document.createElement('button')
        element.className = 'accordion'
        element.onclick = accordionDown
        element.id = req.id
        element.innerHTML = (` <table>
                                <tr>
                                    <td>id</td>
                                    <td><input disabled value='${req.id}'></td>
                                    <td>Логин</td>
                                    <td><input disabled value='${req.login}'></td>
                                    <td>Удален</td>
                                    <td><input disabled value='${req.isDeleted}'></td>
                                    <td>Модель</td>
                                    <td><input id='model${req.id}' value='${itemModel}'></td>
                                </tr>
                                <tr>
                                    <td>Создан</td>
                                    <td><input disabled value='${req.createdAt}'></td>
                                    <td>Обновлен</td>
                                    <td><input disabled value='${req.updatedAt}'></td>
                                    <td>Школа</td>
                                    <td><input disabled value='${req.school}'></td>
                                </tr>
                              </table>`)
        parent.appendChild(element)
        let elementCont = document.createElement('div')
        elementCont.className = 'panel'
        elementCont.innerHTML = (`<table>
                                        <tr>
                                            <td>Пароль</td>
                                            <td><input id="password${req.id}" value='${req.login}'></td>
                                            <td>Удалить</td>
                                            <td><select id="status${req.id}" name="status[]" >
                                                <option value='true'>Да</option>
                                                <option value="false">Нет</option>
                                            </select></td>
                                        </tr>
                                      </table>
                                      <button onclick="resUpdate.updateUser(${req.id})">Update</button>
                                      <button onclick="deleteData(${req.id})">Delete</button>
`)

        parent.appendChild(elementCont)
    },
    async add(req, itemModel){
        let parent = document.getElementById('teacherId')
        let element = document.createElement('button')
        element.className = 'accordion'
        element.onclick = accordionDown
        element.id = req.id
        element.innerHTML = (` <table>
                                <tr>
                                    <td>id</td>
                                    <td><input disabled value='${req.id}'></td>
                                    <td>name</td>
                                    <td><input disabled value='${req.name}'></td>
                                    <td>isDeleted</td>
                                    <td><input disabled value='${req.isDeleted}'></td>
                                    <td>Model</td>
                                    <td><input id='model${req.id}' value='${itemModel}'></td>
                                </tr>
                                <tr>
                                    <td>createdAt</td>
                                    <td><input disabled value='${req.createdAt}'></td>
                                    <td>updatedAt</td>
                                    <td><input disabled value='${req.updatedAt}'></td>
                                </tr>
                              </table>`)
        parent.appendChild(element)

        let elementCont = document.createElement('div')
        elementCont.className = 'panel'
        elementCont.innerHTML = (`<p>name</p>
                                  <td><input id="name${req.id}" value='${req.name}'></td>                                          
                                       
                                      <button onclick="resUpdate.update(${req.id})">Update</button>
            `)
        parent.appendChild(elementCont)
    }
}

let addModels ={
    "User"    : addData.addUser,
    "Teacher" : addData.add,
    "Lesson"  : addData.add,
    "Class"   : addData.add,
}