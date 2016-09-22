angular.module("TurnosApp").controller("ClaseIndexCtrl",['$scope', '$location', 'ResourceClase', '$filter','NgTableParams', '$timeout', function($scope, $location, ResourceClase, $filter, NgTableParams, $timeout) {
	$scope.GoToEdit = function(id) {$location.path("/clase/"+id+"/edit/");};
	$scope.GoToNew = function() {$location.path("/clase/new");};
	$scope.GoToBulk = function() {$location.path("/clase/bulk");};
	// ngTable
	function dateFormat(date) {date = date.split('-'); date = date[2]+'/'+date[1]; return date;}
	var Api = ResourceClase;
	$scope.columns_clase = columns_clase;
	$scope.cant_visible_cols = $.grep(columns_clase, function(e){ return e.visible == true; }).length+1;
    $scope.tableParams = new NgTableParams({
		page: claseDefaultPage,         	// initial first page
		count: claseDefaultCount,         	// initial count per page
		filter: claseDefaultFilter, 		// initial filter
		sorting: claseDefaultSorting, 		// initial sorting
		group: claseDefaultGrouping
	}, {
		total: 0,           // length of data
		groupBy: claseDefaultGroupingBy,
		groupOptions: {isExpanded: false},
		getData: function(params) {
			// ajax request to api
			startLoading();
			return Api.index().$promise.then(function(data) {
				angular.forEach(data, function(value, key) {
					data[key]["instructor_nombre_completo"] = value.instructor.nombre_completo;
					data[key]["cant_users"] = value.users.length+" / "+value.max_users;
					data[key]["fecha_fixed"] = dateFormat(value.fecha) ;
					data[key]["dia"] = dayNames[(new Date(value.fecha+'T12:00:00Z')).getDay()];
				});
				params.total(data.inlineCount);
				$scope.clases = data;
				stopLoading();
				return data;
			});
		}
    });
	// Reload button
	$scope.reloadTable = function(id) {
		$scope.tableParams.reload();
	};
	$scope.toDestroy = "";
	// Destroy
	$scope.toDestroy = function(clase_id) {
		$scope.IdToDestroy = clase_id;
	};
	$scope.destroyClase = function() {
		$scope.got_to_url_success("/clase/index");
		$('.confirmation-modal').on('hidden.bs.modal', function (e) {
			$.each($scope.clases, function(index) {
				if($scope.clases[index]!=undefined && $scope.clases[index].id == $scope.IdToDestroy) { //Remove from array
					ResourceClase.destroy($scope.deleteVariablesClaseToSend($scope.clases[index],true,true), $scope.callbackSuccess, $scope.callbackFailure);
					$scope.tableParams.reload();
				}    
			});
		})
	};
}]);















