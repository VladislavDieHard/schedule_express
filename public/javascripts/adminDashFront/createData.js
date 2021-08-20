async function create() {
    let teacher = {
        "token": "422239a3c048fc1458992a671e25d36055cb68566d1a3df17ad2032bbb187fbe",
        "model": "Teacher",
        "data": {
            "name": "Boris"
        }
    }
    let response = await fetch("api/create", {
        method : 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body : JSON.stringify(teacher)
    })
}