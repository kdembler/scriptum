var PostCtrl = function($scope, posts, post, auth) {
    $scope.post = post;

    $scope.addComment = function() {
        if(!$scope.body || $scope.body === '') return;

        posts.addComment(post, {
            body: $scope.body
        }).success(function(comment) {
            $scope.post.comments.push(comment);
        });
        $scope.body = '';
    };

    $scope.likeComment = function(comment) {
        posts.likeComment(post, comment);
    };

    $scope.isLoggedIn = auth.isLoggedIn;
};

PostCtrl.$inject = ['$scope', 'posts', 'post', 'auth'];

angular.module('scriptumApp').controller('PostCtrl', PostCtrl);
