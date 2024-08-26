export class Todo {
    constructor(title = '', dueDate = '', priority = 'low', notes = '', checklist = []){
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.completed = false;
    } 

};

