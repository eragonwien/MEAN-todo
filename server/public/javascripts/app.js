var app = angular.module('meantodo', []);

app.controller('masterController', masterController);

masterController.$inject = ['$scope', 'userService']
function masterController(sc, userService) {
    var vm = this;
    vm.isLoggedIn = vm.user;
    vm.logout = logout;
    checkLoggedIn();

    function checkLoggedIn() {
        userService.checkLoggedIn(handleService);

        function handleService(response) {
            if (response.status == 200) {
                vm.isLoggedIn = true;
                vm.user = response.data;
            }
        }
    }

    function logout() {
        console.log('LOGGING OUT');
        
        userService.logout(handleLogout);

        function handleLogout(response) {
            console.log(response);
            // if success, show login and hide everything else
            if (response.status == 200) {
                vm.isLoggedIn = false;
                vm.user = {};
            }
        }
    }
}