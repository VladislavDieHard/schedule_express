app.component('app-header', {
    data() {
        return {
            user: getCookie('login'),
            school: getCookie('schoolId')
        }
    },
    methods: {
        quit() {
            deleteCookie('token');
            deleteCookie('login');
            deleteCookie('schoolId');
            deleteCookie('isAdmin');
            document.location.href = '/';
        }
    },
    template: `
        <header id="header">
            <div class="user-info">
                <p>Логин пользователя: {{ user }}</p>
                <p>ID школы: {{ school }}</p>
            </div>
            <div class="exit-button" v-on:click="quit">
                <div class="outer">
                    <div class="inner">
                        <label>Выйти</label>
                    </div>
                </div>
            </div>
        </header>
    `
});