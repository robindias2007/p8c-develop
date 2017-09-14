var app = angular.module('app', ['bc.Flickity', 'infinite-scroll']);

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

app.controller('newFormCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){

  $scope.init = function () {
    console.log("New Form called");
    $scope.formFlickityOptions = {
      cellSelector: '.form-article-cell',
      prevNextButtons: true,
      pageDots: false,
      imagesLoaded: true,
      groupCells: 2
    };
    $scope.newFormLinks = [{link1: false, notelink1: false, loading1: false, url1: "", title1: null, dsc1: null, image1: null, note1: null, content1: null, tag1: null, host1: null, error1: "", displayLinkData: false},
                          {link2: false, notelink2: false, loading2: false, url2: "", title2: null, dsc2: null, image2: null, note2: null, content2: null, tag2: null, host2: null, error2: "", displayLinkData: false},
                          {link3: false, notelink3: false, loading3: false, url3: "", title3: null, dsc3: null, image3: null, note3: null, content3: null, tag3: null, host3: null, error3: "", displayLinkData: false},
                          {link4: false, notelink4: false, loading4: false, url4: "", title4: null, dsc4: null, image4: null, note4: null, content4: null, tag4: null, host4: null, error4: "", displayLinkData: false},
                          {link5: false, notelink5: false, loading5: false, url5: "", title5: null, dsc5: null, image5: null, note5: null, content5: null, tag5: null, host5: null, error5: "", displayLinkData: false}]
  };

  $scope.AddLinkClicked = function (text) {
    switch (text) {
      case 'link1':
        $scope.newFormLinks[0].link1 = true;
        break;
      case 'link2':
        $scope.newFormLinks[1].link2 = true;
        break;
      case 'link3':
        $scope.newFormLinks[2].link3 = true;
        break;
      case 'link4':
        $scope.newFormLinks[3].link4 = true;
        break;
      case 'link5':
        $scope.newFormLinks[4].link5 = true;
        break;
      default:
    }
  }

  $scope.AddNoteClicked = function (text) {
    switch (text) {
      case 'notelink1':
        $scope.newFormLinks[0].notelink1 = true;
        break;
      case 'notelink2':
        $scope.newFormLinks[1].notelink2 = true;
        break;
      case 'notelink3':
        $scope.newFormLinks[2].notelink3 = true;
        break;
      case 'notelink4':
        $scope.newFormLinks[3].notelink4 = true;
        break;
      case 'notelink5':
        $scope.newFormLinks[4].notelink5 = true;
        break;
      default:
    }
  }

  assignData = function(data, text, url) {
    switch (text) {
      case 'link1':
        if (data == null){
          $scope.newFormLinks[0].loading1 = false
          $scope.newFormLinks[0].error1 = "Invalid url!"
        } else {          
          $scope.newFormLinks[0].url1 = url;
          $scope.newFormLinks[0].title1 = data.title;
          $scope.newFormLinks[0].image1 = data.image;
          $scope.newFormLinks[0].dsc1 = data.description;
          $scope.newFormLinks[0].content1 = data.content;
          $scope.newFormLinks[0].tag1 = data.tags;
          $scope.newFormLinks[0].host1 = data.host;
          $scope.newFormLinks[0].loading1 = false;
          $scope.newFormLinks[0].displayLinkData = true;
        }
        break;
      case 'link2':
        if (data == null){
          $scope.newFormLinks[1].loading2 = false
          $scope.newFormLinks[1].error2 = "Invalid url!"
        } else {          
          $scope.newFormLinks[1].url2 = url;
          $scope.newFormLinks[1].title2 = data.title;
          $scope.newFormLinks[1].image2 = data.image;
          $scope.newFormLinks[1].dsc2 = data.description;
          $scope.newFormLinks[1].content2 = data.content;
          $scope.newFormLinks[1].tag2 = data.tags;
          $scope.newFormLinks[1].host2 = data.host;
          $scope.newFormLinks[1].loading2 = false;
          $scope.newFormLinks[1].displayLinkData = true;
        }
        break;
      case 'link3':
        if (data == null){
          $scope.newFormLinks[2].loading3 = false
          $scope.newFormLinks[2].error3 = "Invalid url!"
        } else {          
          $scope.newFormLinks[2].url3 = url;
          $scope.newFormLinks[2].title3 = data.title;
          $scope.newFormLinks[2].image3 = data.image;
          $scope.newFormLinks[2].dsc3 = data.description;
          $scope.newFormLinks[2].content3 = data.content;
          $scope.newFormLinks[2].tag3 = data.tags;
          $scope.newFormLinks[2].host3 = data.host;
          $scope.newFormLinks[2].loading3 = false;
          $scope.newFormLinks[2].displayLinkData = true;
        }
        break;
      case 'link4':
        if (data == null){
          $scope.newFormLinks[3].loading4 = false
          $scope.newFormLinks[3].error4 = "Invalid url!"
        } else {          
          $scope.newFormLinks[3].url4 = url;
          $scope.newFormLinks[3].title4 = data.title;
          $scope.newFormLinks[3].image4 = data.image;
          $scope.newFormLinks[3].dsc4 = data.description;
          $scope.newFormLinks[3].content4 = data.content;
          $scope.newFormLinks[3].tag4 = data.tags;
          $scope.newFormLinks[3].host4 = data.host;
          $scope.newFormLinks[3].loading4 = false;
          $scope.newFormLinks[3].displayLinkData = true;
        }
        break;
      case 'link5':
        if (data == null){
          $scope.newFormLinks[4].loading5 = false
          $scope.newFormLinks[4].error5 = "Invalid url!"
        } else {          
          $scope.newFormLinks[4].url5 = url;
          $scope.newFormLinks[4].title5 = data.title;
          $scope.newFormLinks[4].image5 = data.image;
          $scope.newFormLinks[4].dsc5 = data.description;
          $scope.newFormLinks[4].content5 = data.content;
          $scope.newFormLinks[4].tag5 = data.tags;
          $scope.newFormLinks[4].host5 = data.host;
          $scope.newFormLinks[4].loading5 = false;
          $scope.newFormLinks[4].displayLinkData = true;
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
      case 'link1':
        $scope.newFormLinks[0].error1 = "";
        if ($scope.newFormLinks[0].url1 != ""){
          $scope.newFormLinks[0].loading1 = true;
          getMetaInspectorData($scope.newFormLinks[0].url1, 'link1');
        }
        break;
      case 'link2':
        $scope.newFormLinks[1].error2 = "";
        if ($scope.newFormLinks[1].url2 != ""){
          $scope.newFormLinks[1].loading2 = true;
          getMetaInspectorData($scope.newFormLinks[1].url2, 'link2');
        }
        break;
      case 'link3':
        $scope.newFormLinks[2].error3 = "";
        if ($scope.newFormLinks[2].url3 != ""){
          $scope.newFormLinks[2].loading3 = true;
          getMetaInspectorData($scope.newFormLinks[2].url3, 'link3');
        }
        break;
      case 'link4':
        $scope.newFormLinks[3].error4 = "";
        if ($scope.newFormLinks[3].url4 != ""){
          $scope.newFormLinks[3].loading4 = true;
          getMetaInspectorData($scope.newFormLinks[3].url4, 'link4');
        }
        break;
      case 'link5':
        $scope.newFormLinks[4].error5 = "";
        if ($scope.newFormLinks[4].url5 != ""){
          $scope.newFormLinks[4].loading5 = true;
          getMetaInspectorData($scope.newFormLinks[4].url5, 'link5');
        }
        break;
      default:
    }
  };
}]);  