/**
 * Created by thanh huyền on 11-Nov-16.
 */
'use strict';
angular.module('register',[])
.controller('RegisterCtrl', function ($scope, $location) {
    $scope.profile = [];
    if (localStorage.getItem('profiles') != null) {
        $scope.profile = JSON.parse(localStorage.getItem('profiles'));
    }
    var keepGoing = true;
    $scope.register = function () {
        $scope.profile.push({
            username: $scope.username,
            email: $scope.email,
            password: $scope.password
        });
        localStorage.setItem('profiles',JSON.stringify($scope.profile));
        alert('register success!');
        $location.path('/home');
    };
});