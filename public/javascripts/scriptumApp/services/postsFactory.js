var PostsFac = function($http, auth) {
    var fac = {
        posts: []
    };
    var getAuthHeader = function() {
        return {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        };
    };

    fac.get = function(id) {
        return $http.get('/posts/' + id).then(function(res) {
            return res.data;
        });
    };

    fac.getAll = function() {
        return $http.get('/posts', getAuthHeader())
            .success(function(data) {
                angular.copy(data, fac.posts);
            });
    };

    fac.create = function(post) {
        return $http.post('/posts/', post, getAuthHeader())
            .success(function(data) {
                fac.posts.push(data);
            });
    };

    fac.like = function(post) {
        return $http.put('/posts/' + post._id + '/like', null, getAuthHeader());
    };

    fac.dislike = function(post) {
        return $http.put('/posts/' + post._id + '/dislike', null, getAuthHeader());
    };

    fac.addComment = function(post, comment) {
        return $http.post('/posts/' + post._id + '/comments', comment, getAuthHeader());
    };

    fac.likeComment = function(post, comment) {
        return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/like', null, getAuthHeader())
            .success(function(data) {
                comment = data;
            });
    };
    return fac;
};

PostsFac.$inject = ['$http', 'auth'];

angular.module('scriptumApp').factory('posts', PostsFac);
