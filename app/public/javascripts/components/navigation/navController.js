angular
    .module('meantodo')
    .controller('navController', navController);

navController.$inject = ['$scope', 'loginService', '$location']
function navController(sc, loginService, location) {
    var vm = this;
    vm.userIsLoggedIn = userIsLoggedIn;
    vm.logout = logout;

    function userIsLoggedIn() {
        return (loginService.getLocalUser()) ? true : false;
    }

    function logout() {
        loginService.logout().then(logoutHandler);

        function logoutHandler(error) {
            if (error) {
                console.log(error);
                return;
            }
            loginService.deleteLocalUser();
            location.path('/login');
        }
    }
}