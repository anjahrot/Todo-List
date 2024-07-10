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

function newProjectFromFormInput (event) {
    event.preventDefault();

    const data = new FormData(formElem);
    let title = data.get("project_title");
    let description = data.get("project_description");
    let notes = data.get("notes");

    let newProject = new Project(title, description, notes);

    newProject.addProject();

    formElem.reset();
    renderProjectList();
}

export {newProjectFromFormInput}