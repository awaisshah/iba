/**
 * Created by taimoortariqdev on 3/4/2017.
 */


/**
 * Created by Taimoor on 6/30/2015.
 */



(function () {

    angular.module("myApp")
        .controller("DashboardController", ['$state', '$timeout', '$mdSidenav' ,DashboardController]);

    function DashboardController($state, $timeout, $mdSidenav) {
        var vm = this;

        var user = firebase.auth().currentUser;
        console.log(user);


        this.toggleLeft = buildToggler('left');
        this.toggleRight = buildToggler('right');
        this.CustomerView = false;
        this.productName = "";
        this.productQuantity = 0;
        this.dateToDeliver = 0;
        this.customerOrders = [{}];

        this.user = firebase.auth().currentUser.uid;
        var orderRef = firebase.database().ref('order/' + vm.user + '/');
        console.log("USER"+this.user);

        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
            };
        }

        this.incrementCustomerOrder = function () {
            vm.customerOrders.push({
                productName: vm.productName,
                productQuantity: vm.productQuantity,
                dateToDeliver: vm.dateToDeliver
            });
        };

        this.logout = function () {
            firebase.auth().signOut().then(function() {
                console.log('Signed Out');
                $state.go('login');

            }, function(error) {
                console.error('Sign Out Error', error);
            });
        };

        this.customers = function () {
            console.log("Customers");
            this.CustomerView = !this.CustomerView;
        };


        this.admin = function() {
            console.log("admin");
        };

        this.placeOrder = function() {
            console.log("place order");
            console.log(vm.customerOrders);
            for(var i = 0; i < vm.customerOrders.length; i++)
                firebase.database().ref('orders/' + vm.user+'/').push(vm.customerOrders[i]);

        };



        var orderRef = firebase.database().ref('orders/' + vm.user + '/');
        orderRef.on('value', function(snapshot) {
            snapshot.forEach(function (snap) {
                console.log(snap.val());
                console.log(snap.key);
            })
        });



    }

})();