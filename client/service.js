/**
 * Created by taimoortariqdev on 3/4/2017.
 */


angular.module('myApp')
    .service('UserService', function ($state) {
        var vm = this;
        var user = false;

        this.checkUser = function () {

            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    console.log("TRUE");
                    $state.go('dashboard');
                    return true;

                } else {
                    console.log("FALSE");
                    $state.go('login')
                    return false;
                }
            });
        }

    });


