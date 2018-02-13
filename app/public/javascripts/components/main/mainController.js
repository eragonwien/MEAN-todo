angular
    .module('meantodo')
    .controller('mainController', mainController);

mainController.$inject = ['$scope', 'loginService', 'projectService', 'todoService'];
function mainController(sc, loginService, projectService, todoService) {
    var vm = this;
    vm.empty = false;
    vm.user = loginService.getLocalUser();
    vm.getAllProjects = getAllProjects;
    vm.createNewProject = createNewProject;
    vm.deleteProject = deleteProject;
    vm.createTodo = createTodo;
    vm.deleteTodo = deleteTodo;
    vm.updateTodo = updateTodo;

    getAllProjects();

    function getAllProjects() {
        return projectService.getAllProjectsByUid(vm.user.Uid).then(getAllProjectsHandler);

        function getAllProjectsHandler(response) {
            // if result is empty, display add button
            var projects = response.data;
            if (projects.length == 0) {
                vm.empty = true;
            } 
            else {
                vm.projects = projects;
            }
            // get todos of each project
            //projects.map(getTodos);
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

    function updateTodo(project, todo) {
        
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