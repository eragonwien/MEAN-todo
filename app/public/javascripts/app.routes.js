angular
    .module('meantodo')
    .config(route);

route.$inject = ['$routeProvider'];
function route(routeProvider) {
    routeProvider
    .when('/', {
        templateUrl: 'javascripts/components/main/mainView.html',
        controller: 'mainController',
        controllerAs: 'main',
        resolve: {
            auth: authUser
        }
    })
    .when('/login', {
        templateUrl: 'javascripts/components/login/loginView.html',
        controller: 'loginController',
        controllerAs: 'login'
    })
    .when('/error/404', {
        templateUrl: 'javascripts/components/error/404View.html'
    })
    .otherwise({
        redirectTo: '/error/404'
    });
}


authUser.$inject = ['$q', '$location', 'loginService']
function authUser(q, location, loginService) {
    /*
        1. check if user is logged in before in local storage, if not, go to login view
        2. check if the local user is still valid by accessing auth route, if not, go to login view
        3. else continue to main view
    */
    if (!loginService.getLocalUser()) {
        location.path('/login');
        return false;
    }
    
    var deferred = q.defer();
    loginService.authUser().then(authUserHandler);
    return deferred.promise;

    function authUserHandler(authIsSuccess) {
        if (authIsSuccess) {
            deferred.resolve(true);
        } else {
            deferred.reject();
            location.path('/login');
        }
    }
};