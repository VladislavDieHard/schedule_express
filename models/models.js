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
            allowNull: false
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
            allowNull: false
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
            allowNull: false
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
);

const School = sequelize.define(
    'School',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        tableName: 'schools'
    }
)

User.belongsToMany(Class, {
    through: 'user_to_class'
});
User.belongsToMany(Teacher, {
    through: 'user_to_teacher'
});
User.belongsToMany(Lesson, {
    through: 'user_to_lesson'
});

Class.hasMany(Lesson)
Teacher.hasMany(Lesson)

School.hasMany(User);

sequelize.sync({alter: true}).then();

module.exports = {
    User: User,
    Class: Class,
    Teacher: Teacher,
    Lesson: Lesson,
    Session: Session,
    School: School
}