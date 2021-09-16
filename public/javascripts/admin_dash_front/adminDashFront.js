const addData = {
    async getDataUser(model, path){
        let req  = models[model]
        let data = await req.get()
        data.forEach(element => this.dataOutputUser(element, model))
    },
    async getData(model, path){
        let req  = models[model]
        let data = await req.get()
        data.forEach(element => this.dataOutput(element, model, path))
    },
    async update(model){
        let req = models[model]
        let data = await req.update()
    },
    async dataOutputUser(data, model){
        let parent = document.getElementById('tab_01')
        let element = document.createElement('button')
        element.className = 'accordion'
        element.onclick = accordionDown
        element.id = data.id
        element.innerHTML = (` <table>
                                <tr>
                                    <td>id</td>
                                    <td><input disabled value='${data.id}'></td>
                                    <td>логин</td>
                                    <td><input disabled value='${data.login}'></td>
                                    <td>Удален</td>
                                    <td><input disabled value='${data.isDeleted}'></td>
                                    <td>Модель</td>
                                    <td><input disabled value='${model}'></td>
                                </tr>
                                <tr>
                                    <td>Создан</td>
                                    <td><input disabled value='${data.createdAt}'></td>
                                    <td>Обновлен</td>
                                    <td><input disabled value='${data.updatedAt}'></td>
                                    <td>Школа</td>
                                    <td><input disabled value='${data.SchoolId}'></td>
                                </tr>
                              </table>`)
        parent.appendChild(element)
        let elementCont = document.createElement('div')
        elementCont.className = 'panel'
        elementCont.innerHTML = (`<table>
                                        <tr>
                                            <td>Пароль</td>
                                            <td><input id="password${data.id}" value='${data.login}'></td>
                                            <td>Удалить</td>
                                            <td><select id="status${data.id}" name="status[]" >
                                                <option value='true'>Да</option>
                                                <option value="false">Нет</option>
                                            </select></td>
                                        </tr>
                                      </table>
                                      <button onclick="addData.update(${model})">Update</button>`)
        parent.appendChild(elementCont)
    },
    async dataOutput(data, model, path){
        let parent = document.getElementById(path)
        let element = document.createElement('button')
        element.className = 'accordion'
        element.onclick = accordionDown
        element.id = data.id
        element.innerHTML = (` <table>
                                <tr>
                                    <td>id</td>
                                    <td><input disabled value='${data.id}'></td>
                                    <td>Имя</td>
                                    <td><input disabled value='${data.name}'></td>
                                    <td>Удален</td>
                                    <td><input disabled value='${data.isDeleted}'></td>
                                    <td>Модель</td>
                                    <td><input disabled value='${model}'></td>
                                </tr>
                                <tr>
                                    <td>Создан</td>
                                    <td><input disabled value='${data.createdAt}'></td>
                                    <td>Обновлен</td>
                                    <td><input disabled value='${data.updatedAt}'></td>
                                    <td>Школа</td>
                                    <td><input disabled value='${data.SchoolId}'></td>
                                </tr>
                              </table>`)
        parent.appendChild(element)
        let elementCont = document.createElement('div')
        elementCont.className = 'panel'
        elementCont.innerHTML = (`<table>
                                        <tr>
                                            <td>Имя</td>
                                            <td><input id="password${data.id}" value='${data.name}'></td>
                                            <td>Удалить</td>
                                            <td><select id="status${data.id}" name="status[]" >
                                                <option value='true'>Да</option>
                                                <option value="false">Нет</option>
                                            </select></td>
                                        </tr>
                                      </table>
                                      <button onclick="">Update</button>
                                      <button onclick="deleteData(${data.id})">Delete</button>`)
        parent.appendChild(elementCont)
    }
}