var HomeCtrl = function($scope, posts, auth) {
    $scope.posts = posts.posts;

    $scope.addPost = function() {
        if(!$scope.title || $scope.title === '') return;
        if(!scope.body || $scope.body === '') return;

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

HomeCtrl.$inject = ['$scope', 'posts', 'auth'];

angular.module('scriptumApp').controller('HomeCtrl', HomeCtrl);
