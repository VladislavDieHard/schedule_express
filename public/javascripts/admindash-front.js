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
}

function adminDashApi(call, el) { // 0 = switch,
    adminDash.controller(call, el);
}

function admindashInit() {
    adminDash.updateUserList();
}

