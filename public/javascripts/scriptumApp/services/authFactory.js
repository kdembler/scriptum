var AuthFac = function($http, $window) {
    var fac = {};

    fac.saveToken = function(token) {
        $window.localStorage['scriptum-token'] = token;
    };

    fac.getToken = function() {
        return $window.localStorage['scriptum-token'];
    };

    fac.isLoggedIn = function() {
        var token = auth.getToken();

        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        } else return false;
    };

    fac.currentUser = function() {
        if (auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };

    fac.register = function(user) {
        return $http.post('/register', user)
            .success(function(data) {
                auth.saveToken(data.token);
            });
    };

    fac.logIn = function(user) {
        Materialize.toast('Auth call!', 4000);
        return $http.post('/login', user)
            .success(function(data) {
                auth.saveToken(data.token);
                Materialize.toast('Logged in!', 4000);
            });
    };

    fac.logOut = function(user) {
        $window.localStorage.removeItem('scriptum-token');
    };

    return fac;
};

AuthFac.$inject = ['$http', '$window'];

angular.module('scriptumApp').factory('auth', AuthFac);
