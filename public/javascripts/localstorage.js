class SavingLocal {
    get(key) {
        try {
            return JSON.parse(window.localStorage.getItem(key));
        } catch (e) {
            return e;
        }
    }

    add(key, data) {
        try {
            window.localStorage.setItem(key, JSON.stringify(data));
            return true
        } catch (e) {
            return e;
        }
    }

    update(key, data) {
        try {
            window.localStorage.setItem(key, JSON.stringify(data));
            return true
        } catch (e) {
            return e;
        }
    }
}

const saveLocal = new SavingLocal();