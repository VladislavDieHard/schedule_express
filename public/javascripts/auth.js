const auth = {
    login: null,
    password: null,

    getData(el) {
        elID = el.id;
        if (elID === 'login') {
            this.login = el.value;
        } else if (elID === 'password') {
            this.password = el.value;
        }
    },

    async authMethod() {
        let data = {
            login: this.login,
            password: this.password,
        }

        let response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        });

        let result = await response.json();
        if (!result) {
            document.querySelector('.err-text').innerHTML = 'Вы ввели неверный логин или пароль'
        } else {
            setCookie('token', result.token);
            setCookie('login', result.login);
            setCookie('schoolId', result.schoolId);
            setCookie('isAdmin', result.isAdmin);
            document.location.href = '/redirect';
        }
    },

    controller(el, call) {
        if (call === 0) {
            this.getData(el);
        } else if (call === 1) {
            this.authMethod();
        }
    }
}

function authApi(el, call) {
    auth.controller(el, call);
}