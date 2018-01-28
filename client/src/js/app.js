var app = angular.module('todoapp', []);

app.controller('masterController', masterController);

function masterController() {
    var vm = this;
    vm.name = "TODO";
}