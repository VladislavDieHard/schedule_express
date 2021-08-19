# Update method

Update method takes request like

```
{
    "token": "Example token",
    "method": "getAll"
    "model": "Model name", 
    "where": {
       // search terms
    },
    "attributes": [attributes are returned according to permissions],
    "include": "relations model"
}
{
    "token": "Example token",
    "model": "Model name",
    "data": {
        //values to be written
    }
}
```

For example, admin can send that object on api/update:

```
{
    "token": "3d412e12eddd358e2124bb773a588f311330ffd195fc48c8e24a04ffc6bf97fc",
    "model": "Class",
    "data": {
        "name": "1",
        "SchoolId": "1"
    }
}
```

The admin will receive the data in this form

```
{
    "isHided": false,
    "isDeleted": false,
    "id": 1,
    "name": "1",
    "SchoolId": "1",
    "updatedAt": "2021-08-19T10:07:26.050Z",
    "createdAt": "2021-08-19T10:07:26.050Z"
}
```