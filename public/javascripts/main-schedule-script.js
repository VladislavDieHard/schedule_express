class ScheduleData {
    constructor() {
        this.rawClasses = saveLocal.get('classes');
        this.rawLessons = saveLocal.get('lessons');
        this.rawTeachers = saveLocal.get('teachers');
        this.#dataValidator()
    }

    #dataValidator() {
        if (!this.rawClasses) {
            throw new Error('Trouble with schedule data')
        }
        this.classes = [];
        this.rawClasses.forEach((itemRaw) => {
            this.classes.push(
                {
                    id: itemRaw.id,
                    name: itemRaw.name,
                    lessons: []
                }
            );

            itemRaw['Relation'].forEach((relation) => {
                this.classes.lessons.push({
                    name: relation.name,
                    teacher: this.#findTeacher(relation.id),
                    hours: relation['ClassToLesson'].hours
                });
            });
        });
    }

    #findTeacher(lessonId) {
        if (!this.rawTeachers) {
            throw new Error('Trouble with schedule data')
        }
        this.rawTeachers.forEach((item) => {
            item['Relation'].forEach((relation) => {
                if (relation.id === lessonId) {
                    return item.name;
                }
            });
        });
    }
}

class ScheduleDrawer {
    constructor() {
        this.scheduleData = new ScheduleData();
        console.log(this.scheduleData.classes);
    }
}

const schedule = new ScheduleDrawer();