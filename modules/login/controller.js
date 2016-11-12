/**
 * Created by thanh huyền on 04-Nov-16.
 */
'use strict';
angular.module('login')

// .controller ('loginCtrl',function($scope, $location, $rootScope) {
//     $scope.username = "";
//     $scope.password = "";
//     $scope.login = function() {
//         if ($scope.username == 'hey' && $scope.password == 'hey') {
//             $location.path('/home');
//             $rootScope.loggedIn = true;
//         }
//         else {
//             alert('wrong');
//         }
//     };
// });
.controller('loginCtrl',
    ['$scope', '$rootScope', '$location', 'loginService',
        function ($scope, $rootScope, $location, loginService) {
            // reset login status
            loginService.ClearCredentials();
            $scope.login = function () {
                $scope.dataLoading = true;
                loginService.Login($scope.username, $scope.password, function(response) {
                    if(response.success) {
                        loginService.SetCredentials($scope.username, $scope.password);
                        $location.path('/home');
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            };
            $scope.register = function () {
                alert("ll");
                $location.path('/register');
            }
        }]);