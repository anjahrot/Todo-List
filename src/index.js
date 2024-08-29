import './style.css';

import domManager from './js/domManager';
import storageManager from './js/localStorage';

//Initial render
domManager.renderProjects();
domManager.renderTodos();

//modal to create/edit projects and todos 
let ModalBtns = document.querySelectorAll('.modalBtn');
let modal;
ModalBtns.forEach( item => item.addEventListener('click', (e) => {
    if (e.currentTarget.classList.contains('modal-open')) {
        modal = document.getElementById(e.currentTarget.dataset.id);
        openModal(modal);
    } else if (e.currentTarget.classList.contains("modal-close")) {
        closeModal(modal);
    } else {
        return;    
    }
}));

//Title and text of buttons in form changing depending on new or updated entry
const todoDialogTitle = document.querySelector('.todoDialogTitle');

const openModal = (modal) => {
    document.body.style.overflow = "hidden";
    modal.setAttribute("open", "true");
    let overlay = document.createElement("div");
    overlay.id = "modal-overlay";
    document.body.appendChild(overlay);
  };

const closeModal = (modal) => {
    document.body.style.overflow = "auto";
    modal.removeAttribute("open");
    document.body.removeChild(document.querySelector("#modal-overlay"));
  };

const submitProject = document.querySelector('.submitProject');
const submitTodo = document.querySelector('.submitTodo');

submitProject.addEventListener('click', newProjectFromFormInput);
submitTodo.addEventListener('click', newTodoFromFormInput);

const formElem = document.querySelector('#projectForm');

function newProjectFromFormInput (event) {
    event.preventDefault();

    const data = new FormData(formElem);
    let name = data.get("project_name");
    let description = data.get("project_description");
    let todos = data.get("todos");

    storageManager.addProject(name, description, todos);
    domManager.renderProjects();
    formElem.reset();
};

const formElemTodo = document.querySelector('#todoForm');

function newTodoFromFormInput (event) {
  event.preventDefault();

  const todoData = new FormData(formElemTodo);
  let title = todoData.get("todo_title");
  let dueDate = todoData.get("dueDate");
  let priority = todoData.get("prio"); 
  let notes = todoData.get("notes");

  storageManager.addTodoToProject(title, dueDate, priority, notes);
  domManager.renderTodos();
  formElemTodo.reset();
};


