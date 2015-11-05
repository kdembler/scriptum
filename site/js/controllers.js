angular.module('scriptumApp', ['ui.materialize', 'duScroll', 'duParallax']).
controller('MainCtrl', function($scope, $document, parallaxHelper) {
  $scope.lockIcon = "lock_outline";

  $scope.background = parallaxHelper.createAnimator(-0.5);

  $scope.scrollToTop = function() {
    $document.scrollTop(0, 500);
  };

  $scope.scrollToContent = function() {
    var content = angular.element(document.getElementById("content"));
    $document.scrollTo(content, 0, 500);
  };

});
