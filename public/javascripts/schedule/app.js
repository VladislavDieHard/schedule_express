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
                        v-bind:key="item['id']"
                        v-bind:title="'Класс'"
                ></object-list>
            </ul>
            <ul>
                <object-list
                        v-if="picked === 'teachers'"
                        v-for="item in teachers"
                        v-bind:item="item"
                        v-bind:key="item['id']"
                        v-bind:title="'ФИО'"
                ></object-list>
            </ul>
            <ul>
                <object-list
                        v-if="picked === 'lessons'"
                        v-for="item in lessons"
                        v-bind:item="item"
                        v-bind:key="item['id']"
                        v-bind:title="'Предмет'"
                ></object-list>
            </ul>
        </div>
    `,
});

app.component('object-list', {
    props: ['item', 'title', 'key'],
    template: `
        <li>
            id1: {{ item.id }}
            <p>{{ title }}: {{ item.name }}</p>
            <label for="hide"><input id="" v-model="item.isHided" v-on:click="" type="checkbox">Не использовать</label>
        </li>
    `
})


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