async function update(id,login, model, status,) {
    let Data = {
        "token": document.cookie.split("; ")[0].split("=")[1],
        "model": model,
        "data": {
            "login": login,
            'isDeleted' : status
        },
        "where": {
            "id": id
        }
    }

    let response = await fetch('api/update', {
        method : 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(Data)});
    const result = await response.json()
    console.log(result)
}
