/**
 * Created by samuelmoss on 11/10/15.
 */

var myApp = angular.module('myApp', []);

myApp.controller('FormController', ['$scope', '$http', function($scope, $http){
    $scope.note = {};
    $scope.idArray=[];

    //POST
    $scope.clickButton = function(note){
        $http.post('/submit', note).then(function(response){

            $scope.messageObjectAppend=response.data;
            $scope.note = {};
            $scope.predicate = true;
            $scope.getPeople();

        });
    };

    //GET
    $scope.getPeople = function(){
        $http.get('/submit').then(function(response){
            $scope.idArray = response.data;
        });
    };

    //DELETE
    $scope.deleteButton = function(id){

        $http.delete('/submit'+ id[0].id).then(function(response){
            //console.log(response);
            $scope.messageObjectAppend = {};
            $scope.deletedMsg = "Your message has been deleted from the database.";
            $scope.predicate = false;
        })
    };

}]);