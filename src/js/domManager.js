import storageManager from "./localStorage";
import selectIcon from '../icons/select.svg';
import deleteIcon from '../icons/trash-can.svg';
import editIcon from '../icons/note-edit.svg'

const domManager = (() => {

    const projectList = document.querySelector('.projectList');
    const currentProjectHeading = document.querySelector('.currentProjectName');
    const todoList = document.querySelector('.todosInCurrentProject');

    const renderProjects = () => {
        projectList.innerHTML = '';
        
        currentProjectHeading.textContent = storageManager.getCurrentProjectName();
        
        storageManager.projects.forEach((project, index) => {
            const projectItem = document.createElement('li');
            const btn = document.createElement('button');
            btn.textContent = project.name;
            btn.classList.add('sidebar', 'projectItems');
            
            const myEditIcon = new Image();
            myEditIcon.src = editIcon;
            myEditIcon.setAttribute('id','sidebarIcon');

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentProjectHeading.textContent = btn.textContent;
                storageManager.setCurrentProject(btn.textContent); 
                domManager.renderTodos();        
            });

            const myDeleteIcon = new Image();
            myDeleteIcon.src = deleteIcon;
            myDeleteIcon.setAttribute('id','sidebarIcon')

            myDeleteIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                if (index === 0) {
                    alert('Can not delete default project');
                }
                else if (confirm('Are you sure you want to delete this project?')){   
                    if (currentProjectHeading.textContent === storageManager.getProjects()[index].name) {
                        storageManager.setCurrentProject('Tasks');  //Set to default project if current is deleted
                    }
                    storageManager.removeProject(index);
                    renderProjects();
                }
            });

            btn.appendChild(myEditIcon);
            btn.appendChild(myDeleteIcon);
            projectItem.appendChild(btn);
            projectList.appendChild(projectItem);
        })
            
        }

    const renderTodos = () => {
        todoList.innerHTML = '';
        if(storageManager.getCurrentProject().todos){
          storageManager.getCurrentProject().todos.forEach((item, index) => {
            
            const todoItem = document.createElement('div');
            todoItem.classList.add('todoItem');
            todoItem.style.backgroundColor = priorityColorCoding(item.priority);

            const todoInfo = document.createElement('div');
            todoInfo.classList.add('todoInfo');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.completed;
            checkbox.classList.add('todo-checkbox');

            checkbox.addEventListener('click', (e) => {
                e.stopPropagation();
                item.completed = storageManager.toggleCompleted(item);
                storageManager.saveToLocalStorage();
                renderTodos();
            })

            //Add classname to style completed todos
            if(item.completed) {
                todoItem.classList.add('completed-todo');
            }

            const todoTitleAndDate = document.createElement('div');
            const todoTitle = document.createElement('h3');
            todoTitle.textContent = item.title;
            const todoDuedate =  document.createElement('h5');
            todoDuedate.textContent = 'Due date: ' + item.dueDate;

            todoInfo.appendChild(checkbox);
            todoTitleAndDate.appendChild(todoTitle);
            todoTitleAndDate.appendChild(todoDuedate);
            todoInfo.appendChild(todoTitleAndDate);
            
            todoItem.appendChild(todoInfo);
            //append row of buttons
            const type = 'todoGeneral';
            todoItem.appendChild(addBtnsTodo(type, index));
            todoList.appendChild(todoItem);
        })
        }
    }

    //Adding row of buttons to a todo-listing (select/exit, edit and delete )
    const addBtnsTodo = (type, index) => {
        const todoButtons = document.createElement('div');
        const myDeleteIcon = new Image();
        myDeleteIcon.src = deleteIcon;
        myDeleteIcon.setAttribute('id','content_icon');

        const myEditIcon = new Image();
        myEditIcon.src = editIcon;
        myEditIcon.classList.add('modalBtn', 'modal-open');
        myEditIcon.setAttribute('data-id', 'todo-modal');
        myEditIcon.setAttribute('id', 'content_icon');

        const mySelectIcon = new Image();
        mySelectIcon.src = selectIcon;
        mySelectIcon.setAttribute('id', 'content_icon');

        const exitButton = document.createElement('button');
        exitButton.textContent = 'X';
        exitButton.setAttribute('id','details-close');

        myDeleteIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('Are you sure you want to delete this task?')){   
                storageManager.removeTodo(index);
                renderTodos();
            }
        });

        // myEditIcon.addEventListener('click', (e) => {
        //     e.stopPropagation();
        //     editTodo(index);
        // })

        mySelectIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            renderTodoDetails(index);
        })

        exitButton.addEventListener('click', (e) => {
            e.stopPropagation();
            renderTodos();
        })
        
        if(type === 'todoDetails'){
            const todoPrioLevel = getTodoPriority(index); 
            exitButton.style.backgroundColor = priorityColorCoding(todoPrioLevel);
            todoButtons.appendChild(exitButton);
        }
        else {
            todoButtons.appendChild(mySelectIcon);
        }
        todoButtons.appendChild(myEditIcon);
        todoButtons.appendChild(myDeleteIcon);
        
        return todoButtons;
    }

    
    const renderTodoDetails = (todo) => {
        todoList.innerHTML = '';
        const currentTodo = storageManager.getCurrentProject().todos[todo];
        const todoItem = document.createElement('div');
        todoItem.classList.add('todoItem', 'todoDetails');
        todoItem.style.backgroundColor = priorityColorCoding(currentTodo.priority);
        const todoTitle = document.createElement('h3');
        todoTitle.textContent = currentTodo.title;
        const todoDuedate =  document.createElement('h5');
        todoDuedate.textContent = 'Due date: ' + currentTodo.dueDate;
        const todoPriority = document.createElement('h5');
        todoPriority.textContent = 'Priority: ' + currentTodo.priority;
        const todoNotes = document.createElement('p');
        todoNotes.textContent = 'Notes: ' + currentTodo.notes;

        todoItem.appendChild(todoTitle);
        todoItem.appendChild(todoDuedate);
        todoItem.appendChild(todoPriority);
        todoItem.appendChild(todoNotes);
        //append row of buttons
        const type = 'todoDetails';
        todoItem.appendChild(addBtnsTodo(type, todo));
        todoList.appendChild(todoItem); 
    }

    const getTodoPriority = (todo) => {
        const currentTodo = storageManager.getCurrentProject().todos[todo];
        return currentTodo.priority;
    }

    const priorityColorCoding = (value) => {
        switch (value) {
            case 'low':
                return '#d4edda';
            case 'important':
                return '#fff3cd';
            case 'urgent':
                return '#f8d7da';
        }
    }

    // const handleEditTodo = (todo) => {
    //     const modal = document.querySelector('#todo-modal');
    //     const submitter = modal.querySelector('.submitTodo');
    //     submitter.setAttribute('id', 'todo-update-button');
    //     setTodoFormInputs(todo);
    // }

    // const setTodoFormInputs = (todo) => {
    //     const currentTodo = storageManager.getCurrentProject().todos[todo];
    //     const nameInput = document.querySelector('#title');
    //     const dueDateInput = document.querySelector('#dueDate');
    //     const priorityInput = document.querySelector('.priorityBoxes');
    //     const notesInput = document.querySelector('#notes');
        
    //     nameInput.value = currentTodo.title;
    //     dueDateInput.value = currentTodo.dueDate;
    //     priorityInput.value = currentTodo.priority;
    //     notesInput.value = currentTodo.notes;
    // } 


// const handleOpenModal = (modal) => {
//   const todoDialogTitle = document.querySelector('.todoDialogTitle');
//   const submitter = modal.querySelector('.submitBtn');
//   console.log(submitter.id);
//   if(submitter){
//     if(submitter.id === 'todo-create-button'){
//       submitter.textContent = "Add todo";
//       todoDialogTitle.textContent = "Add todo";
//     }
//     else if(submitter.id === 'todo-update-button'){
//       submitter.textContent = "Update todo";
//       todoDialogTitle.textContent = "Edit todo";
//     }
//     else if(submitter.id === 'add-project-button'){
//        submitter.textContent = "Add project";
//     }
//   }
//   openModal(modal);
//   //Changing back to add, eventlistener on edit button changes back to to-do-update
//   submitter.removeAttribute('id', 'todo-create-button');
// }

// const openModal = (modal) => {
//     document.body.style.overflow = "hidden";
//     modal.setAttribute("open", "true");
//     let overlay = document.createElement("div");
//     overlay.id = "modal-overlay";
//     document.body.appendChild(overlay);
//   };

// const closeModal = (modal) => {
//     document.body.style.overflow = "auto";
//     modal.removeAttribute("open");
//     console.log(document.querySelector('#modal-overlay'));
//     document.body.removeChild(document.querySelector("#modal-overlay"));
//   };

// const submitProject = document.querySelector('.submitProject');
// const submitTodo = document.querySelector('.submitTodo');


// submitProject.addEventListener('click', newProjectFromFormInput);
// submitTodo.addEventListener('click', newTodoFromFormInput);

// const formElem = document.querySelector('#projectForm');

// function newProjectFromFormInput (event) {
//     event.preventDefault();

//     const data = new FormData(formElem);
//     let name = data.get("project_name");
//     let description = data.get("project_description");
//     let todos = data.get("todos");

//     storageManager.addProject(name, description, todos);
//     renderProjects();
//     formElem.reset();
// };

// const formElemTodo = document.querySelector('#todoForm');

// function newTodoFromFormInput (event) {
//   event.preventDefault();

//   const todoData = new FormData(formElemTodo);
//   let title = todoData.get("todo_title");
//   let dueDate = todoData.get("dueDate");
//   let priority = todoData.get("prio"); 
//   let notes = todoData.get("notes");

//   storageManager.addTodoToProject(title, dueDate, priority, notes);
//   renderTodos();
//   createEventlistenersForModals();
//   formElemTodo.reset();
// };
    
    return {renderProjects, renderTodos, addBtnsTodo, renderTodoDetails, getTodoPriority, priorityColorCoding};
})();

export default domManager;