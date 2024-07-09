import './style.css';

import {init} from './js/initial_pageload.js';

import {Todo, addTodo} from './js/todos.js';

import {projects, Project} from './js/projects.js';


init();

/* Finding items */
const addTodoBtn = document.querySelector('.addTodo');

/* Eventlisteners */
addTodoBtn.addEventListener('click', addTodo);

let modal;
document.addEventListener('click', (e) => {
    console.log(e.target.className);
    if (e.target.classList.contains('modal-open')) {
        modal = document.getElementById(e.target.dataset.id);
        openModal(modal);
    } else if (e.target.className === "modal-close") {
        closeModal(modal);
    } else {
        return;    
    }
});


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


