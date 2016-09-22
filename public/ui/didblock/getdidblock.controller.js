angular
	.module('app')
	.controller('getDidblock.IndexController', ['telephonyService', '$location', '$state', '$stateParams', function(telephonyService, $location, $state, $stateParams) {
		
		var vm = this;
		
		vm.refresh = function (){
			$state.reload();
		};

		vm.messages = 'Loading Didblocks...';
		
		var id = $stateParams.id;
		
		vm.getdidblock = telephonyService.getDidblock(id)
			.then(function(res){
				return vm.didblock = res.data.didblock;
				
				
			}, function(err){
				//Error
			});
		
		vm.getdidblockdids = telephonyService.getDidblockDids(id)
			.then(function(res){
				//success
				console.log("HERE ");console.log(res)
				return vm.dids = res.data.dids;
				
				
			}, function(err){
				//Error
			});
		
		
		// Drop down values to use in Add form.
		vm.states = [{
				id: 1,
				name: 'available'
			}, {
				id: 2,
				name: 'reserved'
			}];
		
		vm.types = [{
				id: 1,
				name: 'public'
			}, {
				id: 2,
				name: 'private'
			}];
		
		
		// Edit state for DID block Edit button.
		vm.edit = {};
		
		// Update DID Block service called by the save button.
		vm.update = function(did) {
			// Put the variable that we need into an array to send. We only want to send name, carrier and comment for updates. 
			var did_update = {};
			did_update.name = did.name;
			did_update.status = did.status;
			did_update.system_id = did.system_id;
			
			// Send Block ID and the updated variables to the update service. 
			telephonyService.updateDid(did.id, did_update).then(function(data) {
			  return $state.reload();
			}, function(error) {
				alert('An error occurred while updating the event')
			});
			$state.reload();
		}

	}]);
