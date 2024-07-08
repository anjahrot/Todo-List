import './style.css';

import {init} from './js/initial_pageload.js';

import {Todo, addTodo} from './js/todos.js';

/* const todo = new Todo('Walk the dog', 'Tasks', '07.10.2024');
todo.showItem(); */

init();

/* Finding items */
const addTodoBtn = document.querySelector('.addTodo');

/* Eventlisteners */
addTodoBtn.addEventListener('click', addTodo);



