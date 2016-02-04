var HomeCtrl = function($scope, $document, posts, auth) {
    $scope.lockIcon = 'lock_outline';
    // $scope.background = parallaxHelper.createAnimator(-0.5);

    $scope.scrollToTop = function() {
        $document.duScrollTo(0, 0, 500);
    };

    $scope.scrollToContent = function() {
        var content = angular.element(document.getElementById('content'));
        $document.duScrollTo(content, 0, 500);
    };
    posts.getAll();
    $scope.posts = posts.posts;

    $scope.addPost = function() {
        if (!$scope.title || $scope.title === '') return;
        if (!scope.body || $scope.body === '') return;

        posts.create({
            title: $scope.title,
            body: $scope.body
        });
        $scope.title = '';
        $scope.body = '';
    };

    $scope.likePost = function(post) {
        post.like(post);
    };

    $scope.dislikePost = function(post) {
        post.dislike(post);
    };

    $scope.isLoggedIn = auth.isLoggedIn;
};

HomeCtrl.$inject = ['$scope', '$document', 'posts', 'auth'];

angular.module('scriptumApp').controller('HomeCtrl', HomeCtrl);
