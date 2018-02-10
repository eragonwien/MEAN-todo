angular
    .module('meantodo')
    .controller('mainController', mainController);

mainController.$inject = ['$scope', 'loginService', 'noteService'];
function mainController(sc, loginService, noteService) {
    var vm = this;
    vm.empty = false;
    vm.user = loginService.getLocalUser();
    vm.notes = getAllNotes();

    function getAllNotes() {
        return noteService.getAllNotesByUid(vm.user.Uid).then(getAllNotesHandler);

        function getAllNotesHandler(response) {
            // if result is empty, display add button
            if (response.data.length == 0) {
                vm.empty = true;
            }
        }
    }
}