import { Project } from "./projects";
import { Todo } from "./todos";


const storageManager = (()=> {
    let projects = [];

    const saveToLocalStorage = () => {
        localStorage.setItem('projects', JSON.stringify(projects.map(project => ({
            name: project.name,
            description: project.description,
            todos: project.todos
            /*todos: project.getTodos().map(todo => ({
                title: todo.title,
                dueDate: todo.dueDate,
                priority: todo.priority,
                notes: todo.notes
            }))*/
        }))));
    };

    const loadFromLocalStorage = () => {
        const storedProjects = localStorage.getItem('projects');

        if (storedProjects) {
            projects = JSON.parse(storedProjects).map(item => {
                const project = new Project(item.name, item.description, item.todos);
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
    
        //Add default project if empty
        if (!projects.length) {
            const defaultProject = new Project('Tasks');
            projects.push(defaultProject);
            };
    
        saveToLocalStorage();
    }
    
    const getProjects = () => {
        return projects;
    }

    const addProject = (name, description, todos) => {
        const project = new Project(name, description, todos);
        projects.push(project);
        saveToLocalStorage();

    }

    //Initialize project with todos upon loading page
    loadFromLocalStorage();

    return {
        projects,
        getProjects,
        addProject,
        saveToLocalStorage,
        loadFromLocalStorage
    }
})();

export default storageManager;