/**
 * Created by thanh huyền on 04-Nov-16.
 */
'use strict';
angular.module('home_todoApp',[])

.controller('todoCtrl',function($scope) {
    $scope.todos = [];
    // retrieve data from localStorage
    if (localStorage.getItem('todoList') != null) {
        $scope.todos = JSON.parse(localStorage.getItem('todoList'));
    }
    // length of activelist
    $scope.lengthActive = 0;
    angular.forEach($scope.todos,function (x) {
       if (!x.done) $scope.lengthActive++;
    });
    $scope.readonly = true;

    $scope.addTodo = function() {
        if ($scope.input !="") {
            $scope.todos.push({ content:$scope.input, done:false, editing:false});
            $scope.input="";
            $scope.lengthActive++;
            localStorage.setItem('todoList',JSON.stringify($scope.todos));  // save to local storage
        }
    };

    $scope.checkAll= function(){
        for (var i=0;i<$scope.todos.length;i++) {
                $scope.todos[i].done = $scope.allChecked;
        }
        if ($scope.allChecked) {
            $scope.lengthActive = 0;
        }
        else $scope.lengthActive = $scope.todos.length;
        localStorage.setItem('todoList',JSON.stringify($scope.todos));
    };
    $scope.removeCompleted = function() {
        var oldList = $scope.todos;
        $scope.todos=[];
        angular.forEach(oldList,function(x) {
                if(!x.done) $scope.todos.push(x);
        });
        $scope.lengthActive = $scope.todos.length;
        localStorage.setItem('todoList',JSON.stringify($scope.todos));

    };
    $scope.changeTotalTodos = function(item) {
        if(item.done) $scope.lengthActive--;
        else $scope.lengthActive++;
        localStorage.setItem('todoList',JSON.stringify($scope.todos));
    };
    $scope.totalTodos = function() {
        return $scope.lengthActive;
    };

    $scope.remove = function(index) {
        if (!$scope.todos[index].done) $scope.lengthActive--;
        else {}
        $scope.todos.splice(index, 1);
        localStorage.setItem('todoList',JSON.stringify($scope.todos));
    };
    $scope.status = "ALL";
    $scope.FILTER = function(item) {
        switch($scope.status) {
            case "ALL": {
                    return true;
                    break;
            }
            case "COMPLETED" :{
                    return item.done;
                    break;
            }
            case "ACTIVE": {
                    return !item.done;
                    break;
            }
        }
    };
    $scope.editTodo = function () {
        $scope.readonly = false;
    };
    $scope.saveEdit = function () {
        $scope.readonly = true;
    };
});
