angular
	.module('app')
	.controller('getPhonePlan.IndexController', ['LDAPService','sitePhonePlanService', 'cucmService', '$location', '$state', '$stateParams', function(LDAPService, sitePhonePlanService, cucmService, $location, $state, $stateParams) {
		
		var vm = this;
		
		vm.refresh = function (){
			$state.reload();
		};
		
		
		vm.isArray = angular.isArray;
		
		vm.showaddrow = false;
		
		vm.phoneaddtoggle = function(){
			if(vm.showaddrow == true){
				vm.showaddrow = false;
			}else{
				if(vm.showaddrow == false){
				vm.showaddrow = true;
				}
			}
		}
		
		

		vm.messages = 'Loading sites...';
		
		var id = $stateParams.id;
		
		vm.deploybutton = false;
		
		vm.getphoneplan = sitePhonePlanService.getphoneplan(id)
			.then(function(res){
				// Check if Token has expired. If so then direct them to login screen. 
				if(res.message == "Token has expired"){
					vm.tokenexpired = true;
					//alert("Token has expired, Please relogin");
					//alert(res.message);
					$state.go('logout');
				}

				vm.site = res.data.result;
				console.log(vm.site);
				return vm.site
				
				
			}, function(err){
				//Error
			});
		
		vm.getphoneplanphones = sitePhonePlanService.getphoneplanphones(id)
			.then(function(res){
				// Check if Token has expired. If so then direct them to login screen. 
				if(res.message == "Token has expired"){
					vm.tokenexpired = true;
					//alert("Token has expired, Please relogin");
					//alert(res.message);
					$state.go('logout');
				}
				vm.phones = res.data.result;
				
				return vm.phones
				
				
			}, function(err){
				//Error
			});
			
			
		vm.getusername = function(username){
			//console.log(username);
			var user = {};
			
			LDAPService.getusername(username)
				.then(function(res){
					//console.log(res);
					user.username = username;
					
					if(res.status == "500"){
						//console.log(username + " Username not found")
						user.result = '';
						//console.log(user);
					}else{
						user.result = res.data.result;
						//console.log(user);
						
					}
					
					//console.log(user);
					

				}, function(err){
					// Error
				});
		
			return user;
		}

		
		vm.getusernames = function(phones){
			vm.users = [];
			angular.forEach(phones, function(phone) {
				var userlookup = vm.getusername(phone.username);
				//console.log(userlookup);
				userlookup.id = phone.id;
				console.log(userlookup.result);
				if (userlookup.result == ""){
					console.log("Setting user to none")
					userlookup.result.user = "User does not exist";
				}
				vm.users.push(userlookup);
			});
			
			console.log(vm.users);
		}
		
			
			
	
		

		// Create Phone 
		vm.createphone = function(phone) {
			phone.phoneplan = id;
			phone.site = vm.site.site;
			
			console.log(phone);
			
			sitePhonePlanService.createphone(phone).then(function(data) {
			  //alert('phone was added successfully');
			  return $state.reload();
			}, function(error) {
				alert('An error occurred while updating the event')
			});
			//$state.reload();
		}
		
		// Edit state for phone block Edit button.
		vm.edit = {};
		
		// Update 
		vm.update = function(phone) {
			
			/* No longer using this. 
			// Put the variable that we need into an array to send. We only want to send name, carrier and comment for updates. 
			var phone_update = {};
			phone_update.name = phone.name;
			phone_update.status = phone.status;
			phone_update.system_id = phone.system_id;
			*/
			
			sitePhonePlanService.updatephone(phone.id, phone).then(function(data) {
			  //return $state.reload();
			}, function(error) {
				alert('An error occurred while updating the event')
			});
			//$state.reload();
		}
		
		
		// Delete 
		vm.delete = function(phone) {
			sitePhonePlanService.deletephone(phone.id).then(function(data) {

			
				// jQuery Hack to fix body from the Model. 
					$(".modal-backdrop").hide();
					$('body').removeClass("modal-open");
					$('body').removeClass("modal-open");
					$('body').removeAttr( 'style' );
				// End of Hack */
			
				return $state.reload();
          }, function(error) {
				alert('An error occurred');
          });

		}
		
		vm.selecttouched = function(){
			vm.deleteall = true;
		}
		
		vm.deleteselected = function(phones){
			angular.forEach(phones, function(phone) {
				if(phone.select == true){
					console.log(phone);
					vm.delete(phone);
				}
				
			});
		}
		
		
		vm.checkAll = function() {
			angular.forEach(vm.phones, function(phone) {
			  phone.select = vm.selectAll;
			  //console.log(phone);
			  vm.selecttouched();
			});
		  };
		
		
		
	}]);