var Conf = function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'HomeCtrl',
        resolve: {

        }
    });
};

Conf.$inject = ['$stateProvider', '$urlRouterProvider'];

angular.module('scriptumApp').config(Conf);
