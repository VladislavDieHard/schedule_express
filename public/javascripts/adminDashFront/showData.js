const addData = {
    async getData(model, api){
        let request = {
            token: document.cookie.split("; ")[0].split("=")[1],
            method: 'getAll',
            model: model,
            includeModel: "School"
        }
        let response = await fetch(api, {
            method: 'POST',
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
                                    <td>login</td>
                                    <td><input disabled value='${req.login}'></td>
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
                                    <td>school</td>
                                    <td><input disabled value='${req.school}'></td>
                                </tr>
                              </table>`)
        parent.appendChild(element)

        let elementCont = document.createElement('div')
        elementCont.className = 'panel'
        elementCont.innerHTML = (`<table>
                                        <tr>
                                            <td>login</td>
                                            <td><input id="login${req.id}" value='${req.login}'></td>
                                            <td>isDeleted</td>
                                            <td><select id="isDeleted${req.id}" name="status[]" >
                                                <option value="true">True</option>
                                                <option value="false">False</option>
                                            </select></td>
                                        </tr>
                                      </table>
                                      <button onclick="read(${req.id})">Update</button>
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
        elementCont.innerHTML = (`<table>
                                        <tr>
                                            <td>name</td>
                                            <td><input id="login${req.id}" value='${req.name}'></td>
                                            <td>isDeleted</td>
                                            <td><select id="isDeleted${req.id}" name="status[]" >
                                                <option value="true">True</option>
                                                <option value="false">False</option>
                                            </select></td>
                                        </tr>
                                      </table>
                                      <button onclick="read(${req.id})">Проверка</button>
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