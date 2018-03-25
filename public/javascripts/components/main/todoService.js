angular
    .module('meantodo')
    .factory('todoService', todoService);

todoService.$inject = ['$http']
function todoService(http) {
    var service = {
        getTodos: getTodos,
        createTodo: createTodo,
        deleteTodo: deleteTodo,
        updateTodo: updateTodo
    }
    return service;

    function getTodos(uid) {
        return http({
            method: 'GET',
            url: '/api/users/' + uid + '/todos'
        }).then(getTodosSuccess, getTodosError);

        function getTodosSuccess(response) {
            return response;
        }

        function getTodosError(error) {
            return error;
        }
    }

    function createTodo(project, todo) {
        return http({
            method: 'POST',
            url: '/api/users/' + project.Uid + '/projects/' + project.Pid + '/todos',
            data: {
                Uid: project.Uid,
                Pid: project.Pid,
                Text: todo.Text,
                Status: 'Incomplete'
            }
        }).then(createTodoSuccess, createTodoError);

        function createTodoSuccess(response) {
            return response;
        }

        function createTodoError(error) {
            return error;
        }
    }

    function deleteTodo(project, todo) {
        return http({
            method: 'DELETE',
            url: '/api/users/' + project.Uid + '/projects/' + project.Pid + '/todos/' + todo.Tid,
        }).then(deleteTodoSuccess, deleteTodoError);

        function deleteTodoSuccess(response) {
            return response;
        }

        function deleteTodoError(error) {
            return error;
        }
    }

    function updateTodo(todo) {
        return http({
            method: 'PUT',
            url: '/api/users/' + todo.Uid + '/projects/' + todo.Pid + '/todos/' + todo.Tid,
            data: {
                Uid: todo.Uid,
                Pid: todo.Pid,
                Tid: todo.Tid,
                Text: todo.Text,
                Status: todo.Status
            }
        }).then(updateTodoSuccess, updateTodoError);

        function updateTodoSuccess(response) {
            return response;
        }

        function updateTodoError(error) {
            return error;
        }
    }
}