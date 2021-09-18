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
            teachers: saveLocal.get('teachers'),
            classes: saveLocal.get('classes'),
            lessons: saveLocal.get('lessons'),
            teacher: new Teacher(),
            klass: new Class(),
            lesson: new Lesson(),
            picked: 'classes',
            popup: false
        }
    },
    mounted() {
        setInterval(() => {
            this.teachers =  saveLocal.get('teachers');
            this.classes =  saveLocal.get('classes');
            this.lessons =  saveLocal.get('lessons');
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
            <ul>
                <object-list
                        v-if="picked === 'classes'"
                        v-for="item in classes"
                        v-bind:item="item"
                        v-bind:key="item.id"
                        v-bind:title="'Класс'"
                        v-bind:model="klass"
                ></object-list>
                <add-popup
                        v-if="picked === 'classes'"
                        v-bind:type="'Номер класса'"
                        v-bind:title="'Добавить класс'"
                        v-bind:model="klass"
                ></add-popup>
            </ul>
            <ul>
                <object-list
                        v-if="picked === 'teachers'"
                        v-for="item in teachers"
                        v-bind:item="item"
                        v-bind:key="item.id"
                        v-bind:title="'ФИО'"
                        v-bind:model="teacher"
                ></object-list>
                <add-popup
                        v-if="picked === 'teachers'"
                        v-bind:type="'ФИО учителя'"
                        v-bind:title="'Добавить учителя'"
                        v-bind:model="teacher"
                ></add-popup>
            </ul>
            <ul>
                <object-list
                        v-if="picked === 'lessons'"
                        v-for="item in lessons"
                        v-bind:item="item"
                        v-bind:key="item.id"
                        v-bind:title="'Предмет'"
                        v-bind:model="lesson"
                ></object-list>
                <add-popup
                        v-if="picked === 'lessons'"
                        v-bind:type="'Название предмета'"
                        v-bind:title="'Добавить предмет'"
                        v-bind:model="lesson"
                ></add-popup>
            </ul>
        </div>
    `,
});

app.component('object-list', {
    props: {
        item: Object,
        title: String,
        key: Number,
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