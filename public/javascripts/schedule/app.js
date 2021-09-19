const app = Vue.createApp({});

app.component('app-header', {
    data() {
        return {
            user: getCookie('login'),
            school: getCookie('schoolId')
        }
    },
    methods: {
        quit() {
            authApi('', 2)
        }
    },
    template: `
        <div class="user-info">
            <p>Логин пользователя: {{ user }}</p>
            <p>ID школы: {{ school }}</p>
        </div>
        <button v-on:click="quit">Выйти</button>
    `
});

app.component('info-table', {
    data() {
        return {
            objects: [
                {
                    name: 'teacher',
                    mName: 'teachers',
                    data: saveLocal.get('teachers'),
                    instance: new Teacher(),
                    objectTitle: 'ФИО',
                    popType: 'ФИО преподователя',
                    popTitle: 'Добавить учителя'
                },
                {
                    name: 'class',
                    mName: 'classes',
                    data: saveLocal.get('classes'),
                    instance: new Class(),
                    objectTitle: 'Класс',
                    popType: 'Номер класса',
                    popTitle: 'Добавить класс'
                },
                {
                    name: 'lesson',
                    mName: 'lessons',
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
            <div>
                <input type="radio" id="classes" value="classes" v-model="picked">
                <label for="classes">Классы</label>
                <input type="radio" id="teachers" value="teachers" v-model="picked">
                <label for="teachers">Учителя</label>
                <input type="radio" id="lessons" value="lessons" v-model="picked">
                <label for="lessons">Уроки</label>
            </div>
            <ul v-for="object in objects">
                <object-list
                        v-if="picked === object.mName"
                        v-for="item in object.data"
                        v-bind:item="item"
                        v-bind:title="object.objectTitle"
                        v-bind:model="object.instance"
                ></object-list>
                <add-popup
                        v-if="picked === object.mName"
                        v-bind:type="object.popType"
                        v-bind:title="object.popTitle"
                        v-bind:model="object.instance"
                ></add-popup>
            </ul>
        </div>
    `
});

app.component('object-list', {
    props: {
        item: Object,
        title: String,
        model: Object
    },
    methods: {
        async hideObject(item, model) {
            await model.update(item.id, {isHided: !item.isHided});
        }
    },
    template: `
        <li>
            <p>{{ title }}: {{ item.name }}</p>
            <label for="hide"><input v-model="item.isHided" v-on:click="hideObject(item, model)" type="checkbox">Не использовать</label>
        </li>
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
        <button v-on:click="updateHided">{{ title }}</button>
        <div v-if="open">
            <h2>{{ title }}</h2>
            <label for="object-name">{{ type }}: <input id="object-name" v-model="name" type="text"></label>
            <button v-on:click="addObject(model)">Добавить {{ name }}</button>
            <button v-on:click="updateHided">Отмена</button>
        </div>
    `
});


app.mount('#app');

// const Header = {
//     data() {
//         return {
//             user: getCookie('login'),
//             school: getCookie('schoolId')
//         }
//     },
//     methods: {
//         quit() {
//             authApi('', 2)
//         }
//     }
// }
//
// Vue.createApp(Header).mount('#header');

// const InfoTable = {
//     data() {
//         return {
//             teachers: saveLocal.get('teachers'),
//             classes: saveLocal.get('classes'),
//             lessons: saveLocal.get('lessons'),
//             picked: '',
//         }
//     },
//     methods: {
//     }
// }
//
// Vue.createApp(InfoTable).mount('#info-table');