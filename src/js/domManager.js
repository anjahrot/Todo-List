import storageManager from "./localStorage";
import selectIcon from '../icons/select.svg';
import deleteIcon from '../icons/trash-can.svg';
import editIcon from '../icons/note-edit.svg';

const {format, formatDistanceToNow} = require("date-fns");

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
            todoDuedate.textContent = 'Due date: ' + format(item.dueDate, 'dd/MM/yyyy');

            todoInfo.appendChild(checkbox);
            todoTitleAndDate.appendChild(todoTitle);
            todoTitleAndDate.appendChild(todoDuedate);
            todoInfo.appendChild(todoTitleAndDate);
            
            todoItem.appendChild(todoInfo);
            //append row of buttons
            const type = 'todoList';
            todoItem.appendChild(addBtnsTodo(type, index));
            todoList.appendChild(todoItem);
        })
        }
    }

    const addBtnsTodo = (type, index) => {
        const todoButtons = document.createElement('div');
        todoButtons.classList.add('btnRow');
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
        exitButton.textContent = 'x';
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
        
        const todoText = document.createElement('div');
        todoText.classList.add('detailsText');
        const todoTitle = document.createElement('h1');
        todoTitle.textContent = currentTodo.title;
        const todoDuedate =  document.createElement('h3');
        todoDuedate.textContent = 'Due date: ' + format(currentTodo.dueDate, 'dd/MM/yyyy');
        const result = formatDistanceToNow(new Date(currentTodo.dueDate));
        const todoDaysLeft = document.createElement('h3');
        todoDaysLeft.textContent = result + ' to go!';
        todoDaysLeft.style.color = 'red';
        const todoPriority = document.createElement('h3');
        todoPriority.textContent = 'Priority: ' + currentTodo.priority;
        const todoNotesHeading = document.createElement('h3');
        todoNotesHeading.textContent = 'Notes: ';
        const todoNotes = document.createElement('p');
        todoNotes.textContent = currentTodo.notes;

        todoText.appendChild(todoTitle);
        todoText.appendChild(todoDuedate);
        todoText.appendChild(todoDaysLeft);
        todoText.appendChild(todoPriority);
        todoText.appendChild(todoNotesHeading);
        todoText.appendChild(todoNotes);
        todoItem.appendChild(todoText);
        //append row of buttons
        const type = 'todoDetails';
        todoItem.appendChild(addBtnsTodo(type, todo));
        todoList.appendChild(todoItem); 
    }

    const getTodoPriority = (todo) => {
        const currentTodo = storageManager.getCurrentProject().todos[todo];
        return currentTodo.priority;
    }

    //Method to color background of todoitem according to prioritylevel
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
    
    return {renderProjects, renderTodos, addBtnsTodo, renderTodoDetails, getTodoPriority, priorityColorCoding};
})();

export default domManager;