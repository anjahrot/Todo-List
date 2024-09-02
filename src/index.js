import './style.css';

import domManager from './js/domManager';
import storageManager from './js/localStorage';

//Initial render
domManager.renderProjects();
domManager.renderTodos();

//modal to create projects and todos, eventlisteners to open and close dialog 
let ModalBtns = document.querySelectorAll('.modalBtn');
let modal;
ModalBtns.forEach( item => item.addEventListener('click', (e) => {
    modal = document.getElementById(e.currentTarget.dataset.id);
    if (e.currentTarget.classList.contains('modal-open')) {      
        if(modal.id === 'todo-modal'){
          formElemTodo.reset();
          domManager.handleOpenModal(modal);
        }
        if(modal.id === 'project-modal'){
          domManager.openModal(modal);
        }
    } else if (e.currentTarget.classList.contains('modal-close')) {
        domManager.closeModal(modal);
    } else {
        return;    
    }
}));


//Eventlisteners to add form input
const submitProject = document.querySelector('.submitProject');
const submitTodo = document.querySelector('.submitTodo');

submitProject.addEventListener('click', newProjectFromFormInput);
submitTodo.addEventListener('click', handleSubmitTodo);

const formElem = document.querySelector('#projectForm');
// const formElem = document.querySelector('#projectForm');

function newProjectFromFormInput (event) {
    event.preventDefault();

    const data = new FormData(formElem);
    let name = data.get("project_name");
    // let description = data.get("project_description");
    let todos = data.get("todos");

    storageManager.addProject(name, todos);
    domManager.renderProjects();
    formElem.reset();
};

const formElemTodo = document.querySelector('#todoForm');
const todoDialogTitle = document.querySelector('.todoDialogTitle');

function handleSubmitTodo (event) {
  event.preventDefault();

  const todoData = new FormData(formElemTodo);
  let title = todoData.get("todo_title");
  let dueDate = todoData.get("dueDate");
  let priority = todoData.get("prio"); 
  let notes = todoData.get("notes");

  if(todoDialogTitle.textContent === 'Add todo'){
    storageManager.addTodoToProject(title, dueDate, priority, notes);
  }
  else if(todoDialogTitle.textContent === 'Edit todo') {
    const todoIndex = domManager.getCurrentEditTodoIndex();
    storageManager.editTodoInProject(title, dueDate, priority, notes, todoIndex);
  }

  storageManager.saveToLocalStorage();
  domManager.renderTodos();
  formElemTodo.reset();
};


