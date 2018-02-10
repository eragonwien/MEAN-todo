angular
    .module('meantodo')
    .factory('loginService', loginService);

loginService.$inject = ['$http', '$localStorage']
function loginService(http, localStorage) {
    var service = {
        signup: signup,
        login: login,
        logout: logout,
        setLocalUser: setLocalUser,
        getLocalUser: getLocalUser,
        deleteLocalUser: deleteLocalUser,
        authUser: authUser
    }

    return service;

    /* SIGN UP */
    function signup(user) {
        return http({
            method: 'POST',
            url: '/signup',
            data: {
                Email: user.email,
                Password: user.password,
                Role: 'Standard',
                Firstname: user.firstname,
                Lastname: user.lastname
            }
        }).then(signupSuccess, signupError);
    }

    function signupSuccess(response) {
        return response;       
    }

    function signupError(error) {
        return error;
    }

    /* LOGIN */
    function login(email, password) {
        return http({
            method: 'POST',
            url: '/login',
            data: {
                Email: email,
                Password: password
            }
        }).then(loginSuccess, loginError);
    }

    function loginSuccess(response) {
        // on success, return the response to controller
        return response;
    }

    function loginError(error) {
        // on error, return error to controller
        return error;
    }

    /* LOG OUT */
    function logout() {
        return http({
            method: 'POST',
            url: '/logout'
        }).then(logoutSuccess, logoutError);
    }

    function logoutSuccess(response) {
        deleteLocalUser();
        return false;
    }

    function logoutError(error) {
        return error;
    }

    /* SAVE USER IN LOCAL STORAGE */
    function setLocalUser(user) {
        localStorage.user = user;
    }

    function getLocalUser() {
        return localStorage.user;
    }

    function deleteLocalUser() {
        delete localStorage.user;
    }

    /* AUTH user on each route change */
    function authUser() {
        return http({
            method: 'POST',
            url: '/auth'
        }).then(authUserSuccess, authUserError);
    }

    function authUserSuccess(response) {
        return true;
    }

    function authUserError(error) {
        return false;
    }
}