app.component('info-table', {
    data() {
        return {
            objects: [
                {
                    name: 'teacher',
                    pluralName: 'teachers',
                    data: saveLocal.get('teachers'),
                    instance: new Teacher(),
                    objectTitle: 'ФИО',
                    popType: 'ФИО преподователя',
                    popTitle: 'Добавить учителя'
                },
                {
                    name: 'class',
                    pluralName: 'classes',
                    data: saveLocal.get('classes'),
                    instance: new Class(),
                    objectTitle: 'Класс',
                    popType: 'Номер класса',
                    popTitle: 'Добавить класс'
                },
                {
                    name: 'lesson',
                    pluralName: 'lessons',
                    data: saveLocal.get('lessons'),
                    instance: new Lesson(),
                    objectTitle: 'Предмет',
                    popType: 'Название предмета',
                    popTitle: 'Добавить предмет'
                }
            ],
            picked: 'classes',
            popup: false
        }
    },
    mounted() {
        setInterval(() => {
            this.objects[0].data =  saveLocal.get('teachers');
            this.objects[1].data =  saveLocal.get('classes');
            this.objects[2].data =  saveLocal.get('lessons');
        }, 1000);
    },
    methods: {
        updateHided(event) {
            console.log(event.target)
        }
    },
    template: `
        <div id="info-table">
            <div class="info-titles">
                <input type="radio" id="classes" value="classes" v-model="picked">
                <label for="classes">Классы</label>
                <input type="radio" id="teachers" value="teachers" v-model="picked">
                <label for="teachers">Учителя</label>
                <input type="radio" id="lessons" value="lessons" v-model="picked">
                <label for="lessons">Уроки</label>
            </div>
            <div class="table">
                <ul v-for="object in objects">
                    <object-list-item
                            v-if="picked === object.pluralName"
                            v-for="item in object.data"
                            v-bind:item="item"
                            v-bind:title="object.objectTitle"
                            v-bind:model="object.instance"
                    ></object-list-item>
                    <add-popup
                            v-if="picked === object.pluralName"
                            v-bind:type="object.popType"
                            v-bind:title="object.popTitle"
                            v-bind:model="object.instance"
                    ></add-popup>
                </ul>
            </div>
        </div>
    `
});

app.component('object-list-item', {
    data() {
        return {
            delPopupOpen: false
        }
    },
    props: {
        item: Object,
        title: String,
        model: Object
    },
    methods: {
        async hideObject(item, model) {
            await model.update(item.id, {isHided: !item.isHided});
        },
        async deletePopup() {
            this.delPopupOpen = !this.delPopupOpen
        }
    },
    template: `
        <li>
            <p>{{ title }}: {{ item.name }}</p>
            <div class="table-buttons">
                <div class="table-edit-buttons">
                    <edit-popup
                            v-bind:item = "item"
                            v-bind:model = "model"
                    ></edit-popup>
                    <delete-popup
                            v-bind:item = "item"
                            v-bind:model = "model"
                    ></delete-popup>
                </div>
                <input v-bind:id="'table-item-' + item.id" class="checkbox" v-model="item.isHided" v-on:click="hideObject(item, model)" type="checkbox">
                <label v-bind:for="'table-item-' + item.id">Не использовать</label>
            </div>
        </li>
    `
});

app.component('edit-popup', {
    data() {
        return {
            popup: false,
            name: ''
        }
    },
    props: {
        item: Object,
        model: Object
    },
    methods: {
        async updateObject(item, model) {
            await model.update(item.id, {name: this.name});
            this.popup = !this.popup;
        },
        closePopup() {
            this.popup = !this.popup;
        }
    },
    template: `
        <button class="btn edit" v-on:click="closePopup"><i class="fas fa-pencil-alt"></i></button>
        <div class="popup" v-if="popup">
            Введите новое имя для элемента {{ item.name }}
            <input type="text" v-model="name">
            <div class="popup-buttons">
                <button class="btn ok" v-on:click="updateObject(item, model)">Изменить</button>
                <button class="btn not" v-on:click="closePopup">Отмена</button>
            </div>
        </div>
    `
});

app.component('delete-popup', {
    data() {
        return {
            popup: false
        }
    },
    props: {
        item: Object,
        model: Object
    },
    methods: {
        async deleteObject(item, model) {
            await model.update(item.id, {isDeleted: !item.isDeleted});
        },
        closePopup() {
            this.popup = !this.popup;
        }
    },
    template: `
        <button class="btn remove" v-on:click="closePopup"><i class="fas fa-trash"></i></button>
        <div class="popup" v-if="popup">
            Вы действительно хотите удалить элемент с именем: {{ item.name }}?
            <div class="popup-buttons">
                <button class="btn ok" v-on:click="deleteObject(item, model)">Да</button>
                <button class="btn not" v-on:click="closePopup">Отмена</button>
            </div>
        </div>
    `
});

app.component('add-popup', {
    props: {
        title: String,
        type: String,
        model: Object
    },
    data() {
        return {
            open: false,
            name: ''
        }
    },
    methods: {
        updateHided() {
            this.open = !this.open;
        },
        async addObject(model) {
            await model.create({name: this.name});
            this.open = !this.open;
        }
    },
    template: `
        <button v-on:click="updateHided" class="add-btn">{{ title }}</button>
        <div class="popup" v-if="open">
            <h2>{{ title }}</h2>
            <label for="object-name">{{ type }}: <input id="object-name" v-model="name" type="text"></label>
            <div class="popup-buttons">
                <button v-on:click="addObject(model)">Добавить {{ name }}</button>
                <button v-on:click="updateHided">Отмена</button>
            </div>
        </div>
    `
});