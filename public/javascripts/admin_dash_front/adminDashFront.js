const addData = {
    async getData(model){
        let req  = table[model]
        let data = await req.get()
        console.log(data[1].model)
        data.forEach(element => this.dataOutputUser(element))
    },

    async dataOutputUser(data){
        let parent = document.getElementById('teacherId')
        let element = document.createElement('button')
        element.className = 'accordion'
        element.onclick = accordionDown
        element.id = data.id
        element.innerHTML = (` <table>
                                <tr>
                                    <td>id</td>
                                    <td><input disabled value='${data.id}'></td>
                                    <td>Имя</td>
                                    <td><input disabled value='${data.login}'></td>
                                    <td>Удален</td>
                                    <td><input disabled value='${data.isDeleted}'></td>
                                </tr>
                                <tr>
                                    <td>Создан</td>
                                    <td><input disabled value='${data.createdAt}'></td>
                                    <td>Обновлен</td>
                                    <td><input disabled value='${data.updatedAt}'></td>
                                    <td>Школа</td>
                                    <td><input disabled value='${data.school}'></td>
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
                                      <button onclick="resUpdate.updateUser(${data.id})">Update</button>
                                      <button onclick="deleteData(${data.id})">Delete</button>
`)

        parent.appendChild(elementCont)
    }
}

const table = {
    'User'    : new User(),
    'Teacher' : new Teacher(),
    'Class'   : new Class(),
    'Lesson'  : new Lesson(),
}