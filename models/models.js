const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite3'
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
);

const ClassToLesson = sequelize.define(
    'ClassToLesson',
    {
        hours: {
            type: DataTypes.NUMBER,
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
        tableName: 'class_to_lesson'
    }
);

const TeacherToLesson = sequelize.define(
    'TeacherToLesson',
    {
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
        tableName: 'teacher_to_lesson'
    }
);

School.hasMany(User);
User.belongsTo(School);

User.hasMany(Session);
Session.belongsTo(User);

School.hasMany(Lesson);
Lesson.belongsTo(School);

School.hasMany(Teacher);
Teacher.belongsTo(School);

School.hasMany(Class);
Class.belongsTo(School);

Class.belongsToMany(Lesson, {as: 'Relation', through: ClassToLesson});
Lesson.belongsToMany(Class, {through: ClassToLesson});

Teacher.belongsToMany(Lesson, {as: 'Relation', through: TeacherToLesson});
Lesson.belongsToMany(Teacher, {through: TeacherToLesson});

module.exports = sequelize;