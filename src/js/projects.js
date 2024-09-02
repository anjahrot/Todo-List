export class Project {
    constructor (name, todos = []) {
        this.name = name;
        // this.description = description;
        this.todos = todos;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    updateTodo(index, todo) {
        this.todos[index] = todo;
    }

    removeTodo(index) {
        this.todos.splice(index, 1);
    }

    getTodos = () => {
        return this.todos;
    }

    getTodo = (index) => {
        return this.todos[index];
    }
};