const path = require('path');
const sequelize = require(path.join(__dirname, 'models', 'models'));
const fixtures = require(path.join(__dirname, 'fixtures'));

const commands = {
    'initdb': initializeDB,
    'runserver': runServer,
    'loadfixtures': loadFixture,
    'fullinit': fullInit
}

async function initializeDB() {
    try {
        await sequelize.sync({force: true});
        try {
            await sequelize.authenticate()
            console.log('Соединение с БД было успешно установлено')
        } catch (e) {
            console.log('Невозможно выполнить подключение к БД: ', e)
        }
        console.log('Database initialized successfully')
    } catch (e) {
        console.log(e)
    }
}

function runServer() {
    const server = require(path.join(__dirname, 'bin', 'www'));
    let port = process.env['PORT'];
    try {
        server;
        console.log(`Server started on port ${port}`);
    } catch (e) {
        console.log(e);
    }
}

async function loadFixture() {
    try {
        await fixtures.load()
        console.log('Fixtures load successfully')
    } catch (e) {
        console.log(e)
    }
}

async function fullInit() {
    try {
        await initializeDB();
        await loadFixture();
    } catch (e) {
        console.log(e);
    }
}

async function manage() {
    try {
        if (process.argv[2] === undefined) {
            return new Error('Argument is undefined');
        } else {
            await commands[process.argv[2]]();
            console.log('All commands successfully')
        }
    } catch (e) {
        console.log(e)
    }
}

manage().then(console.log).catch(console.log);