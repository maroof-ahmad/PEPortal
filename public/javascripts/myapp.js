var app = angular.module('piportal',['ngRoute']).run(function($rootScope,$http,$window,$location){
	// $window.sessionStorage.isAuthenticated= false;
	// $window.sessionStorage.currentUser = '';
	// console.log($window.sessionStorage.isAuthenticated);
	// console.log($window.sessionStorage.currentUser);
	$rootScope.signout = function(){

		$http.get('/signout');
		// $window.sessionStorage.isAuthenticated= false;
		$window.sessionStorage.currentUser = '';
		$location.path('/');

	}
});


app.config(function($routeProvider){
	console.log("config was called");
	$routeProvider
		.when('/',{
			templateUrl : './login.html',
			controller : 'loginController'
		})
		.when('/signup',{
			templateUrl : './signup.html',
			controller : 'signupController'
		})
		.when('/posts',{
			templateUrl : './home.html',
			controller : 'postsController'
		})
		.when('/posts/:id',{
			templateUrl : './postdetail.html',
			controller : 'individualpostController'
		})
		.otherwise({
			redirectTo: '/'
		});
		// .when('/index',{
		// 	templateUrl : './index.html',
		// 	controller : 'indexController'
		// })


});

app.controller('signupController',['$window','$scope','$http','$location', function($window,$scope,$http,$location){
	//console.log("signupController");
	$scope.user = {
		username: '',
		password : ''
	}
	$scope.signup = function(){
		console.log("signup function was called");
		$http.post('/signup',$scope.user)
		.success(function(data){
			if(data.status=="success"){
				// $window.sessionStorage.isAuthenticated= true;
				$window.sessionStorage.currentUser = data.currentUser.username;
				$location.path('/posts');
			} else {
				console.log("failure");
			}
		})
		.error(function(err){
			console.log(err);
		})

	}

}]);

app.controller('loginController',['$window','$scope','$http','$location', function($window,$scope,$http,$location){

	$scope.user = {
	username: '',
	password : ''
	}
	$scope.login = function(){
		// console.log("login function was called");
		$http.post('/login',$scope.user)
		.success(function(data){
			if(data.status=="success"){
				// $window.sessionStorage.isAuthenticated = true;
				$window.sessionStorage.currentUser = data.currentUser.username;
				$location.path('/posts');
			} else {
				console.log("failure");
			}
		})
		.error(function(err){
			console.log(err);
		})

	}
}]);

app.controller('postsController',['$window','$scope','$http','$location',function($window,$scope,$http,$location){


	if($window.sessionStorage.currentUser == ''){
		console.log("isAuthenticated was called");
		$location.path('/');
	}
	$scope.home= true;
	$scope.class1 = "active";
	$scope.class2 = "inactive";
	$scope.changetab = function(data){
		if(data == $scope.class1){
			if($scope.class1 == "inactive"){
				$scope.home = !$scope.home;
				$scope.class2 = "inactive";
				$scope.class1 = "active";
			}
		}
		else if(data == $scope.class2){
			if($scope.class2 == "inactive"){
				$scope.home = !$scope.home;
				$scope.class2 = "active";
				$scope.class1 = "inactive";
			}
		}
	}
	$scope.category = ["core", "software", "consultancy", "others"];
	$scope.relatedto = ["intern", "placement"];
	$scope.branch = ["mechanical","computer Science", "electrical","civil","meta","maths","biotech"];
	$scope.posts =[];
	$scope.post = {
		author: '',
		text: '',
		category: 'core',
		branch: 'biotech',
		company: '',
		relatedto: 'placement'
	};
	$http.get('/posts').success(function(data){
		$scope.posts = data;
	});
	$scope.send = function(){
		console.log($scope.post);
		$http.post('/posts',$scope.post)
		.success(function(data){
			$scope.posts.push(data);
			console.log("individual post done");
			$scope.post = {
				author: '',
				text: '',
				category: 'core',
				branch: 'biotech',
				company: '',
				relatedto: 'placement'
			};
		});
	}

}]);

app.controller('indexController',['$scope',function($scope){
	$scope.name = "maroof";
	console.log("this was called");
}]);

