angular
    .module('meantodo')
    .factory('projectService', projectService);

projectService.$inject = ['$http'];
function projectService(http) {
    var service = {
        getAllProjectsByUid: getAllProjectsByUid,
        getProjectById: getProjectById,
        createNewProject: createNewProject,
        deleteProjectById: deleteProjectById
    };
    return service;

    /* GET all projects */
    function getAllProjectsByUid(uid) {
        return http({
            method: 'GET',
            url: '/api/users/' + uid + '/projects'
        }).then(getAllProjectsSuccess, getAllProjectsError);

        function getAllProjectsSuccess(response) {
            return response;
        }
        function getAllProjectsError(error) {
            return error;
        }
    }

    /* GET single project */
    function getProjectById(pid, uid) {
        return http({
            method: 'GET',
            url: '/api/users/' + uid + '/projects/' + pid,
        }).then(getProjectByIdSuccess, getProjectByIdError);

        function getProjectByIdSuccess(response) {
            return response;
        }

        function getProjectByIdError(error) {
            return error;
        }
    }
    /* CREATE single project */
    function createNewProject(uid, newProject) {
        return http({
            method: 'POST',
            url: '/api/users/' + uid + '/projects/',
            data: {
                Name: newProject.name,
                Progress: 0,
                Status: 'Initial'
            }
        }).then(createNewProjectSuccess, createNewProjectError);

        function createNewProjectSuccess(response) {
            return response;
        }

        function createNewProjectError(error) {
            return error;
        }
    }

    /* EDIT single project */

    /* DELETE single project */
    function deleteProjectById(pid, uid) {
        return http({
            method: 'DELETE',
            url: '/api/users/' + uid + '/projects/' + pid
        }).then();
    }

    function deleteProjectByIdSuccess(response) {
        return response;
    }

    function deleteProjectByIdError(error) {
        return error;
    }
}