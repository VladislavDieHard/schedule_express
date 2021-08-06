const adminDash = {
    async ajax(call, data) { // 0 = updateData, 1 = get, 2 = createUser, 3 = updateRelation
        let response = await fetch('/admin_dash', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        });

        let result = response.json();
    },

    async updateData(data) {
        const updateData = {

        }
        let update = await this.ajax(0, updateData);

        let notficationText = `Объект: ${update.obj} обновлён!`;
        this.showNotification(notficationText);
    },

    showNotification(text) {
        document.querySelector('.notification').innerHTML = text;
        document.querySelector('.notification').classList.add('show-notification');
        setTimeout(document.querySelector('.notification').classList.remove('show-notification'), 1000);
    },

    refreshData() {

    },

    getData() {

    },

    updateUserList() {
        let users = JSON.parse(document.querySelector('.data-users').getAttribute('data-users'));
    },

    switchObject(el) {
        let obj = el.classList[0].split('-')[0];
        document.querySelector('.object-item-active').classList.remove('object-item-active');
        document.querySelector(`.${obj}`).classList.add('object-item-active');
    },

    controller(call, el) {
        if (call === 0) {
            this.switchObject(el);
        }
    }
}

function adminDashApi(call, el) { // 0 = switch,
    adminDash.controller(call, el);
}

function admindashInit() {
    adminDash.updateUserList();
}

