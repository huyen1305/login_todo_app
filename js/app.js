'use strict';
//declare modules
angular.module('login',[]);
angular.module('home_todoApp',[]);
angular.module('register',[]);

angular.module('mainApp',[
    'login',
    'home_todoApp',
	'register',
    'ngRoute',
    'ngCookies'
])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'modules/login/views/login.html',
		controller: 'loginCtrl'
	})
	.when('/home', {
		templateUrl: 'modules/home_todoApp/views/home_todoList.html',
		controller: 'todoCtrl'
	})
	.when('/register', {
		templateUrl: 'modules/register/views/register.html',
		controller: 'RegisterCtrl'
	})
	.otherwise ({
		redirectTo: '/'
	});
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
	function ($rootScope, $location, $cookieStore, $http) {
		// keep user logged in after page refresh
		$rootScope.globals = $cookieStore.get('globals') || {};
		if ($rootScope.globals.currentUser) {
			$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
		}

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			// redirect to login page if not logged in
			if ($location.path() !== '/' && !$rootScope.globals.currentUser) {
				$location.path('/');
			}
		});
	}]);