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
        console.log('Save', currentProject);
    };

    const loadFromLocalStorage = () => {
        const storedProjects = localStorage.getItem('projects');
        const storedCurrentProject = localStorage.getItem('currentProject');
        

        if (storedProjects) {
            projects = JSON.parse(storedProjects).map(item => {
                const project = new Project(item.name, item.description, item.todos);
                if (project.todos) {
                project.getTodos().forEach(todoData => {
                    const todo = new Todo(
                        todoData.title,
                        todoData.dueDate,
                        todoData.priority,
                        todoData.notes
                    );
                    project.addTodo(todo);
                });
                }
                return project;
            });
        }

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
            const defaultTodo = new Todo('Finish Todo-app', '23-09-2024');
            defaultProject.addTodo(defaultTodo);
            const newTodo = new Todo('Walk the dog', '23-08-2024');
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
        const project = new Project(name, description, todos);
        projects.push(project);
        saveToLocalStorage();
    }

    const addTodoToProject = (title, dueDate, priority, notes) => {
        const todo = new Todo(title, dueDate, priority, notes);
        const currentProject = getCurrentProject();
        currentProject.addTodo(todo);
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
        addTodoToProject
    }
})();

export default storageManager;