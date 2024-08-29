import './style.css';

import domManager from './js/domManager';
import storageManager from './js/localStorage';

//Initial render
// domManager.renderProjects(storageManager.getProjects());
// domManager.renderTodos(storageManager.getTodosInCurrentProject());
domManager.renderProjects();
domManager.renderTodos();
domManager.createEventlistenersForModals();





