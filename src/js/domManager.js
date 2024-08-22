import storageManager from "./localStorage";
import selectIcon from '../icons/note-edit.svg';
import deleteIcon from '../icons/trash-can.svg';

const domManager = (() => {

    const renderProjects = () => {
        
        const projectList = document.querySelector('.projectList');
        projectList.innerHTML = '';
        
        const currentProjectHeading = document.querySelector('.currentProjectName');
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
            });

            const myDeleteIcon = new Image();
            myDeleteIcon.src = deleteIcon;
            myDeleteIcon.setAttribute('id','sidebarIcon')

            myDeleteIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                if (index === 0) {
                    alert('Can not delete default project!')
                }
                if (confirm('Are you sure you want to delete this project?')){
                    storageManager.removeProject(index);
                    storageManager.setCurrentProject('Tasks');
                    renderProjects();
                }
            });

            btn.appendChild(mySelectIcon);
            btn.appendChild(myDeleteIcon);
            projectItem.appendChild(btn);
            projectList.appendChild(projectItem);
        })
            
        }
    
    return {renderProjects};
})();

export default domManager;