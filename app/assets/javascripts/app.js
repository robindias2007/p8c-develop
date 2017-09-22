var app = angular.module('app', ['bc.Flickity', 'infinite-scroll', 'ui.sortable', 'ngMaterial']);

app.config(function($mdThemingProvider) {

 $mdThemingProvider.disableTheming();
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
app.controller('newFormCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){

  $scope.init = function () {
    $scope.formFlickityOptions = {
      cellSelector: '.form-article-cell',
      prevNextButtons: true,
      pageDots: false,
      imagesLoaded: true,
      groupCells: 2
    };
    $scope.formTitle = "";
    $scope.formDsc = "";
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
        break;
      case '1':        
        $scope.newFormLinks[1].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[1].url = "";
        break;
      case '2':        
        $scope.newFormLinks[2].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};        
        $scope.newFormLinks[2].url = "";
        break;
      case '3':                
        $scope.newFormLinks[3].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[3].url = "";
        break;
      case '4':        
        $scope.newFormLinks[4].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[4].url = "";
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

  $scope.saveForm = function (user_id, text) {
    $http({
      method: 'POST',
      url: 'create_form.json',
      data: {user_id: user_id, text: text, forms: $scope.newFormLinks, title: $scope.formTitle, dsc: $scope.formDsc}
    }).then(function successCallback(response) {
      data = response.data;
      assignData(data, text, url);
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

app.controller('headerCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', '$mdDialog', function($scope, $http, $window, $document, FlickityService, $timeout, $location, $mdDialog){
    var self = this;

      $scope.hidden = false;
      $scope.isOpen = false;
      $scope.hover = false;

      // On opening, add a delayed property which shows tooltips after the speed dial has opened
      // so that they have the proper position; if closing, immediately hide the tooltips
      $scope.$watch('isOpen', function(isOpen) {
        if (isOpen) {
          $timeout(function() {
            $scope.tooltipVisible = $scope.isOpen;
          }, 600);
        } else {
          $scope.tooltipVisible = $scope.isOpen;
        }
      });

      $scope.items = [
        { name: "Twitter", icon: "img/icons/twitter.svg", direction: "bottom" },
        { name: "Facebook", icon: "img/icons/facebook.svg", direction: "top" },
        { name: "Google Hangout", icon: "img/icons/hangout.svg", direction: "bottom" }
      ];

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


app.controller('AppCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){
  $scope.init = function(boards,key){
    $scope.cat_boards = boards;
    $scope.category_boards = boards;
    $scope.location = $location.$$protocol + "://" + $location.$$host + "/";
    $scope.facebook_key = key;
  }

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  $scope.update_bookmark = function(board){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
  };

  $scope.update_like = function(board, action){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++ 
    } else {
      $scope.board.likes--
    }
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,
    pageDots: false,
    imagesLoaded: true,
    groupCells: 2
  };
  
  $scope.alert = '';
}]);

app.controller('HomeAppCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){
  $scope.init = function(boards){
    $scope.boards = boards;
    $scope.location = $location.$$absUrl;
  }

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  $scope.update_bookmark = function(board){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
  };

  $scope.update_like = function(board, action){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++ 
    } else {
      $scope.board.likes--
    }
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,
    pageDots: false,
    imagesLoaded: true,
    groupCells: 2
  };
  
  $scope.alert = '';
}]);


app.controller('PubBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){
  $scope.init = function(boards, key){
    $scope.pub_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
    $scope.location = $location.$$protocol + "://" + $location.$$host + "/";
    $scope.facebook_key = key;
  }

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  $scope.update_bookmark = function(board){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
  };

  $scope.update_like = function(board, action){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++ 
    } else {
      $scope.board.likes--
    }
  };

  $scope.nextPage = function () {
    if ($scope.busy) return;
    $scope.busy = true;
    if ($scope.stop_loading == false) {
      $http({
      method: 'GET',
      url: 'publish.json?page='+ $scope.next_page
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
    pageDots: false,
    imagesLoaded: true,
    groupCells: 2
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.alert = '';
}]);

app.controller('SavedBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){
  $scope.init = function(boards){
    $scope.saved_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
    $scope.location = $location.$$absUrl;
  }

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  $scope.update_bookmark = function(board){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
  };

  $scope.update_like = function(board, action){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++ 
    } else {
      $scope.board.likes--
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
    pageDots: false,
    imagesLoaded: true,
    groupCells: 2
  };
  
  $scope.alert = '';
}]);

app.controller('DraftBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){
  $scope.init = function(boards){
    $scope.draft_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
    $scope.location = $location.$$absUrl;
  }

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  $scope.update_bookmark = function(board){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
  };

  $scope.update_like = function(board, action){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++ 
    } else {
      $scope.board.likes--
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
    pageDots: false,
    imagesLoaded: true,
    groupCells: 2
  };
  
  $scope.alert = '';
}]);

app.controller('LikedBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){
  $scope.init = function(boards, key){
    $scope.liked_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
    $scope.location = $location.$$protocol + "://" + $location.$$host + "/";
    $scope.facebook_key = key;
  }

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  $scope.update_bookmark = function(board){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
  };

  $scope.update_like = function(board, action){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++ 
    } else {
      $scope.board.likes--
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
    pageDots: false,
    imagesLoaded: true,
    groupCells: 2
  };
  
  $scope.alert = '';
}]);

app.controller('UsersCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){
  $scope.init = function(user_profile, current_user, is_following, following_count, followers_count){
    $scope.is_following = is_following;
    $scope.following_count = following_count;
    $scope.followers_count = followers_count;
    $scope.location = $location.$$absUrl;
  }

  $scope.get_followings = function (current_user_id, profile_user_id) {
    $http({
      method: 'GET',
      url: '/user/'+ current_user_id +'/followings.json',
      params: {user_id: profile_user_id}
      }).then(function successCallback(response) {
        $scope.followings = JSON.parse(response.data.followings);
      }, function errorCallback(response) {
    });
  };

  $scope.get_followers = function (current_user_id, profile_user_id) {
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

app.controller('ShowBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){
  $scope.init = function(boards, key){
    $scope.pub_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
    $scope.location = $location.$$protocol + "://" + $location.$$host + "/";
    $scope.facebook_key = key;
  }

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  $scope.update_bookmark = function(board){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
  };

  $scope.update_like = function(board, action){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++ 
    } else {
      $scope.board.likes--
    }
  };

  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,
    pageDots: false,
    imagesLoaded: true,
    groupCells: 2
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.alert = '';
}]);  