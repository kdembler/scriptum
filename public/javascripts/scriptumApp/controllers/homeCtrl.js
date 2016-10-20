var HomeCtrl = function($scope, posts, auth) {
    $scope.lockIcon = auth.isLoggedIn() ? 'lock_open' : 'lock_outline';
    $scope.login = {};
    $scope.register = {};
    $scope.newPost = {};

    $scope.openLogModal = function() {
        var target = auth.isLoggedIn() ? '#logout-modal' : '#login-modal';
        $(target).openModal();
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
        if (!$scope.newPost.title || $scope.newPost.title === '') {
            Materialize.toast('Post title cannot be empty!', 4000);
            return;
        }
        if (!$scope.newPost.body || $scope.newPost.body === '') {
            Materialize.toast('Post body cannot be empty!', 4000);
            return;
        }

        posts.create({
            title: $scope.newPost.title,
            body: $scope.newPost.body
        }).then(function() {
            Materialize.toast('Post added!', 4000);
            $scope.resetPost();
        });
    };

    $scope.addComment = function(post) {
        console.log('bam');
        console.log(post);
        console.log(post.newCommentBody);
        if (!post.newCommentBody || post.newCommentBody === '') return;
        console.log('bambam');
        return;
        posts.addComment(post, {
            body: $scope.newCommentBody
        }).success(function(comment) {
            $scope.post.comments.push(comment);
        });
        $scope.newCommentBody = '';
    };

    $scope.likePost = function(post) {
        if (!auth.isLoggedIn()) {
            Materialize.toast('You need to log in to be able to vote!', 4000);
            return;
        }
        posts.like(post).then(function(finished) {
            post.points = finished.data.points;
            post.liking = finished.data.liking;
            console.log(post);
        });
    };

    $scope.dislikePost = function(post) {
        if (!auth.isLoggedIn()) {
            Materialize.toast('You need to log in to be able to vote!', 4000);
            return;
        }
        posts.dislike(post).then(function(finished) {
            post.points = finished.data.points;
            post.liking = finished.data.liking;
        });
    };

    $scope.isLikingPost = function(post) {
        return post.liking == 1;
    };

    $scope.isDislikingPost = function(post) {
        return post.liking == -1;
    };

    $scope.logMeIn = function() {
        auth.logIn($scope.login).error(function(error) {
            Materialize.toast(error.message, 4000);
        }).then(function() {
            Materialize.toast('Logged in!', 4000);
            $scope.lockIcon = 'lock_open';
            $scope.resetLogin();
            posts.getAll();
        });
    };

    $scope.logOut = function() {
        auth.logOut();
        posts.getAll();
        $scope.lockIcon = 'lock_outline';
        Materialize.toast('Logged out!', 4000);
    };

    $scope.registerMe = function() {
        auth.register($scope.register).error(function(error) {
            Materialize.toast(error.message, 4000);
        }).then(function() {
            Materialize.toast('Registered!', 4000);
            $scope.lockIcon = 'lock_open';
            $scope.resetLogin();
        });
    };

    $scope.resetLogin = function() {
        $('#login-modal').closeModal();
        $scope.login.username = "";
        $scope.login.password = "";
        $scope.register.username = "";
        $scope.register.password = "";
        $scope.register.repeat = "";
    };

    $scope.resetPost = function() {
        $scope.newPost.title = '';
        $scope.newPost.body = '';
        $('#addpost-modal').closeModal();
    };

    $scope.isLoggedIn = auth.isLoggedIn;
};

HomeCtrl.$inject = ['$scope', 'posts', 'auth'];

angular.module('scriptumApp').controller('HomeCtrl', HomeCtrl);
