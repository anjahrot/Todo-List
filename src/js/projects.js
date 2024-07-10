import Todo from './todos.js';
import { renderProjectList } from '../index.js';

const projects = []; 

export class Project {
    constructor (title, description, notes) {
        this.title = title;
        this.description = description;
        this.notes = notes;
    }

    showProjectTitle(){
        return this.title;
    }


    addTodo() {

    }
}

function addProjectToList(project) {
    projects.push(project);
}

const formElem = document.querySelector('#projectForm');

function newProjectFromFormInput (event) {
    event.preventDefault();

    const data = new FormData(formElem);
    let title = data.get("project_title");
    let description = data.get("project_description");
    let notes = data.get("notes");

    let newProject = new Project(title, description, notes);

    addProjectToList(newProject.showProjectTitle());

    formElem.reset();
    console.log(newProject.showProjectTitle());
    renderProjectList(); 
}

export {newProjectFromFormInput, projects, addProjectToList}