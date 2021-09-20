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
        this.rawClasses.forEach((itemRaw, index) => {
            this.classes.push(
                {
                    id: itemRaw.id,
                    name: itemRaw.name,
                    lessons: []
                }
            );
            if (itemRaw['Relation']) {
                itemRaw['Relation'].forEach((relation) => {
                    console.log('here', this.#findTeacher(relation['ClassToLesson']['LessonId']))
                    this.classes[index].lessons.push({
                        name: relation.name,
                        teacher: this.#findTeacher(relation['ClassToLesson']['LessonId']),
                        hours: relation['ClassToLesson'].hours
                    });
                    console.log(this.classes[index].lessons)
                });
            }
        });
    }

    #findTeacher(lessonId) {
        if (!this.rawTeachers) {
            throw new Error('Trouble with schedule data')
        }
        this.rawTeachers.forEach((item) => {
            console.log(item)
            item['Relation'].forEach((relation) => {
                if (relation['TeacherToLesson']['LessonId'] === lessonId) {
                    console.log('work')
                    console.log(item.name)
                    return item.name;
                }
            });
        });
        return null;
    }
}



app.component('schedule', {
    data() {
        return {
            scheduleData: new ScheduleData()
        }
    },
    methods: {

    },
    template: `
        <div class="schedule">
            {{ scheduleData.classes }}
        </div>
    `
});