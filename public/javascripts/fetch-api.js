async function fetchApi() {
    let teacher = {
        id: 1,
        name: 'NAME'
    }

    let response = await fetch('/schedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(teacher)
    });

    let result = await response.json();

    console.log(result);
}