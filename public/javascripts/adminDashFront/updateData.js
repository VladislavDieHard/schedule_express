async function update() {

    let Data = {
        "token": "3d412e12eddd358e2124bb773a588f311330ffd195fc48c8e24a04ffc6bf97fc",
        "model": "Class",
        "data": {
            "name": "1",
            "SchoolId": "1"
        }
    }

    let response = await fetch('api/update', {
        method : 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(Data)});
    const result = await response.json()
    console.log(result)
}