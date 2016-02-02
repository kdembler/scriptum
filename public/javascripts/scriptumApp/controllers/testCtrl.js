var TestCtrl = function($scope) {
    $scope.test = 'test variable';
};

TestCtrl.$inject = ['$scope'];
angular.module('scriptumApp').controller('TestCtrl', TestCtrl);
