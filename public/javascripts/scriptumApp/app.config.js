// var Conf = function($stateProvider, $urlRouterProvider) {
//     $stateProvider.state('home', {
//         url: '/home',
//         templateUrl: '/home.html',
//         controller: 'HomeCtrl',
//         resolve: {
//             postPromise: ['posts', function(posts) {
//                 return posts.getAll();
//             }]
//         }
//     }).state('post', {
//         url: '/post/{id}',
//         templateUrl: '/post.html',
//         controller: 'PostCtrl',
//         resolve: {
//             post: ['$stateParams', 'posts', function($stateParams, posts) {
//                 return posts.get($stateParams.id);
//             }]
//         }
//     });
// };

// Conf.$inject = ['$stateProvider', '$urlRouterProvider'];

// angular.module('scriptumApp').config(Conf);
