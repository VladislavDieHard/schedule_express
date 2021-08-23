const resUpdate = {
    async updateUser(id) {
        let password  = document.getElementById(`password${id}`).value
        let model     = document.getElementById(`model${id}`).value

        let request = {
            "token": document.cookie.split("; ")[0].split("=")[1],
            "model": model,
            "data": {
                "password": password
            },
            "where": {
                "id": id
            }
        }

        await response(request)
    },

    async update(id) {
        let name  = document.getElementById(`name${id}`).value
        let model = document.getElementById(`model${id}`).value

        let Data = {
            "token": "3fc1e31e1ddd2308802deeb62f7f8eff17be414b3e2fb95d1e6d3aebcb68302b",
            "model": model,
            "data": {
                "name": name
            },
            "where": {
                "id": id
            }
        }

        let response = await fetch('api/update/item', {
            method : 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(Data)});
        const result = await response.json()
    }
}