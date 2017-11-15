app.controller('headerCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', '$mdDialog', '$mdSidenav', function($scope, $http, $window, $document, FlickityService, $timeout, $location, $mdDialog, $mdSidenav){
    var self = this;

      $scope.hidden = false;
      $scope.isOpen = false;
      $scope.hover = false;

      // On opening, add a delayed property which shows tooltips after the speed dial has opened
      // so that they have the proper position; if closing, immediately hide the tooltips
      $scope.init = function () {

      };

      $scope.$watch('isOpen', function(isOpen) {
        if (isOpen) {
          $timeout(function() {
            $scope.tooltipVisible = $scope.isOpen;
          }, 600);
        } else {
          $scope.tooltipVisible = $scope.isOpen;
        }
      });

      $scope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      };

      $scope.items = [
        { name: "Twitter", icon: "img/icons/twitter.svg", direction: "bottom" },
        { name: "Facebook", icon: "img/icons/facebook.svg", direction: "top" },
        { name: "Google Hangout", icon: "img/icons/hangout.svg", direction: "bottom" }
      ];

      $scope.resetMixpanel = function (user) {
        mixpanel.track("Sign Out", {
          "Username": user.username,          
        });
        mixpanel.reset()
      };

      $scope.showAdvanced = function(ev, user_name) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'dialog1.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      };

      function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      }
}]);