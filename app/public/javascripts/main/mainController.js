angular
    .module('meantodo')
    .controller('mainController', mainController);

mainController.$inject = ['$scope'];
function mainController(sc) {
    var vm = this;
    vm.output = {};
    vm.user = sc.master.user;
}