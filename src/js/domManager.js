import storageManager from "./localStorage";
import selectIcon from '../icons/select.svg';

const domManager = (() => {

    const renderProjects = () => {
        
        const projectList = document.querySelector('.projectList');
        projectList.innerHTML = '';
        storageManager.projects.forEach((project, index) => {
            const projectItem = document.createElement('li');
            const btn = document.createElement('button');
            btn.textContent = project.name;
            btn.classList.add('sidebar', 'projectItems');
            const mySelectIcon = new Image();
            mySelectIcon.src = selectIcon;
            mySelectIcon.setAttribute('id','selectIcon');
            btn.appendChild(mySelectIcon);
            projectItem.appendChild(btn);
            projectList.appendChild(projectItem);
        })
            
        }
    
    return {renderProjects};
})();

export default domManager;