import Todo from './todos.js';

const projects = []; 

export default class Project {
    constructor (title, description = '', notes = '') {
        this.title = title;
        this.description = description;
        this.notes = notes;
    }

    showProject(){

    }

    addProject(){
        projects.push[this.title];
    }

    addTodo() {

    }

}