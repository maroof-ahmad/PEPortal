var app = angular.module('piportal',['ngRoute']).run(function($http,$rootScope,$location){
	$rootScope.isAuthenticated = false;
	$rootScope.currentUser = '';

	$rootScope.signout = function(){

		$http.get('/signout');
		$rootScope.isAuthenticated = false;
		$rootScope.currentUser = '';
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

app.controller('signupController',['$rootScope','$scope','$http','$location', function($rootScope,$scope,$http,$location){
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
				$rootScope.isAuthenticated = true;
				$rootScope.currentUser = data.currentUser.username;
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

app.controller('loginController',['$rootScope','$scope','$http','$location', function($rootScope,$scope,$http,$location){

	$scope.user = {
	username: '',
	password : ''
	}
	$scope.signup = function(){
		console.log("login function was called");
		$http.post('/login',$scope.user)
		.success(function(data){
			if(data.status=="success"){
				$rootScope.isAuthenticated = true;
				$rootScope.currentUser = data.currentUser.username;
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

app.controller('postsController',['$rootScope','$scope','$http','$location',function($rootScope,$scope,$http,$location){
	if(!$rootScope.isAuthenticated){
		$location.path('/');
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

