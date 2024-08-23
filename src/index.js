import './style.css';

import domManager from './js/domManager';
import storageManager from './js/localStorage';

//Initial render

domManager.renderProjects(storageManager.getProjects());
domManager.renderTodos(storageManager.getTodosInCurrentProject());


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
    domManager.renderProjects(storageManager.getProjects());
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
  domManager.renderTodos(storageManager.getTodosInCurrentProject());
  formElemTodo.reset();
};


// Check availability of localstorage
// function storageAvailable(type) {
//     let storage;
//     try {
//       storage = window[type];
//       const x = "__storage_test__";
//       storage.setItem(x, x);
//       storage.removeItem(x);
//       return true;
//     } catch (e) {
//       return (
//         e instanceof DOMException &&
//         e.name === "QuotaExceededError" &&
//         // acknowledge QuotaExceededError only if there's something already stored
//         storage &&
//         storage.length !== 0
//       );
//     }
//   }

//   if (storageAvailable("localStorage")) {
//     console.log('Yippee! We can use localStorage awesomeness');
//   } else {
//     console.log('Too bad, no localStorage for us');
//   }


