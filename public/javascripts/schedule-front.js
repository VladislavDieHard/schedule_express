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

    createItem(data, objectType) {
        console.log(data)
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

    controller(call) {
        // 0 = init, 1 = refresh data
        if (call === 0) {
            this.init();
        } else if (call === 1) {

        } else if (call === 2) {

        }
    },
}

function scheduleApi(call) {
    schedule.controller(call);
}