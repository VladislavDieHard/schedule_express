const app = Vue.createApp({});

app.component('input-component', {
    data() {
        return {
            message: 'Впишите что-нибудь'
        }
    },
    template: `
    <div id="input-component">
        <input type="text" v-model="message">
        Посмотрим что в input: {{ message }}
    </div>`
});

app.mount('#component-demo')