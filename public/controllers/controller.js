var myApp = angular.module('myApp', []);
var enableAdd = false;

myApp.controller('AppCtrl', ['$scope','$http', 
	function($scope, $http) {
	console.log('Hello from the controller');

	var refresh = function(){
		$scope.enableAdd = false;

		$http.get('/contactlist').success(function(response){
			console.log('GET data received');
			$scope.contactlist = response;
			$scope.contact = '';
		});
	};
	
	refresh();

	$scope.addContact = function(){
		console.log($scope.contact);

		$http.post('/contactlist', $scope.contact).success(function(response){
			console.log(response);
			refresh();
		});
	};

	$scope.remove = function(id){
		console.log(id);

		$http.delete('/contactlist/' + id).success(function(response){
			console.log(response);
			refresh();
		});
	};

	$scope.edit = function(id){
		console.log(id);
		$scope.enableAdd = true;
		$http.get('/contactlist/' + id).success(function(response){
			$scope.contact = response;
		});
	};

	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	};

	$scope.deselect = function(){
		$scope.contact = '';
		$scope.enableAdd = false;
	};
}]);