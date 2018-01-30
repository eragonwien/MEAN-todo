angular
    .module('meantodo')
    .controller('loginController', loginController);

loginController.$inject = ['$scope', 'userService']
function loginController(sc, userService) {
    var vm = this;
    vm.user = {};
    vm.response = {};
    vm.login = login;

    function login() {
        userService.login(vm.user.Email, vm.user.Password, handleLogin);

        function handleLogin(response) {
        
            if (response.status == 200) {
                // hide login and pass user info to main controller
                sc.master.user = response.data; 
                sc.master.isLoggedIn = true;
            }
            else {
                // show error message
                vm.response = response;
            }
        }
    }
 
}