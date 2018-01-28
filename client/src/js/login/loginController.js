angular
    .module('todoapp')
    .controller('loginController', loginController);

function loginController() {
    var vm = this;
    vm.submit = function () {
        console.log('SUBMITED');    
    }
}