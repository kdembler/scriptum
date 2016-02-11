var HomeCtrl = function($scope, posts, auth) {
    $scope.lockIcon = auth.isLoggedIn() ? 'lock_open' : 'lock_outline';
    $scope.login = {};
    $scope.register = {};
    $scope.newPost = {};

    $scope.lockTarget = function() {
        if(auth.isLoggedIn())
            return '#logout-modal';
        else
            return '#login-modal';
    };

    $scope.lockEnter = function() {
        $scope.lockIcon = auth.isLoggedIn() ? 'lock_outline' : 'lock_open';
    };

    $scope.lockLeave = function() {
        $scope.lockIcon = auth.isLoggedIn() ? 'lock_open' : 'lock_outline';
    };

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
        auth.logIn($scope.login).error(function(error) {
            Materialize.toast(error.message, 4000);
        }).then(function() {
            Materialize.toast('Logged in!', 4000);
            $scope.lockIcon = 'lock_open';
            $scope.resetLogin();
            $('#login-modal').closeModal();
        });
    };

    $scope.logOut = function() {
        auth.logOut();
        $scope.lockIcon = 'lock_outline';
        Materialize.toast('Logged out!', 4000);
    };

    $scope.registerMe = function() {
        auth.register($scope.register).error(function(error) {
            Materialize.toast(error.message, 4000);
        }).then(function() {
            Materialize.toast('Registered!', 4000);
        });
    };

    $scope.resetLogin = function() {
        $scope.login.username = "";
        $scope.login.password = "";
        $scope.register.username = "";
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
