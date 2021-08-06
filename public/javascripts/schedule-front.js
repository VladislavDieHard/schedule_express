const schedule = {

    teachers: null,
    lessons: null,

    getData() {
        let teachers = JSON.parse(document
            .querySelector('.teachers-data')
            .getAttribute('data-teachers'));
        let lessons = JSON.parse(document
            .querySelector('.lessons-data')
            .getAttribute('data-lessons'));

        this.teachers = teachers;
        this.lessons = lessons;
    },

    async backedApi(call, user, data, type) {

        let responseData = {
            call: call,
            user: user,
            data: data,
            type: type
        }

        let response = await fetch('/schedule',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(responseData),
        });

        let result = await response.json();

        return await result;
    },

    createItem(data, objectType) {
        let type;
        if (objectType === 'teachers') {
            type = {
                id: 'ID учителя: ',
                name: 'Имя учителя: '
            }
        } else if (objectType === 'lessons') {
            type = {
                id: 'ID урока: ',
                name: 'Название предмета: '
            }
        }

        let item = document.createElement('li');
        item.classList.add('objects-list-item');

        let itemID = document.createElement('p');
        itemID.classList.add('item-id');
        itemID.innerHTML = type.id + data.teacher_id;


        let itemName = document.createElement('p');
        itemName.classList.add('item-name');
        itemName.innerHTML = type.name + data.teacher_name;

        item.append(itemID, itemName);
        document.querySelector('.'+ objectType +'-list').append(item);
    },

    async addItem(call){
        let data = document.querySelector('.add-item-to-db-input').value
        let type = document.querySelector('.item-type').value
        let user = document.querySelector('.user-login').innerText;
        let result = await this.backedApi(call, user, data, type);
    },

    init() {
        this.getData();

        let teachers = this.teachers;
        let lessons = this.lessons;

        for (let i = 0; i <= teachers.length - 1; i++) {
            this.createItem(teachers[i], 'teachers');
        }

        for (let i = 0; i <= lessons.length - 1; i++) {
            this.createItem(lessons[i], 'lessons');
        }
    },

    async controller(call, data) {
        // 0 = init, 1 = refresh data, 2 = add item to db
        if (call === 0) {
            this.init();
        } else if (call === 1) {

        } else if (call === 2) {
            await this.addItem(call);
        }
    },
}

async function scheduleApi(call) {
    await schedule.controller(call);
}