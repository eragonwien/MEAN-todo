angular
    .module('meantodo')
    .factory('userService', userService);

userService.$inject = ['$http']
function userService(http) {
    var service = {
        login: login,
        checkLoggedIn: checkLoggedIn,
        logout: logout
    }

    return service;

    function login(email, password, done) {
        http({
            method: 'POST',
            url: '/login',
            data: {
                Email: email,
                Password: password
            }
        }).then(function success(response) {
            done(response);
        }, function error(error) {
            done(error);
        });
    }

    function checkLoggedIn(done) {
        http({
            method: 'GET',
            url: '/auth'
        }).then(function success(response) {
            done(response);
        }, function error(error) {
            done(error);
        });
    }

    function logout(done) {
        http({
            method: 'POST',
            url: '/logout'
        }).then(function success(response) {
            done(response);
        }, function error(error) {
            done(error);
        });
    }
}