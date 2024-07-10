import './style.css';

import {init} from './js/initial_pageload.js';

import {Todo, addTodo} from './js/todos.js';

import {projects, Project} from './js/projects.js';
import { newProjectFromFormInput } from './js/projects.js';

init();


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
/* submitTodo.addEventListener('click', newTodoFromFormInput); */

