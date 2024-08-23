export class Todo {
    constructor(title = '', dueDate = '', priority = 'low', notes = ''){
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    } 

    showItem() {
        console.log(`${this.title} - Due: ${this.dueDate}`); /* Change to DOM-function*/
    }

    addChecklist() {
        addIcon(); /* DOM-stuff */
    }

    changePriority() {
        /* DOM-buttons */
    }
};

