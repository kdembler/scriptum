TestCtrl.$inject = ['$scope'];
angular.module('scriptumApp')
.controller('TestCtrl', TestCtrl);

function TestCtrl($scope) {
    $scope.test = 'test variable';
}
