# Get method

Get method takes request like

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
```

For example, admin can send that object on api/get:

```
{
    "token": "7ba41cc9c0cbb00ffa25d7d59ebda6e2819260f2f7fbf267805691dbc8f2172b",
    "method": "getAll",
    "model": "User", 
    "where": {
       "isAdmin": true
    },
    "includeModel": "School"
}
```

The admin will receive the data in this form

```
[
    {
        "id": 1,
        "login": "DevAdmin1",
        "isDeleted": false,
        "createdAt": "2021-08-11T07:33:13.999Z",
        "updatedAt": "2021-08-18T10:02:50.404Z",
        "School": null
    },
    {
        "id": 2,
        "login": "DevAdmin2",
        "isDeleted": false,
        "createdAt": "2021-08-11T07:33:13.999Z",
        "updatedAt": "2021-08-18T10:02:50.405Z",
        "School": null
    }
]
```

# Update

Get method takes request like

```
example
```