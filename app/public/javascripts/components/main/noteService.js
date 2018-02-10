angular
    .module('meantodo')
    .factory('noteService', noteService);

noteService.$inject = ['$http'];
function noteService(http) {
    var service = {
        getAllNotesByUid: getAllNotesByUid
    };
    return service;

    /* GET all notes */
    function getAllNotesByUid(uid) {
        return http({
            method: 'GET',
            url: '/api/users/' + uid + '/projects'
        }).then(getAllNotesSuccess, getAllNotesError);
    }

    function getAllNotesSuccess(response) {
        return response;
    }
    function getAllNotesError(error) {
        return error;
    }

    /* GET single note */

    /* CREATE single note */

    /* EDIT single note */

    /* DELETE single note */
}