var app = angular.module('app', ['bc.Flickity', 'infinite-scroll', 'ui.sortable', 'ngMaterial', 'ngTagsInput']);

app.config(function($mdThemingProvider) {

  // Extend the red theme with a different color and make the contrast color black instead of white.
  // For example: raised button text will be black instead of white.
  var whiteThemeMap = $mdThemingProvider.extendPalette('grey', {
    '100': '#fafafa',
    '50': '#ffffff',
    '600': '#c7c7c7'
  });

  // Register the new color palette map with the name <code>neonRed</code>
  $mdThemingProvider.definePalette('whiteTheme', whiteThemeMap);


  // Extend the red theme with a different color and make the contrast color black instead of white.
  // For example: raised button text will be black instead of white.
  var deepRedMap = $mdThemingProvider.extendPalette('red', {
    'A200': '#9c1717',
    'A100': '#d44d3f',
    'A400': '#670000'
  });

  // Register the new color palette map with the name <code>neonRed</code>
  $mdThemingProvider.definePalette('deepRed', deepRedMap);


  $mdThemingProvider.theme('default')
    .primaryPalette('whiteTheme', {
      'default': '50', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
     // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('deepRed');
});

app.filter('cut', function () {
  return function (value, wordwise, max, tail) {
    if (!value) return '';

    max = parseInt(max, 10);
    if (!max) return value;
    if (value.length <= max) return value;

    value = value.substr(0, max);
    if (wordwise) {
        var lastspace = value.lastIndexOf(' ');
        if (lastspace !== -1) {
          //Also remove . and , so its gives a cleaner result.
          if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
            lastspace = lastspace - 1;
          }
          value = value.substr(0, lastspace);
        }
    }

    return value + (tail || ' …');
  };
});

app.filter('capitalize', function() {  
  return function(input){
    if(input.indexOf(' ') !== -1){
      var inputPieces,
          i;

      input = input.toLowerCase();
      inputPieces = input.split(' ');

      for(i = 0; i < inputPieces.length; i++){
        inputPieces[i] = capitalizeString(inputPieces[i]);
      }

      return inputPieces.toString().replace(/,/g, ' ');
    }
    else {
      input = input.toLowerCase();
      return capitalizeString(input);
    }

    function capitalizeString(inputString){
      return inputString.substring(0,1).toUpperCase() + inputString.substring(1);
    }
  };
});

app.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
}]);

app.controller('bodyCtrl', ['$scope', '$http', '$window', '$document', function($scope, $http, $window, $document){

  $scope.init = function () {
    if ($window.innerWidth < 600 ) {
      $scope.isMobile = true;
    } else {
      $scope.isMobile = false;
    }
  };

}]);

app.controller('RegistrationsCtrl', ['$scope', '$http', '$window', '$document', '$timeout', '$location', function($scope, $http, $window, $document, $timeout, $location){
  
  $scope.init = function () {
    $scope.title = "Hello world"
  };
}]);