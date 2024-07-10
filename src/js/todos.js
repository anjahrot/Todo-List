export class Todo {
    constructor(title, project = 'none', dueDate, priority = 'low', notes, hasChecklist='true'){
        this.title = title;
        this.project = project;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.hasChecklist = hasChecklist;
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
}


function addTodo() {
    console.log('Function was called');
    const todo = new Todo('Walk the dog', 'Tasks', '07.10.2024');
    todo.showItem();
}



export {addTodo};