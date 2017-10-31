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
app.controller('newFormCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){

  $scope.init = function () {
    $scope.formFlickityOptions = {
      cellSelector: '.form-article-cell',
      prevNextButtons: true,
      pageDots: true,
      imagesLoaded: true,
      groupCells: 2
    };
    $scope.formTitle = "";
    $scope.formDsc = "";
    $scope.formSubheader = "";
    $scope.newFormLinks = [{ show: {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false} , url: "", title: null, dsc: null, image: null, note: null, content: null, tag: null, host: null, error: ""},
                          { show: {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false}, url: "", title: null, dsc: null, image: null, note: null, content: null, tag: null, host: null, error: ""},
                          { show: {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false}, url: "", title: null, dsc: null, image: null, note: null, content: null, tag: null, host: null, error: ""},
                          { show: {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false}, url: "", title: null, dsc: null, image: null, note: null, content: null, tag: null, host: null, error: ""},
                          { show: {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false}, url: "", title: null, dsc: null, image: null, note: null, content: null, tag: null, host: null, error: ""}]
  };

  $scope.AddLinkClicked = function (text) {
    switch (text) {
      case '0':
        $scope.newFormLinks[0].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        break;
      case '1':
        $scope.newFormLinks[1].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        break;
      case '2':
        $scope.newFormLinks[2].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        break;
      case '3':
        $scope.newFormLinks[3].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        break;
      case '4':
        $scope.newFormLinks[4].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        break;
      default:
    }
  }

  $scope.AddNoteClicked = function (text) {
    switch (text) {
      case '0':
        $scope.newFormLinks[0].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: true, editLinkBox: false};
        break;
      case '1':
        $scope.newFormLinks[1].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: true, editLinkBox: false};
        break;
      case '2':
        $scope.newFormLinks[2].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: true, editLinkBox: false};
        break;
      case '3':
        $scope.newFormLinks[3].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: true, editLinkBox: false};
        break;
      case '4':
        $scope.newFormLinks[4].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: true, editLinkBox: false};
        break;
      default:
    }
  }

  $scope.saveNote = function (text) {
    switch (text) {
      case '0':
        $scope.newFormLinks[0].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        break;
      case '1':
        $scope.newFormLinks[1].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        break;
      case '2':
        $scope.newFormLinks[2].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        break;
      case '3':
        $scope.newFormLinks[3].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        break;
      case '4':
        $scope.newFormLinks[4].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        break;
      default:
    } 
  }

  $scope.backToAddLinkClick = function (text) {
    switch (text) {
      case '0':        
        $scope.newFormLinks[0].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[0].url = "";
        $scope.newFormLinks[0].title = null;
        break;
      case '1':        
        $scope.newFormLinks[1].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[1].url = "";
        $scope.newFormLinks[1].title = null;
        break;
      case '2':        
        $scope.newFormLinks[2].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};        
        $scope.newFormLinks[2].url = "";
        $scope.newFormLinks[2].title = null;
        break;
      case '3':                
        $scope.newFormLinks[3].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[3].url = "";
        $scope.newFormLinks[3].title = null;
        break;
      case '4':        
        $scope.newFormLinks[4].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[4].url = "";
        $scope.newFormLinks[4].title = null;
        break;
      default:
    }
  }

  $scope.backToViewData = function (text) {
    switch (text) {
      case '0':        
        $scope.newFormLinks[0].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[0].note = "";
        break;
      case '1':        
        $scope.newFormLinks[1].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[1].note = "";
        break;
      case '2':        
        $scope.newFormLinks[2].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};        
        $scope.newFormLinks[2].note = "";
        break;
      case '3':                
        $scope.newFormLinks[3].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[3].note = "";
        break;
      case '4':        
        $scope.newFormLinks[4].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[4].note = "";
        break;
      default:
    } 
  }

  $scope.addNewLink = function (text) {
    switch (text) {
      case '0':        
        $scope.newFormLinks[0].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: true};        
        break;
      case '1':        
        $scope.newFormLinks[1].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: true};        
        break;
      case '2':        
        $scope.newFormLinks[2].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: true};        
        break;
      case '3':                
        $scope.newFormLinks[3].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: true};
        break;
      case '4':        
        $scope.newFormLinks[4].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: true};
        break;
      default:
    } 
  }

  assignData = function(data, text, url) {
    switch (text) {
      case '0':
        if (data == null){
          $scope.newFormLinks[0].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false}
          $scope.newFormLinks[0].error = "Invalid url!"
        } else {          
          $scope.newFormLinks[0].url = url;
          $scope.newFormLinks[0].title = data.title;
          $scope.newFormLinks[0].image = data.image;
          $scope.newFormLinks[0].dsc = data.description;
          $scope.newFormLinks[0].content = data.content;
          $scope.newFormLinks[0].tag = data.tags;
          $scope.newFormLinks[0].host = data.host;
          $scope.newFormLinks[0].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false}
        }
        break;
      case '1':
        if (data == null){
          $scope.newFormLinks[1].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false}
          $scope.newFormLinks[1].error = "Invalid url!"
        } else {          
          $scope.newFormLinks[1].url = url;
          $scope.newFormLinks[1].title = data.title;
          $scope.newFormLinks[1].image = data.image;
          $scope.newFormLinks[1].dsc = data.description;
          $scope.newFormLinks[1].content = data.content;
          $scope.newFormLinks[1].tag = data.tags;
          $scope.newFormLinks[1].host = data.host;
          $scope.newFormLinks[1].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false}
        }
        break;
      case '2':
        if (data == null){
          $scope.newFormLinks[2].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false}
          $scope.newFormLinks[2].error = "Invalid url!"
        } else {          
          $scope.newFormLinks[2].url = url;
          $scope.newFormLinks[2].title = data.title;
          $scope.newFormLinks[2].image = data.image;
          $scope.newFormLinks[2].dsc = data.description;
          $scope.newFormLinks[2].content = data.content;
          $scope.newFormLinks[2].tag = data.tags;
          $scope.newFormLinks[2].host = data.host;          
          $scope.newFormLinks[2].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false}
        }
        break;
      case '3':
        if (data == null){
          $scope.newFormLinks[3].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false}
          $scope.newFormLinks[3].error = "Invalid url!"
        } else {          
          $scope.newFormLinks[3].url = url;
          $scope.newFormLinks[3].title = data.title;
          $scope.newFormLinks[3].image = data.image;
          $scope.newFormLinks[3].dsc = data.description;
          $scope.newFormLinks[3].content = data.content;
          $scope.newFormLinks[3].tag = data.tags;
          $scope.newFormLinks[3].host = data.host;
          $scope.newFormLinks[3].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false}
        }
        break;
      case '4':
        if (data == null){
          $scope.newFormLinks[4].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false}
          $scope.newFormLinks[4].error = "Invalid url!"
        } else {          
          $scope.newFormLinks[4].url = url;
          $scope.newFormLinks[4].title = data.title;
          $scope.newFormLinks[4].image = data.image;
          $scope.newFormLinks[4].dsc = data.description;
          $scope.newFormLinks[4].content = data.content;
          $scope.newFormLinks[4].tag = data.tags;
          $scope.newFormLinks[4].host = data.host;
          $scope.newFormLinks[4].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false}
        }
        break;
      default:
    }
  };

  getMetaInspectorData = function (url, text) {
    $http({
      method: 'GET',
      url: 'get_meta_data.json?url='+ url
    }).then(function successCallback(response) {
      data = response.data;
      assignData(data, text, url);
      },function errorCallback(response) {
    }); 
  };

  $scope.uploadLink = function (text) {
    switch (text) {
      case '0':
        $scope.newFormLinks[0].error = "";
        if ($scope.newFormLinks[0].url != ""){
          $scope.newFormLinks[0].show = {addLink: false, linkBox: false, loading: true, viewData: false, noteBox: false, editLinkBox: false};
          getMetaInspectorData($scope.newFormLinks[0].url, '0');
        }
        break;
      case '1':
        $scope.newFormLinks[1].error = "";
        if ($scope.newFormLinks[1].url != ""){
          $scope.newFormLinks[1].show = {addLink: false, linkBox: false, loading: true, viewData: false, noteBox: false, editLinkBox: false};
          getMetaInspectorData($scope.newFormLinks[1].url, '1');
        }
        break;
      case '2':
        $scope.newFormLinks[2].error = "";
        if ($scope.newFormLinks[2].url != ""){
          $scope.newFormLinks[2].show = {addLink: false, linkBox: false, loading: true, viewData: false, noteBox: false, editLinkBox: false};
          getMetaInspectorData($scope.newFormLinks[2].url, '2');
        }
        break;
      case '3':
        $scope.newFormLinks[3].error = "";
        if ($scope.newFormLinks[3].url != ""){
          $scope.newFormLinks[3].show = {addLink: false, linkBox: false, loading: true, viewData: false, noteBox: false, editLinkBox: false};
          getMetaInspectorData($scope.newFormLinks[3].url, '3');
        }
        break;
      case '4':
        $scope.newFormLinks[4].error = "";
        if ($scope.newFormLinks[4].url != ""){
          $scope.newFormLinks[4].show = {addLink: false, linkBox: false, loading: true, viewData: false, noteBox: false, editLinkBox: false};
          getMetaInspectorData($scope.newFormLinks[4].url, '4');
        }
        break;
      default:
    }
  };

  InitiateMixpanelDraftEvent = function (data, username) {
    mixpanel.track("Curate Draft", {
      "Author": username,
      "Board Id": data.secure_id,
      "Date": data.created_at,
      "Prior Status": "Draft"     
    });

    host = $window.location.host;
    landingUrl = "http://" + host +"/"+ username +"/drafts";    
    $window.location.href = landingUrl;
  }

  InitiateMixpanelPublishEvent = function (data, username) {
    mixpanel.track("Curate Completed", {
      "Author": username,
      "Board Id": data.secure_id,
      "Date": data.created_at,
      "Prior Status": "Draft"
    });

    host = $window.location.host;
    landingUrl = "http://" + host +"/"+ username +"/published";    
    $window.location.href = landingUrl;    
  }

  $scope.saveForm = function (user_id, text, username) {
    $http({
      method: 'POST',
      url: 'create_form.json',
      data: {user_id: user_id, text: text, forms: $scope.newFormLinks, title: $scope.formTitle, dsc: $scope.formDsc, sub_header: $scope.formSubheader}
    }).then(function successCallback(response) {
      data = response.data;      
      if (text == "draft") {
        InitiateMixpanelDraftEvent(data, username);
      } else {
        InitiateMixpanelPublishEvent(data, username);
      };      
    },function errorCallback(response) {
    });
  };

  $scope.checkFormValidation = function () {
    if ($scope.formTitle == '') {
      return true;
    };
    
    if (($scope.newFormLinks[0].title == null) && ($scope.newFormLinks[1].title == null) && ($scope.newFormLinks[2].title == null) && ($scope.newFormLinks[3].title == null) && ($scope.newFormLinks[4].title == null)) {
      return true;
    };

    return false;
  }
}]);

app.controller('editFormCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){

  getFormData = function (secure_id) {
    $http({
      method: 'GET',
      url: 'get_form_data.json'
    }).then(function successCallback(response) {
      $scope.formTitle = response.data.title;
      $scope.formDsc = response.data.dsc;
      $scope.formSubheader = response.data.sub_header; 
      $scope.newFormLinks = JSON.parse(response.data.data);      
      },function errorCallback(response) {
    }); 
  };

  $scope.init = function (secure_id) {
    $scope.formTitle = '';
    $scope.formDsc = '';
    $scope.formSubheader = '';
    $scope.secure_id = secure_id;
    getFormData(secure_id);
  };

  $scope.AddLinkClicked = function (text) {
    switch (text) {
      case '0':
        $scope.newFormLinks[0].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        break;
      case '1':
        $scope.newFormLinks[1].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        break;
      case '2':
        $scope.newFormLinks[2].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        break;
      case '3':
        $scope.newFormLinks[3].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        break;
      case '4':
        $scope.newFormLinks[4].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        break;
      default:
    }
  }

  $scope.AddNoteClicked = function (text) {
    switch (text) {
      case '0':
        $scope.newFormLinks[0].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: true, editLinkBox: false};
        break;
      case '1':
        $scope.newFormLinks[1].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: true, editLinkBox: false};
        break;
      case '2':
        $scope.newFormLinks[2].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: true, editLinkBox: false};
        break;
      case '3':
        $scope.newFormLinks[3].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: true, editLinkBox: false};
        break;
      case '4':
        $scope.newFormLinks[4].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: true, editLinkBox: false};
        break;
      default:
    }
  }

  $scope.saveNote = function (text) {
    switch (text) {
      case '0':
        $scope.newFormLinks[0].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        break;
      case '1':
        $scope.newFormLinks[1].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        break;
      case '2':
        $scope.newFormLinks[2].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        break;
      case '3':
        $scope.newFormLinks[3].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        break;
      case '4':
        $scope.newFormLinks[4].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        break;
      default:
    } 
  }

  $scope.backToAddLinkClick = function (text) {
    switch (text) {
      case '0':        
        $scope.newFormLinks[0].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[0].url = "";
        $scope.newFormLinks[0].title = null;
        break;
      case '1':        
        $scope.newFormLinks[1].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[1].url = "";
        $scope.newFormLinks[1].title = null;
        break;
      case '2':        
        $scope.newFormLinks[2].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};        
        $scope.newFormLinks[2].url = "";
        $scope.newFormLinks[2].title = null;
        break;
      case '3':                
        $scope.newFormLinks[3].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[3].url = "";
        $scope.newFormLinks[3].title = null;
        break;
      case '4':        
        $scope.newFormLinks[4].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[4].url = "";
        $scope.newFormLinks[4].title = null;
        break;
      default:
    }
  }

  $scope.backToViewData = function (text) {
    switch (text) {
      case '0':        
        $scope.newFormLinks[0].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[0].note = "";
        break;
      case '1':        
        $scope.newFormLinks[1].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[1].note = "";
        break;
      case '2':        
        $scope.newFormLinks[2].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};        
        $scope.newFormLinks[2].note = "";
        break;
      case '3':                
        $scope.newFormLinks[3].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[3].note = "";
        break;
      case '4':        
        $scope.newFormLinks[4].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[4].note = "";
        break;
      default:
    } 
  }

  $scope.addNewLink = function (text) {
    switch (text) {
      case '0':        
        $scope.newFormLinks[0].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: true};        
        break;
      case '1':        
        $scope.newFormLinks[1].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: true};        
        break;
      case '2':        
        $scope.newFormLinks[2].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: true};        
        break;
      case '3':                
        $scope.newFormLinks[3].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: true};
        break;
      case '4':        
        $scope.newFormLinks[4].show = {addLink: false, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: true};
        break;
      default:
    } 
  }

  assignData = function(data, text, url) {
    switch (text) {
      case '0':
        if (data == null){
          $scope.newFormLinks[0].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false}
          $scope.newFormLinks[0].error = "Invalid url!"
        } else {          
          $scope.newFormLinks[0].url = url;
          $scope.newFormLinks[0].title = data.title;
          $scope.newFormLinks[0].image = data.image;
          $scope.newFormLinks[0].dsc = data.description;
          $scope.newFormLinks[0].content = data.content;
          $scope.newFormLinks[0].tag = data.tags;
          $scope.newFormLinks[0].host = data.host;
          $scope.newFormLinks[0].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false}
        }
        break;
      case '1':
        if (data == null){
          $scope.newFormLinks[1].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false}
          $scope.newFormLinks[1].error = "Invalid url!"
        } else {          
          $scope.newFormLinks[1].url = url;
          $scope.newFormLinks[1].title = data.title;
          $scope.newFormLinks[1].image = data.image;
          $scope.newFormLinks[1].dsc = data.description;
          $scope.newFormLinks[1].content = data.content;
          $scope.newFormLinks[1].tag = data.tags;
          $scope.newFormLinks[1].host = data.host;
          $scope.newFormLinks[1].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false}
        }
        break;
      case '2':
        if (data == null){
          $scope.newFormLinks[2].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false}
          $scope.newFormLinks[2].error = "Invalid url!"
        } else {          
          $scope.newFormLinks[2].url = url;
          $scope.newFormLinks[2].title = data.title;
          $scope.newFormLinks[2].image = data.image;
          $scope.newFormLinks[2].dsc = data.description;
          $scope.newFormLinks[2].content = data.content;
          $scope.newFormLinks[2].tag = data.tags;
          $scope.newFormLinks[2].host = data.host;          
          $scope.newFormLinks[2].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false}
        }
        break;
      case '3':
        if (data == null){
          $scope.newFormLinks[3].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false}
          $scope.newFormLinks[3].error = "Invalid url!"
        } else {          
          $scope.newFormLinks[3].url = url;
          $scope.newFormLinks[3].title = data.title;
          $scope.newFormLinks[3].image = data.image;
          $scope.newFormLinks[3].dsc = data.description;
          $scope.newFormLinks[3].content = data.content;
          $scope.newFormLinks[3].tag = data.tags;
          $scope.newFormLinks[3].host = data.host;
          $scope.newFormLinks[3].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false}
        }
        break;
      case '4':
        if (data == null){
          $scope.newFormLinks[4].show = {addLink: false, linkBox: true, loading: false, viewData: false, noteBox: false, editLinkBox: false}
          $scope.newFormLinks[4].error = "Invalid url!"
        } else {          
          $scope.newFormLinks[4].url = url;
          $scope.newFormLinks[4].title = data.title;
          $scope.newFormLinks[4].image = data.image;
          $scope.newFormLinks[4].dsc = data.description;
          $scope.newFormLinks[4].content = data.content;
          $scope.newFormLinks[4].tag = data.tags;
          $scope.newFormLinks[4].host = data.host;
          $scope.newFormLinks[4].show = {addLink: false, linkBox: false, loading: false, viewData: true, noteBox: false, editLinkBox: false}
        }
        break;
      default:
    }
  };

  getMetaInspectorData = function (url, text) {
    $http({
      method: 'GET',
      url: 'get_meta_data.json?url='+ url
    }).then(function successCallback(response) {
      data = response.data;
      assignData(data, text, url);
      },function errorCallback(response) {
    }); 
  };

  $scope.uploadLink = function (text) {
    switch (text) {
      case '0':
        $scope.newFormLinks[0].error = "";
        if ($scope.newFormLinks[0].url != ""){
          $scope.newFormLinks[0].show = {addLink: false, linkBox: false, loading: true, viewData: false, noteBox: false, editLinkBox: false};
          getMetaInspectorData($scope.newFormLinks[0].url, '0');
        }
        break;
      case '1':
        $scope.newFormLinks[1].error = "";
        if ($scope.newFormLinks[1].url != ""){
          $scope.newFormLinks[1].show = {addLink: false, linkBox: false, loading: true, viewData: false, noteBox: false, editLinkBox: false};
          getMetaInspectorData($scope.newFormLinks[1].url, '1');
        }
        break;
      case '2':
        $scope.newFormLinks[2].error = "";
        if ($scope.newFormLinks[2].url != ""){
          $scope.newFormLinks[2].show = {addLink: false, linkBox: false, loading: true, viewData: false, noteBox: false, editLinkBox: false};
          getMetaInspectorData($scope.newFormLinks[2].url, '2');
        }
        break;
      case '3':
        $scope.newFormLinks[3].error = "";
        if ($scope.newFormLinks[3].url != ""){
          $scope.newFormLinks[3].show = {addLink: false, linkBox: false, loading: true, viewData: false, noteBox: false, editLinkBox: false};
          getMetaInspectorData($scope.newFormLinks[3].url, '3');
        }
        break;
      case '4':
        $scope.newFormLinks[4].error = "";
        if ($scope.newFormLinks[4].url != ""){
          $scope.newFormLinks[4].show = {addLink: false, linkBox: false, loading: true, viewData: false, noteBox: false, editLinkBox: false};
          getMetaInspectorData($scope.newFormLinks[4].url, '4');
        }
        break;
      default:
    }
  };

  InitiateMixpanelDraftEvent = function (data, username) {
    mixpanel.track("Curate Draft", {
      "Author": username,
      "Board Id": data.secure_id,
      "Date": data.created_at,
      "Prior Status": "Draft"     
    });

    host = $window.location.host;
    landingUrl = "http://" + host +"/"+ username +"/drafts";    
    $window.location.href = landingUrl;
  }

  InitiateMixpanelPublishEvent = function (data, username) {
    mixpanel.track("Curate Completed", {
      "Author": username,
      "Board Id": data.secure_id,
      "Date": data.created_at,
      "Prior Status": "Draft"
    });

    host = $window.location.host;
    landingUrl = "http://" + host +"/"+ username +"/published";    
    $window.location.href = landingUrl;    
  }

  $scope.updateForm = function (user_id, text, username) {
    $http({
      method: 'POST',
      url: 'update_form.json',
      data: {secure_id: $scope.secure_id, user_id: user_id, text: text, forms: $scope.newFormLinks, title: $scope.formTitle, dsc: $scope.formDsc, sub_header: $scope.formSubheader}
    }).then(function successCallback(response) {
      data = response.data;
      if (text == "draft") {
        InitiateMixpanelDraftEvent(data, username);
      } else {
        InitiateMixpanelPublishEvent(data, username);
      };        
    },function errorCallback(response) {
    });
  };

  $scope.checkFormValidation = function () {
    if ($scope.formTitle == '') {
      return true;
    };
    
    if (($scope.newFormLinks[0].title == null) && ($scope.newFormLinks[1].title == null) && ($scope.newFormLinks[2].title == null) && ($scope.newFormLinks[3].title == null) && ($scope.newFormLinks[4].title == null)) {
      return true;
    };

    return false;
  }
}]);

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

app.controller('AppCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', '$mdToast', function($scope, $http, $window, $document, FlickityService, $timeout, $location, $mdToast){
  $scope.init = function(boards,key){
    $scope.cat_boards = boards;
    $scope.category_boards = boards;
    $scope.location = $location.$$protocol + "://" + $location.$$host + "/";
    $scope.facebook_key = key;
  }

  $scope.trackBoardClick = function (board, user) {
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": "any",
        "Appreciation Action": "any",
        "Other Action": "Board Title Clicked"

    });
  };

  $scope.boardAuthorClick = function (board, user) {
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": "any",
        "Appreciation Action": "any",
        "Other Action": "Author Name Clicked"

    });
  };

  $scope.trackLinkClicked = function (board, user, link) {
    link_text = "Board Link " + link +" click"
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": link_text,
        "Appreciation Action": "any",
        "Other Action": "any"

    });
    event_name = "Link " + link + " Clicked"
    mixpanel.track(event_name, {
        "User": user.username,        
        "Board id": board.secure_id,
    });

    $http({
      method: 'POST',
      url: '/users/'+ user.id +'/link_clicked.json',
      data: {form_id: board.id, link: link}
      }).then(function successCallback(response) {
      }, function errorCallback(response) {
    });

  }

  trackLikedUnlikedClicked = function (board, action, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": action,
      "Other Action": "any"
    });
  };

  trackSaveUnsaveClicked = function (board, action, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": action,
      "Other Action": "any"
    });
  };

  $scope.trackFacebookShareClicked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Facebook",
      "Other Action": "any"
    });
  };

  $scope.trackTwitterShareClicked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Twitter",
      "Other Action": "any"
    });
  };

  trackCopyLinkCliked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Copy Link",
      "Other Action": "any"
    });
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  showSimpleToast = function() {
    $mdToast.show($mdToast.simple().textContent('Link Copied!').theme("success-toast").position('top right'));
  };

  $scope.copyToClipboard = function (link, board, user) {
    var copyElement = document.createElement("textarea");
    copyElement.style.position = 'fixed';
    copyElement.style.opacity = '0';
    copyElement.textContent = link;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(copyElement);
    copyElement.select();
    document.execCommand('copy');
    body.removeChild(copyElement);
    showSimpleToast();
    trackCopyLinkCliked(board, user);  
  }

  $scope.update_bookmark = function(board, user){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
    if ($scope.board.bookmark == true) {
      trackSaveUnsaveClicked(board, 'save', user);
    } else {
      trackSaveUnsaveClicked(board, 'unsave', user);
    };
  };

  $scope.update_like = function(board, action, user){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++
      trackLikedUnlikedClicked(board, action, user);
    } else {
      $scope.board.likes--
      trackLikedUnlikedClicked(board, action, user);
    }
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,    
    imagesLoaded: true,
    groupCells: 2
  };
  
  $scope.alert = '';
}]);

app.controller('HomeAppCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', '$mdToast', function($scope, $http, $window, $document, FlickityService, $timeout, $location, $mdToast){
  $scope.init = function(boards){
    $scope.boards = boards;
    $scope.location = $location.$$absUrl;
  }

  $scope.trackBoardClick = function (board, user) {
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": "any",
        "Appreciation Action": "any",
        "Other Action": "Board Title Clicked"

    });
  };

  $scope.boardAuthorClick = function (board, user) {
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": "any",
        "Appreciation Action": "any",
        "Other Action": "Author Name Clicked"

    });
  };

  $scope.trackLinkClicked = function (board, user, link) {
    link_text = "Board Link " + link +" click"
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": link_text,
        "Appreciation Action": "any",
        "Other Action": "any"

    });
    event_name = "Link " + link + " Clicked"
    mixpanel.track(event_name, {
        "User": user.username,        
        "Board id": board.secure_id,
    });
  }

  trackLikedUnlikedClicked = function (board, action, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": action,
      "Other Action": "any"
    });
  };

  trackSaveUnsaveClicked = function (board, action, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": action,
      "Other Action": "any"
    });
  };

  $scope.trackFacebookShareClicked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Facebook",
      "Other Action": "any"
    });
  };

  $scope.trackTwitterShareClicked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Twitter",
      "Other Action": "any"
    });
  };

  trackCopyLinkCliked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Copy Link",
      "Other Action": "any"
    });
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  showSimpleToast = function() {
    $mdToast.show($mdToast.simple().textContent('Link Copied!').position('top right'));
  };

  $scope.copyToClipboard = function (link, board, user) {
    var copyElement = document.createElement("textarea");
    copyElement.style.position = 'fixed';
    copyElement.style.opacity = '0';
    copyElement.textContent = link;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(copyElement);
    copyElement.select();
    document.execCommand('copy');
    body.removeChild(copyElement);
    showSimpleToast();
    trackCopyLinkCliked(board, user);    
  }

  $scope.update_bookmark = function(board, user){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
    if ($scope.board.bookmark == true) {
      trackSaveUnsaveClicked(board, 'save', user);
    } else {
      trackSaveUnsaveClicked(board, 'unsave', user);
    };
  };

  $scope.update_like = function(board, action, user){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++
      trackLikedUnlikedClicked(board, action, user);
    } else {
      $scope.board.likes--
      trackLikedUnlikedClicked(board, action, user);
    }
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,    
    imagesLoaded: true,
    groupCells: 2
  };
  
  $scope.alert = '';
}]);

app.controller('PubBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', '$mdToast', function($scope, $http, $window, $document, FlickityService, $timeout, $location, $mdToast){
  $scope.init = function(boards, key){
    $scope.pub_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
    $scope.location = $location.$$protocol + "://" + $location.$$host + "/";
    $scope.facebook_key = key;
  }

  $scope.trackBoardClick = function (board, user) {
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": "any",
        "Appreciation Action": "any",
        "Other Action": "Board Title Clicked"

    });
  };

  $scope.boardAuthorClick = function (board, user) {
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": "any",
        "Appreciation Action": "any",
        "Other Action": "Author Name Clicked"

    });
  };

  $scope.trackLinkClicked = function (board, user, link) {
    link_text = "Board Link " + link +" click"
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": link_text,
        "Appreciation Action": "any",
        "Other Action": "any"

    });
    event_name = "Link " + link + " Clicked"
    mixpanel.track(event_name, {
        "User": user.username,        
        "Board id": board.secure_id,
    });
  }

  trackLikedUnlikedClicked = function (board, action, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": action,
      "Other Action": "any"
    });
  };

  trackSaveUnsaveClicked = function (board, action, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": action,
      "Other Action": "any"
    });
  };

  $scope.trackFacebookShareClicked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Facebook",
      "Other Action": "any"
    });
  };

  $scope.trackTwitterShareClicked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Twitter",
      "Other Action": "any"
    });
  };

  trackCopyLinkCliked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Copy Link",
      "Other Action": "any"
    });
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  showSimpleToast = function() {
    $mdToast.show($mdToast.simple().textContent('Link Copied!').position('top right'));
  };

  $scope.copyToClipboard = function (link, board, user) {
    var copyElement = document.createElement("textarea");
    copyElement.style.position = 'fixed';
    copyElement.style.opacity = '0';
    copyElement.textContent = link;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(copyElement);
    copyElement.select();
    document.execCommand('copy');
    body.removeChild(copyElement);
    showSimpleToast();
    trackCopyLinkCliked(board, user); 
  }

  $scope.update_bookmark = function(board, user){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
    if ($scope.board.bookmark == true) {
      trackSaveUnsaveClicked(board, 'save', user);
    } else {
      trackSaveUnsaveClicked(board, 'unsave', user);
    };
  };

  $scope.update_like = function(board, action, user){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++
      trackLikedUnlikedClicked(board, action, user); 
    } else {
      $scope.board.likes--
      trackLikedUnlikedClicked(board, action, user);
    }
  };

  $scope.nextPage = function () {
    if ($scope.busy) return;
    $scope.busy = true;
    if ($scope.stop_loading == false) {
      $http({
      method: 'GET',
      url: 'published.json?page='+ $scope.next_page
      }).then(function successCallback(response) {
        boards = JSON.parse(response.data.boards);
        for(var i = 0; i <= (boards.length - 1) ; i++) {
          if ( !( boards[i] in $scope.pub_boards ) ) {
            $scope.pub_boards.push(boards[i-0]);
          }          
        }
        next_page = response.data.next_page;
        if (next_page == null) {
          $scope.stop_loading = true;
        } else {
          $scope.next_page = $scope.next_page + 1;
          $scope.busy = false;
        };

      }, function errorCallback(response) {
      });
    };    
  };

  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,    
    imagesLoaded: true,
    groupCells: 2
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.alert = '';
}]);

app.controller('SavedBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', '$mdToast', function($scope, $http, $window, $document, FlickityService, $timeout, $location, $mdToast){
  $scope.init = function(boards){
    $scope.saved_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
    $scope.location = $location.$$absUrl;
  }

  $scope.trackBoardClick = function (board, user) {
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": "any",
        "Appreciation Action": "any",
        "Other Action": "Board Title Clicked"

    });
  };

  $scope.boardAuthorClick = function (board, user) {
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": "any",
        "Appreciation Action": "any",
        "Other Action": "Author Name Clicked"

    });
  };

  $scope.trackLinkClicked = function (board, user, link) {
    link_text = "Board Link " + link +" click"
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": link_text,
        "Appreciation Action": "any",
        "Other Action": "any"

    });
    event_name = "Link " + link + " Clicked"
    mixpanel.track(event_name, {
        "User": user.username,        
        "Board id": board.secure_id,
    });
  }

  trackLikedUnlikedClicked = function (board, action, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": action,
      "Other Action": "any"
    });
  };

  trackSaveUnsaveClicked = function (board, action, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": action,
      "Other Action": "any"
    });
  };

  $scope.trackFacebookShareClicked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Facebook",
      "Other Action": "any"
    });
  };

  $scope.trackTwitterShareClicked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Twitter",
      "Other Action": "any"
    });
  };

  trackCopyLinkCliked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Copy Link",
      "Other Action": "any"
    });
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  showSimpleToast = function() {
    $mdToast.show($mdToast.simple().textContent('Link Copied!').position('top right'));
  };

  $scope.copyToClipboard = function (link, board, user) {
    var copyElement = document.createElement("textarea");
    copyElement.style.position = 'fixed';
    copyElement.style.opacity = '0';
    copyElement.textContent = link;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(copyElement);
    copyElement.select();
    document.execCommand('copy');
    body.removeChild(copyElement);
    showSimpleToast();
    trackCopyLinkCliked(board, user);
  }

  $scope.update_bookmark = function(board, user){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
    if ($scope.board.bookmark == true) {
      trackSaveUnsaveClicked(board, 'save', user);
    } else {
      trackSaveUnsaveClicked(board, 'unsave', user);
    };
  };

  $scope.update_like = function(board, action, user){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++
      trackLikedUnlikedClicked(board, action, user);
    } else {
      $scope.board.likes--
      trackLikedUnlikedClicked(board, action, user);
    }
  };

  $scope.nextPage = function () {
    if ($scope.busy) return;
    $scope.busy = true;
    if ($scope.stop_loading == false) {
      $http({
      method: 'GET',
      url: 'saved.json?page='+ $scope.next_page
      }).then(function successCallback(response) {
        boards = JSON.parse(response.data.boards);
        for(var i = 0; i <= (boards.length - 1) ; i++) {
          if ( !( boards[i] in $scope.saved_boards ) ) {
            $scope.saved_boards.push(boards[i-0]);
          }          
        }
        next_page = response.data.next_page;
        if (next_page == null) {
          $scope.stop_loading = true;
        } else {
          $scope.next_page = $scope.next_page + 1;
          $scope.busy = false;
        };

      }, function errorCallback(response) {
      });
    };    
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,    
    imagesLoaded: true,
    groupCells: 2
  };
  
  $scope.alert = '';
}]);

app.controller('DraftBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', '$mdToast', function($scope, $http, $window, $document, FlickityService, $timeout, $location, $mdToast){
  $scope.init = function(boards){
    $scope.draft_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
    $scope.location = $location.$$absUrl;
  }

  $scope.trackBoardClick = function (board, user) {
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": "any",
        "Appreciation Action": "any",
        "Other Action": "Board Title Clicked"

    });
  };

  $scope.boardAuthorClick = function (board, user) {
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": "any",
        "Appreciation Action": "any",
        "Other Action": "Author Name Clicked"

    });
  };

  $scope.trackLinkClicked = function (board, user, link) {
    link_text = "Board Link " + link +" click"
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": link_text,
        "Appreciation Action": "any",
        "Other Action": "any"

    });
    event_name = "Link " + link + " Clicked"
    mixpanel.track(event_name, {
        "User": user.username,        
        "Board id": board.secure_id,
    });
  }

  trackLikedUnlikedClicked = function (board, action, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": action,
      "Other Action": "any"
    });
  };

  trackSaveUnsaveClicked = function (board, action, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": action,
      "Other Action": "any"
    });
  };

  $scope.trackFacebookShareClicked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Facebook",
      "Other Action": "any"
    });
  };

  $scope.trackTwitterShareClicked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Twitter",
      "Other Action": "any"
    });
  };

  trackCopyLinkCliked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Copy Link",
      "Other Action": "any"
    });
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  showSimpleToast = function() {
    $mdToast.show($mdToast.simple().textContent('Link Copied!').position('top right'));
  };

  $scope.copyToClipboard = function (link, board, user) {
    var copyElement = document.createElement("textarea");
    copyElement.style.position = 'fixed';
    copyElement.style.opacity = '0';
    copyElement.textContent = link;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(copyElement);
    copyElement.select();
    document.execCommand('copy');
    body.removeChild(copyElement);
    showSimpleToast();
    trackCopyLinkCliked(board, user);    
  }

  $scope.update_bookmark = function(board, user){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
    if ($scope.board.bookmark == true) {
      trackSaveUnsaveClicked(board, 'save', user);
    } else {
      trackSaveUnsaveClicked(board, 'unsave', user);
    };
  };

  $scope.update_like = function(board, action, user){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++
      trackLikedUnlikedClicked(board, action, user); 
    } else {
      $scope.board.likes--
      trackLikedUnlikedClicked(board, action, user);
    }
  };

  $scope.nextPage = function () {
    if ($scope.busy) return;
    $scope.busy = true;
    if ($scope.stop_loading == false) {
      $http({
      method: 'GET',
      url: 'drafts.json?page='+ $scope.next_page
      }).then(function successCallback(response) {
        boards = JSON.parse(response.data.boards);
        for(var i = 0; i <= (boards.length - 1) ; i++) {
          if ( !( boards[i] in $scope.draft_boards ) ) {
            $scope.draft_boards.push(boards[i-0]);
          }          
        }
        next_page = response.data.next_page;
        if (next_page == null) {
          $scope.stop_loading = true;
        } else {
          $scope.next_page = $scope.next_page + 1;
          $scope.busy = false;
        };

      }, function errorCallback(response) {
      });
    };    
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,    
    imagesLoaded: true,
    groupCells: 2
  };
  
  $scope.alert = '';
}]);

app.controller('LikedBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', '$mdToast', function($scope, $http, $window, $document, FlickityService, $timeout, $location, $mdToast){
  $scope.init = function(boards, key){
    $scope.liked_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
    $scope.location = $location.$$protocol + "://" + $location.$$host + "/";
    $scope.facebook_key = key;
  }

  $scope.trackBoardClick = function (board, user) {
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": "any",
        "Appreciation Action": "any",
        "Other Action": "Board Title Clicked"

    });
  };

  $scope.boardAuthorClick = function (board, user) {
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": "any",
        "Appreciation Action": "any",
        "Other Action": "Author Name Clicked"

    });
  };

  $scope.trackLinkClicked = function (board, user, link) {
    link_text = "Board Link " + link +" click"
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": link_text,
        "Appreciation Action": "any",
        "Other Action": "any"

    });
    event_name = "Link " + link + " Clicked"
    mixpanel.track(event_name, {
        "User": user.username,        
        "Board id": board.secure_id,
    });
  }

  trackLikedUnlikedClicked = function (board, action, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": action,
      "Other Action": "any"
    });
  };

  trackSaveUnsaveClicked = function (board, action, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": action,
      "Other Action": "any"
    });
  };

  $scope.trackFacebookShareClicked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Facebook",
      "Other Action": "any"
    });
  };

  $scope.trackTwitterShareClicked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Twitter",
      "Other Action": "any"
    });
  };

  trackCopyLinkCliked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Copy Link",
      "Other Action": "any"
    });
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  showSimpleToast = function() {
    $mdToast.show($mdToast.simple().textContent('Link Copied!').position('top right'));
  };

  $scope.copyToClipboard = function (link, board, user) {
    var copyElement = document.createElement("textarea");
    copyElement.style.position = 'fixed';
    copyElement.style.opacity = '0';
    copyElement.textContent = link;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(copyElement);
    copyElement.select();
    document.execCommand('copy');
    body.removeChild(copyElement);
    showSimpleToast();
    trackCopyLinkCliked(board, user);
  }

  $scope.update_bookmark = function(board, user){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
    if ($scope.board.bookmark == true) {
      trackSaveUnsaveClicked(board, 'save', user);
    } else {
      trackSaveUnsaveClicked(board, 'unsave', user);
    };
  };

  $scope.update_like = function(board, action, user){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++
      trackLikedUnlikedClicked(board, action, user); 
    } else {
      $scope.board.likes--
      trackLikedUnlikedClicked(board, action, user);
    }
  };

  $scope.nextPage = function () {
    if ($scope.busy) return;
    $scope.busy = true;
    if ($scope.stop_loading == false) {
      $http({
      method: 'GET',
      url: 'liked.json?page='+ $scope.next_page
      }).then(function successCallback(response) {
        boards = JSON.parse(response.data.boards);
        for(var i = 0; i <= (boards.length - 1) ; i++) {
          if ( !( boards[i] in $scope.liked_boards ) ) {
            $scope.liked_boards.push(boards[i-0]);
          }          
        }
        next_page = response.data.next_page;
        if (next_page == null) {
          $scope.stop_loading = true;
        } else {
          $scope.next_page = $scope.next_page + 1;
          $scope.busy = false;
        };

      }, function errorCallback(response) {
      });
    };    
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,    
    imagesLoaded: true,
    groupCells: 2
  };
  
  $scope.alert = '';
}]);

app.controller('UsersCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', '$mdDialog', function($scope, $http, $window, $document, FlickityService, $timeout, $location, $mdDialog){
  $scope.init = function(user_profile, current_user, is_following, following_count, followers_count){
    $scope.is_following = is_following;
    $scope.following_count = following_count;
    $scope.followers_count = followers_count;
    $scope.location = $location.$$absUrl;
  }

  $scope.showDialog1 = function() {
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope,        
      preserveScope: true,
      contentElement: '#myModal1',
      parent: angular.element(document.body)
    });
  };

  $scope.showDialog2 = function() {
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope,        
      preserveScope: true,
      contentElement: '#myModal2',
      parent: angular.element(document.body)
    });
  };

  $scope.showDialog3 = function() {
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope,        
      preserveScope: true,
      contentElement: '#myModal3',
      parent: angular.element(document.body)
    });
  };

  $scope.showDialog4 = function() {
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope,        
      preserveScope: true,
      contentElement: '#myModal4',
      parent: angular.element(document.body)
    });
  };
}]);

app.controller('ShowBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', '$mdToast', function($scope, $http, $window, $document, FlickityService, $timeout, $location, $mdToast){
  $scope.init = function(boards, key){
    $scope.pub_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
    $scope.location = $location.$$protocol + "://" + $location.$$host + "/";
    $scope.facebook_key = key;
  }

  $scope.trackBoardClick = function (board, user) {
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": "any",
        "Appreciation Action": "any",
        "Other Action": "Board Title Clicked"

    });
  };

  $scope.boardAuthorClick = function (board, user) {
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": "any",
        "Appreciation Action": "any",
        "Other Action": "Author Name Clicked"

    });
  };

  $scope.trackLinkClicked = function (board, user, link) {
    link_text = "Board Link " + link +" click"
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": link_text,
        "Appreciation Action": "any",
        "Other Action": "any"

    });
    event_name = "Link " + link + " Clicked"
    mixpanel.track(event_name, {
        "User": user.username,        
        "Board id": board.secure_id,
    });
  }

  trackLikedUnlikedClicked = function (board, action, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": action,
      "Other Action": "any"
    });
  };

  trackSaveUnsaveClicked = function (board, action, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": action,
      "Other Action": "any"
    });
  };

  $scope.trackFacebookShareClicked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Facebook",
      "Other Action": "any"
    });
  };

  $scope.trackTwitterShareClicked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Twitter",
      "Other Action": "any"
    });
  };

  trackCopyLinkCliked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Copy Link",
      "Other Action": "any"
    });
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  showSimpleToast = function() {
    $mdToast.show($mdToast.simple().textContent('Link Copied!').position('top right'));
  };

  $scope.copyToClipboard = function (link, board, user) {
    var copyElement = document.createElement("textarea");
    copyElement.style.position = 'fixed';
    copyElement.style.opacity = '0';
    copyElement.textContent = link;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(copyElement);
    copyElement.select();
    document.execCommand('copy');
    body.removeChild(copyElement);
    showSimpleToast();
    trackCopyLinkCliked(board, user);    
  }

  $scope.update_bookmark = function(board, user){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
    if ($scope.board.bookmark == true) {
      trackSaveUnsaveClicked(board, 'save', user);
    } else {
      trackSaveUnsaveClicked(board, 'unsave', user);
    };
  };

  $scope.update_like = function(board, action, user){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++
      trackLikedUnlikedClicked(board, action, user); 
    } else {
      $scope.board.likes--
      trackLikedUnlikedClicked(board, action, user);
    }
  };

  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,
    imagesLoaded: true,
    groupCells: 2
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.alert = '';
}]);

app.controller('EditUserCtrl', ['$scope', '$http', '$window', '$document', '$timeout', '$location', function($scope, $http, $window, $document, $timeout, $location){
  
  getCategoriesAndUserCategories = function (user) {
    $http({
      method: 'GET',
      url: 'categories.json',
      params: {user_id: user.id}
      }).then(function successCallback(response) {
        $scope.categories = JSON.parse(response.data.categories);
        $scope.user_categories = JSON.parse(response.data.user_categories);        
      }, function errorCallback(response) {
    });
  }

  $scope.init = function (user) {
    $scope.user_profile = user;
    getCategoriesAndUserCategories(user);
  }

  $scope.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
  };

  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

  $scope.checkBoxValidation = function () {
    if ($scope.user_categories.length >= 3) {
      return false;
    };    

    return true;
  };

  $scope.UpdateCategory = function () {    
    $http({
      method: 'POST',
      url: 'update_categories.json',
      data: {categories: $scope.user_categories, user_id: $scope.user_profile.id}
    }).then(function successCallback(response) {      
      },function errorCallback(response) {
    });
  }
}]);

app.controller('MixpanelCtrl', ['$scope', '$http', '$window', '$document', '$timeout', '$location', function($scope, $http, $window, $document, $timeout, $location){
  
  getTrendingData = function () {
    $http({
      method: 'GET',
      url: 'get_trending_board_data.json',
      params: {}
      }).then(function successCallback(response) {
        $scope.boards_data = response.data;
        $scope.loading_data = false;
      }, function errorCallback(response) {
    });
  }

  $scope.init = function () {
    $scope.loading_data = true;
    getTrendingData();
  };

  $scope.updateScore = function () {
    $scope.loading_data = true;
    $http({
      method: 'POST',
      url: '/update_form_score.json',
      data: {forms: $scope.boards_data}
      }).then(function successCallback(response) {
        $scope.boards_data = response.data;
        $scope.loading_data = false;
      }, function errorCallback(response) {
    });
  };

}]);

app.controller('UpdateFormListCtrl', ['$scope', '$http', '$window', '$document', '$timeout', '$location', function($scope, $http, $window, $document, $timeout, $location){
  
  $scope.init = function (list) {
    //$scope.loading_data = true;
    //getTrendingData();
    $scope.loading_data = false;
    $scope.list = list;
  };

  $scope.updateList = function () {
    $scope.loading_data = true;
    $http({
      method: 'POST',
      url: '/update_form_list.json',
      data: {forms: $scope.boards_data}
      }).then(function successCallback(response) {
        $scope.list = response.data;
        $scope.loading_data = false;
      }, function errorCallback(response) {
    });
  };

}]);

app.controller('RegistrationsCtrl', ['$scope', '$http', '$window', '$document', '$timeout', '$location', function($scope, $http, $window, $document, $timeout, $location){
  
  $scope.init = function () {
    $scope.title = "Hello world"
  };
}]);

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

app.controller('getFollowersController', ['$scope', '$http', '$window', '$document', '$timeout', '$location', function($scope, $http, $window, $document, $timeout, $location){
  
  $scope.init = function (current_user_id, profile_user_id) {
    $http({
      method: 'GET',
      url: '/user/'+ current_user_id +'/followers.json',
      params: {user_id: profile_user_id}
      }).then(function successCallback(response) {
        $scope.followers = JSON.parse(response.data.followers);
      }, function errorCallback(response) {
    });
  };

  $scope.unfollow = function(id, current_user_id) {
    $scope.followers_count = $scope.followers_count - 1;
    $http({
      method: 'DELETE',
      url: '/users/'+ id +'/follows/' + current_user_id + '.json'
      }).then(function successCallback(response) {
      }, function errorCallback(response) {
    });
  }

  $scope.follow = function(id, current_user_id) {
    $scope.followers_count = $scope.followers_count + 1;
    $http({
      method: 'POST',
      url: '/users/'+ id +'/follows.json',
      params: {id: current_user_id}
      }).then(function successCallback(response) {
      }, function errorCallback(response) {
    });
  }
}]);

app.controller('getFollowingsController', ['$scope', '$http', '$window', '$document', '$timeout', '$location', function($scope, $http, $window, $document, $timeout, $location){
  
  $scope.init = function (current_user_id, profile_user_id) {
    $http({
      method: 'GET',
      url: '/user/'+ current_user_id +'/followings.json',
      params: {user_id: profile_user_id}
      }).then(function successCallback(response) {
        $scope.followings = JSON.parse(response.data.followings);
      }, function errorCallback(response) {
    });
  };

  $scope.unfollow = function(id, current_user_id) {
    $scope.followers_count = $scope.followers_count - 1;
    $http({
      method: 'DELETE',
      url: '/users/'+ id +'/follows/' + current_user_id + '.json'
      }).then(function successCallback(response) {
      }, function errorCallback(response) {
    });
  }

  $scope.follow = function(id, current_user_id) {
    $scope.followers_count = $scope.followers_count + 1;
    $http({
      method: 'POST',
      url: '/users/'+ id +'/follows.json',
      params: {id: current_user_id}
      }).then(function successCallback(response) {
      }, function errorCallback(response) {
    });
  }
}]);
