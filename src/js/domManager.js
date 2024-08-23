import storageManager from "./localStorage";
import selectIcon from '../icons/note-edit.svg';
import deleteIcon from '../icons/trash-can.svg';

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
            
            const mySelectIcon = new Image();
            mySelectIcon.src = selectIcon;
            mySelectIcon.setAttribute('id','sidebarIcon');

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
                    alert('Can not delete default project!')
                }
                else if (confirm('Are you sure you want to delete this project?')){   
                    if (currentProjectHeading.textContent === storageManager.getProjects()[index].name) {
                        storageManager.setCurrentProject('Tasks');  //Set to default project if current is deleted
                    }
                    storageManager.removeProject(index);
                    renderProjects();
                }
            });

            btn.appendChild(mySelectIcon);
            btn.appendChild(myDeleteIcon);
            projectItem.appendChild(btn);
            projectList.appendChild(projectItem);
        })
            
        }

    const renderTodos = () => {
        todoList.innerHTML = '';
        if(storageManager.getCurrentProject().todos){
          console.log(storageManager.getCurrentProject().todos);
          storageManager.getCurrentProject().todos.forEach((item, index) => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todoItem');
            todoItem.style.backgroundColor = priorityColorCoding(item.priority);
            const todoTitle = document.createElement('h2');
            todoTitle.textContent = item.title;
            const todoDuedate =  document.createElement('h3');
            todoDuedate.textContent = 'Due date: ' + item.dueDate;

            const myDeleteIcon = new Image();
            myDeleteIcon.src = deleteIcon;
            myDeleteIcon.setAttribute('id','content_icon')

            myDeleteIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this task?')){   
                    storageManager.removeTodo(index);
                    renderTodos();
                }
            });

            todoItem.appendChild(todoTitle);
            todoItem.appendChild(todoDuedate);
            todoItem.appendChild(myDeleteIcon);
            todoList.appendChild(todoItem);
        })
        }
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
    
    return {renderProjects, renderTodos, priorityColorCoding};
})();

export default domManager;