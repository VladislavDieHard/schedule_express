async function create() {
    let request = {
        "token": document.cookie.split("; ")[0].split("=")[1],
        "model": "Teacher",
        "data": {
            "name": "Boris"
        }
    }
    let response = await fetch("api/create", {
        method : 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body : JSON.stringify(request)
    })
}