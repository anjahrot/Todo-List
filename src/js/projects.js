export class Project {
    constructor (name, description = '', todos = []) {
        this.name = name;
        this.description = description;
        this.todos = todos;
    }

    showProjectName(){
        return this.name;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(index) {
        this.todos.splice(index, 1);
    }

    getTodos = () => {
        return this.todos;
    }
};