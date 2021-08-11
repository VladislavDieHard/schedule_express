const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../db.sqlite3'
});

const User = sequelize.define(
    'User',
    {
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        tableName: 'users'
    }
);

const Class = sequelize.define(
    'Class',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        isHided: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        tableName: 'classes'
    }
);

const Teacher = sequelize.define(
    'Teacher',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        isHided: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        tableName: 'teachers'
    }
);

const Lesson = sequelize.define(
    'Lesson',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        isHided: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        tableName: 'lessons'
    }
);

const Session = sequelize.define(
    'Session',
    {
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adminPermissions: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        tableName: 'sessions'
    }
)

sequelize.sync({alter: true});

module.exports = {
    User: User,
    Class: Class,
    Teacher: Teacher,
    Lesson: Lesson,
    Session: Session
}