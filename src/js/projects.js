let todos = [];

export class Project {
    constructor (name, description = '') {
        this.name = name;
        this.description = description;
    }

    showProjectName(){
        return this.name;
    }

    addTodo(todo) {
        todos.push(todo);
    }

    removeTodo(index) {
        todos.splice(index, 1);
    }

    getTodos = () => {
        return todos;
    }
};