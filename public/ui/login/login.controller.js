﻿angular
	.module('app')
	.controller('Login.IndexController', ['AuthenticationService', 'PageService', 'jwtHelper', '$location', '$state', '$timeout', function(AuthenticationService, PageService, jwtHelper, $location, $state, $timeout) {
        var vm = this;

        vm.login = login;

        initController();

        function initController() {
            // reset login status
            AuthenticationService.Logout();
        };
		
		// Route to home page only after successfull login. 
		function routetohome(){
			$location.path('/');
		}
		
        function login() {
            vm.loading = true;
            AuthenticationService.Login(vm.username, vm.password, function (result) {
				if(result.message){
					vm.message = result.message;
					console.log(vm.message);
				} else if(result.token){
					//console.log('TOKEN')
					//console.log(result)
					
					// Permissions Checker	
					var tokenPayload = jwtHelper.decodeToken(result.token);
					window.permissions = tokenPayload.permissions;
					
					$timeout(routetohome,1000); 
					//$location.path('/');
					
				} else {
					vm.error = 'Automatic certificate authentication failed, please login with LDAP credentials';
					vm.loading = false;
				}
            });
        };
		
		

		// Attempt to auto-authenticate
		vm.loading = true;
		AuthenticationService.Login('', '', function (result) {
			
			if(result.message){
				vm.message = result.message;
				console.log(vm.message);
			} else if(result.token){

			
				// Permissions Checker		
				var tokenPayload = jwtHelper.decodeToken(result.token);
				window.permissions = tokenPayload.permissions;
				
				$timeout(routetohome,1000); 
				//$location.path('/');

			} else {
				vm.error = 'Automatic certificate authentication failed, please login with LDAP credentials';
				vm.loading = false;
			}
		})
		
	}]);