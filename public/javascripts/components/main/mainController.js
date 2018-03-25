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
        vm.loading = true;
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
                    vm.loading = false;
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
        vm.loading = true;
        projectService.createNewProject(vm.user.Uid, project).then(createNewProjectHandler);

        function createNewProjectHandler(response) {
            // refresh list of project
            setAlert('Project created.', true);
            vm.newProject = {};
            vm.loading = false;
            getAllProjects();
        }
    }

    function deleteProject(project) {
        vm.loading = true;
        projectService.deleteProjectById(project.Pid, project.Uid).then(deleteProjectHandler);

        function deleteProjectHandler(response) {
            vm.loading = false;
            // refresh list of project
            setAlert('Project deleted.', true);
            var index = vm.projects.indexOf(project);
            vm.projects.splice(index, 1);
        }
    }

    function createTodo(project, todo) {
        vm.loading = true;
        todoService.createTodo(project, todo).then(createTodoHandler);

        function createTodoHandler(response) {
            vm.loading = false;
            // refresh list of project
            //setAlert('Todo added to ' + project.Name, true);
            todo = angular.copy(response.config.data);
            todo.Tid = response.data.insertId;
            project.todos.push(todo);            
            project.newTodo = {};
        }
    }

    function deleteTodo(project, todo) {
        vm.loading = true;
        todoService.deleteTodo(project, todo).then(deleteTodoHandler);

        function deleteTodoHandler(response) {
            vm.loading = false;
            setAlert('Todo deleted.', true);
            var index = project.todos.indexOf(todo);
            project.todos.splice(index, 1);
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
        vm.loading = true;
        todoService.updateTodo(todo).then(updateTodoHandler);

        function updateTodoHandler(response) {
            vm.loading = false;
            //setAlert('Todo Nr.' + todo.Tid + ' is updated.', true);
            var progress = response.data.projectProgress;
            vm.projects.forEach(updateProgress);

            function updateProgress(value, index) {
                if(value.Pid == todo.Pid) {
                    value.Progress = progress;
                }
            }
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