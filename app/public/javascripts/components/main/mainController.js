angular
    .module('meantodo')
    .controller('mainController', mainController);

mainController.$inject = ['$scope', 'loginService', 'projectService', 'todoService'];
function mainController(sc, loginService, projectService, todoService) {
    var vm = this;
    vm.user = loginService.getLocalUser();
    vm.getAllProjects = getAllProjects;
    vm.createNewProject = createNewProject;
    vm.deleteProject = deleteProject;
    vm.createTodo = createTodo;
    vm.deleteTodo = deleteTodo;
    vm.checkTodo = checkTodo;
    vm.uncheckTodo = uncheckTodo;

    getAllProjects();

    function getAllProjects() {
        return projectService.getAllProjectsByUid(vm.user.Uid).then(getAllProjectsHandler);

        function getAllProjectsHandler(response) {
            var projects = response.data;
            vm.projects = projects;
            if (projects.length == 0) {
                return;
            } 
            getTodos(vm.user.Uid);

            function getTodos(uid) {
                return todoService.getTodos(uid).then(getTodosHandler);
        
                function getTodosHandler(response) {
                    applyTodosToProjects(response.data, projects);
                    return response.data;
                }
            }

            function applyTodosToProjects(todos, projects) {
                for (let p = 0; p < projects.length; p++) {
                    projects[p].todos = [];
                    for (let t = 0; t < todos.length; t++) {
                        if (todos[t].Pid == projects[p].Pid) {
                            projects[p].todos.push(todos[t]);
                        }
                    }
                }
            }
        }
    }

    function createNewProject(project) {
        projectService.createNewProject(vm.user.Uid, project).then(createNewProjectHandler);

        function createNewProjectHandler(response) {
            // refresh list of project
            setAlert('Project created.', true);
            getAllProjects();
            vm.newProject = {};
        }
    }

    function deleteProject(project) {
        projectService.deleteProjectById(project.Pid, project.Uid).then(deleteProjectHandler);

        function deleteProjectHandler(response) {
            // refresh list of project
            setAlert('Project deleted.', true);
            getAllProjects();
        }
    }

    function createTodo(project, todo) {
        todoService.createTodo(project, todo).then(createTodoHandler);

        function createTodoHandler(response) {
            // refresh list of project
            setAlert('Todo added to ' + project.Name, true);
            getAllProjects();
            
        }
    }

    function deleteTodo(project, todo) {
        todoService.deleteTodo(project, todo).then(deleteTodoHandler);

        function deleteTodoHandler(response) {
            setAlert('Todo deleted.', true);
            getAllProjects();
        }
    }

    function checkTodo(todo) {
        todo.Status = 'Complete';
        updateTodo(todo);
    }

    function uncheckTodo(todo) {
        todo.Status = 'Incomplete';
        updateTodo(todo);
    }

    function updateTodo(todo) {
        todoService.updateTodo(todo).then(updateTodoHandler);

        function updateTodoHandler(response) {
            setAlert('Todo Nr.' + todo.Tid + ' is updated.', true);
            getAllProjects();
        }
    }

    function setAlert(content, isSuccess) {
        vm.message = content;
        if(isSuccess){
            vm.messageClass = 'alert-success';
        }
        else {
            vm.messageClass = 'alert-danger';
        }
    }
}