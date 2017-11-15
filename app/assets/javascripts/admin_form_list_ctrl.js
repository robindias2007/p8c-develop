app.controller('AdminFormListCtrl', ['$scope', '$http', '$window', '$document', '$timeout', '$location', function($scope, $http, $window, $document, $timeout, $location){
  
  get_forms = function () {
    $http({
      method: 'GET',
      url: 'get_forms.json',
      params: {}
      }).then(function successCallback(response) {
        $scope.forms = response.data;
        $scope.forms.forEach(function(element) {
          if (element.admin_date_to_update != null) {
            element.admin_date_to_update = new Date(element.admin_date_to_update);
          }
        })        
        $scope.loading_forms = false;
      }, function errorCallback(response) {
    });
  }

  $scope.init = function () {
    $scope.loading_forms = true;
    $scope.myDate = new Date();    
    get_forms();
  };

  $scope.change = function (f, index) {    
    if (f.selected_user == "None" || f.selected_user == "") {
    } else {
      f.username = f.selected_user;
    }
    if (f.admin_date_to_update != null){
      f.date = f.admin_date_to_update.getTime();
      f.admins_date = f.admin_date_to_update;
    } else {
      f.date = null;
    };
    $http({
      method: 'POST',
      url: '/update_form_admin.json',
      data: {form: f}
      }).then(function successCallback(response) {        
      }, function errorCallback(response) {
    });
  };


  $scope.remove = function (f, index) {
    $scope.forms.splice(index, 1);
    $http({
      method: 'DELETE',
      url: 'delete_form.json',
      params: {form_id: f.id}
      }).then(function successCallback(response) {
      }, function errorCallback(response) {
    });
  };
  
}]);