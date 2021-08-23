async function deleteData(id){
    let status = document.getElementById(`status${id}`).value
    let model  = document.getElementById(`model${id}`).value
    let request = {
        "token": document.cookie.split("; ")[0].split("=")[1],
        "model": model,
        "where": {"id": id},
        "isDeleted" : status
    }

    let response = await fetch('api/delete/item', {
        method : 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(request)});
}