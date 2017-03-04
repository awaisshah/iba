/**
 * Created by Taimoor tariq on 1/19/2016.
 */

(function () {

    angular.module("myApp", ['ui.router', 'ngMaterial'])
        .controller("AppController", ['$state', 'UserService', AppController]);

    function AppController($state, UserService) {

        var check = UserService.checkUser();
        if(check) {
            $state.go('dashboard');
        }

        this.goToView = function () {
            $state.go('view')
        };


        this.goToAdd = function () {
            $state.go('add')
        };

    }


})();