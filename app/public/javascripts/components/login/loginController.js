angular
    .module('meantodo')
    .controller('loginController', loginController);

loginController.$inject = ['$scope', 'loginService', '$location']
function loginController(sc, loginService, location) {
    var vm = this;
    vm.userIsLoggingIn = true; // always show log-in first 
    vm.user = {};
    vm.submit = submit;
    vm.changeView = changeView;
    vm.closeMessage = closeMessage;

    function submit() {
        if (vm.userIsLoggingIn) {
            login();
        }
        else {
            signup();
        }
    }

    function changeView() {
        vm.userIsLoggingIn = !vm.userIsLoggingIn;
        closeMessage();
    }

    function closeMessage() {
        setAlert(null, false);
    }

    function login() {
        loginService.login(vm.user.email, vm.user.password).then(loginHandler);

        function loginHandler(response) {
            // display login result onto view
            var status = response.status;
            if (status == 200) {
                // on login success, add user to localstorage and close login view
                loginService.setLocalUser(response.data);
                vm.user = {};
                location.path("/");
            }
            else if (status == 401) {
                setAlert("Invalid Credentials.", false);                
            }
            else {
                // on error, show error message
                setAlert(response.status + " " + response.statusText, false);
            }
        }
    }

    function signup() {
        loginService.signup(vm.user).then(signupHandler);

        function signupHandler(response) {
            console.log(response);
            var status = response.status;
            // on signup success, show positive messsage and redirect user to login view
            if (status == 200) {
                changeView();              
                setAlert("Account is created", true);           
                return;
            }
            // on failure, show negative message and point out error input        
            setAlert(response.status + " " + response.statusText, false);   
        }
    }
    
    function setAlert(content, isSuccessAlert) {
        vm.message = content;
        if (content) {
            vm.messageColor = (isSuccessAlert) ? "alert alert-success" : "alert alert-danger";    
        }
    }
}