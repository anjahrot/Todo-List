import { Project } from "./projects";
import { Todo } from "./todos";


const storageManager = (()=> {
    let projects = [];
    let currentProject = null;
    
    const saveToLocalStorage = () => {
        localStorage.setItem('projects', JSON.stringify(projects.map(project => ({
            name: project.name,
            description: project.description
            /*todos: project.getTodos().map(todo => ({
                title: todo.title,
                dueDate: todo.dueDate,
                priority: todo.priority,
                notes: todo.notes
            }))*/
        }))));
        localStorage.setItem('currentProject', JSON.stringify(currentProject));
    };

    const loadFromLocalStorage = () => {
        const storedProjects = localStorage.getItem('projects');
        const storedCurrentProject = localStorage.getItem('currentProject');    

        if (storedProjects) {
            projects = JSON.parse(storedProjects).map(item => {
                const project = new Project(item.name, item.description);
                /*project.todos.foreach(todoData => {
                    const todo = new Todo(
                        todoData.title,
                        todoData.dueDate,
                        todoData.priority,
                        todoData.notes
                    );
                    project.addTodo(todo);*/
            
                return project;
            });
        }

        if (storedCurrentProject) {
            currentProject = JSON.parse(storedCurrentProject);
        } else {
            currentProject = 'Tasks';  //If not stored, then default project name Tasks
        }
    
        //Add default project if empty
        if (!projects.length) {
            const defaultProject = new Project('Tasks');
            projects.push(defaultProject);
            };

        saveToLocalStorage();    
        return currentProject;    
    }
    
    const getProjects = () => {
        return projects;
    }

    const addProject = (name, description, todos) => {
        const project = new Project(name, description, todos);
        projects.push(project);
        saveToLocalStorage();

    }

    const removeProject = (index) => {
        projects.splice(index,1);
        saveToLocalStorage();
    }

    const setCurrentProject = (name) => {
        currentProject = projects.find((project) => project.name === name);
        saveToLocalStorage();
    };

    const getCurrentProjectName = () => {
         return currentProject.name;
     }


    //Initialize project with todos upon loading page
    loadFromLocalStorage();

    return {
        projects,
        currentProject,
        getProjects,
        addProject,
        removeProject,
        setCurrentProject,
        getCurrentProjectName,
        saveToLocalStorage,
        loadFromLocalStorage
    }
})();

export default storageManager;