var HomeCtrl = function($scope, posts, auth) {
    $scope.lockIcon = 'lock_outline';

    $scope.scrollToTop = function() {
        $('body').velocity('scroll');
    };

    $scope.scrollToContent = function() {
        $('#content').velocity('scroll');
    };
    posts.getAll();
    $scope.posts = posts.posts;

    $scope.addPost = function() {
        if (!$scope.newPost.title || $scope.newPost.title === '') return;
        if (!scope.newPost.body || $scope.newPost.body === '') return;

        posts.create({
            title: $scope.newPost.title,
            body: $scope.newPost.body
        });
        $scope.newPost.title = '';
        $scope.newPost.body = '';
    };

    $scope.likePost = function(post) {
        post.like(post);
    };

    $scope.dislikePost = function(post) {
        post.dislike(post);
    };

    $scope.logMeIn = function() {
        console.log($scope.login);
    };

    $scope.registerMe = function() {

    };

    $scope.resetLogin = function() {
        $scope.login.user = "";
        $scope.login.password = "";
        $scope.register.user = "";
        $scope.register.password = "";
        $scope.register.repeat = "";
    };

    $scope.resetPost = function() {
        $scope.newPost.title = '';
        $scope.newPost.body = '';
    };

    $scope.isLoggedIn = auth.isLoggedIn;
};

HomeCtrl.$inject = ['$scope', 'posts', 'auth'];

angular.module('scriptumApp').controller('HomeCtrl', HomeCtrl);
