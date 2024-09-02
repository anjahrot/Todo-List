import { Project } from "./projects";
import { Todo } from "./todos";


const storageManager = (()=> {
    let projects = [];
    let currentProject = null;
    
    const saveToLocalStorage = () => {
        localStorage.setItem('projects', JSON.stringify(projects.map(project => ({
            name: project.name,
            description: project.description,
            todos: project.todos
        }))));
        localStorage.setItem('currentProject', JSON.stringify(currentProject ? {name: currentProject.name } : null));
    };

    const loadFromLocalStorage = () => {
        const storedProjects = localStorage.getItem('projects');
        const storedCurrentProject = localStorage.getItem('currentProject');
        

        if (storedProjects) {
            projects = JSON.parse(storedProjects).map(item => {
                const project = new Project(item.name, item.description, item.todos);
                
                return project;
                });    
            };
    

         // Check if storedCurrentProject exists
         if (storedCurrentProject){
            try {
                const currentProjectData = JSON.parse(storedCurrentProject);
                currentProject = projects.find(project => project.name === currentProjectData.name) || null;
            } catch (error){
                console.error("Error parsing current project data from localStorage", error);
                currentProject = null;
            }
        } else {
            currentProject = null;
        }
    
        //Add default project if empty
        if (!projects.length) {
            const defaultProject = new Project('Tasks', 'default-start');
            projects.push(defaultProject);
            const defaultTodo = new Todo('Finish Todo-app', '2024-08-29');
            defaultProject.addTodo(defaultTodo);
            const newTodo = new Todo('Walk the dog', '2024-08-30');
            defaultProject.addTodo(newTodo);
            currentProject = defaultProject;
            };

        saveToLocalStorage();    
        return currentProject;    
    }
    
    const getProjects = () => {
        return projects;
    }

    const addProject = (name, description, todos) => {
        const project = new Project(name, description, todos = []);
        projects.push(project);
        saveToLocalStorage();
    }

    const addTodoToProject = (title, dueDate, priority, notes) => {
        const newTodo = new Todo(title, dueDate, priority, notes);
        const currentProject = getCurrentProject();
        currentProject.addTodo(newTodo);
    }

    const editTodoInProject = (title, dueDate, priority, notes, index) => {
        const newData = new Todo(title, dueDate, priority, notes);
        const currentProject = getCurrentProject();
        currentProject.updateTodo(index, newData);
    }

    const removeProject = (index) => {
        projects.splice(index,1);
        saveToLocalStorage();
    }

    const setCurrentProject = (name) => {
        currentProject = projects.find((project) => project.name === name);
        saveToLocalStorage();
    };

    const getCurrentProject = () => {
        return currentProject;
    }

    const getCurrentProjectName = () => {
         return currentProject.name;
     }

    const getTodosInCurrentProject = () => {
        currentProject = getCurrentProject();
        return currentProject.getTodos;
    }

    const removeTodo = (index) => {
        currentProject = getCurrentProject();
        currentProject.removeTodo(index,1);
        saveToLocalStorage();
    }

    const toggleCompleted = (item) => {
      return item.completed  ? false : true;
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
        getCurrentProject,
        getCurrentProjectName,
        getTodosInCurrentProject,
        saveToLocalStorage,
        loadFromLocalStorage,
        addTodoToProject,
        editTodoInProject,
        removeTodo,
        toggleCompleted
    }
})();

export default storageManager;