app.controller('editFormCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', '$mdToast', '$mdDialog', '$compile', function($scope, $http, $window, $document, FlickityService, $timeout, $location, $mdToast, $mdDialog, $compile){

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
    $scope.location = $location.$$protocol + "://" + $location.$$host + "/";
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
        $scope.newFormLinks[0].dsc = null;
        $scope.newFormLinks[0].image = null;
        $scope.newFormLinks[0].note = null;
        $scope.newFormLinks[0].content = null;
        $scope.newFormLinks[0].tag = null;
        $scope.newFormLinks[0].host = null;        
        break;
      case '1':        
        $scope.newFormLinks[1].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[1].url = "";
        $scope.newFormLinks[1].title = null;
        $scope.newFormLinks[1].dsc = null;
        $scope.newFormLinks[1].image = null;
        $scope.newFormLinks[1].note = null;
        $scope.newFormLinks[1].content = null;
        $scope.newFormLinks[1].tag = null;
        $scope.newFormLinks[1].host = null;        
        break;
      case '2':        
        $scope.newFormLinks[2].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};        
        $scope.newFormLinks[2].url = "";
        $scope.newFormLinks[2].title = null;
        $scope.newFormLinks[2].dsc = null;
        $scope.newFormLinks[2].image = null;
        $scope.newFormLinks[2].note = null;
        $scope.newFormLinks[2].content = null;
        $scope.newFormLinks[2].tag = null;
        $scope.newFormLinks[2].host = null;        
        break;
      case '3':                
        $scope.newFormLinks[3].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[3].url = "";
        $scope.newFormLinks[3].title = null;
        $scope.newFormLinks[3].dsc = null;
        $scope.newFormLinks[3].image = null;
        $scope.newFormLinks[3].note = null;
        $scope.newFormLinks[3].content = null;
        $scope.newFormLinks[3].tag = null;
        $scope.newFormLinks[3].host = null;        
        break;
      case '4':        
        $scope.newFormLinks[4].show = {addLink: true, linkBox: false, loading: false, viewData: false, noteBox: false, editLinkBox: false};
        $scope.newFormLinks[4].url = "";
        $scope.newFormLinks[4].title = null;
        $scope.newFormLinks[4].dsc = null;
        $scope.newFormLinks[4].image = null;
        $scope.newFormLinks[4].note = null;
        $scope.newFormLinks[4].content = null;
        $scope.newFormLinks[4].tag = null;
        $scope.newFormLinks[4].host = null;        
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
          $scope.newFormLinks[0].url = data.url;
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
          $scope.newFormLinks[1].url = data.url;
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
          $scope.newFormLinks[2].url = data.url;
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
          $scope.newFormLinks[3].url = data.url;
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
          $scope.newFormLinks[4].url = data.url;
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

  showPublishedToast = function() {
    $mdToast.show($mdToast.simple().textContent('Published!').position('top right'));
  };

  showDraftToast = function() {
    $mdToast.show($mdToast.simple().textContent('Saved as Draft!').position('top right'));
  };

  InitiateMixpanelDraftEvent = function (data, username) {
    $http({
      method: 'POST',
      url: '/update_form_list.json',
      data: {}
      }).then(function successCallback(response) {        
      }, function errorCallback(response) {
    });

    mixpanel.track("Curate Draft", {
      "Author": username,
      "Board Id": data.secure_id,
      "Date": data.created_at,
      "Prior Status": "Draft"     
    });

    host = $window.location.host;
    landingUrl = "http://" + host +"/"+ username +"/drafts";    
    $window.location.href = landingUrl;
    showDraftToast();
  }

  InitiateMixpanelPublishEvent = function (data, username) {
    $http({
      method: 'POST',
      url: '/update_form_list.json',
      data: {}
      }).then(function successCallback(response) {        
      }, function errorCallback(response) {
    });

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

  showSimpleToast = function() {
    $mdToast.show($mdToast.simple().textContent('Link Copied!').theme("success-toast").position('top right'));
  };

  $scope.copyToClipboard = function (link) {
    var copyElement = document.createElement("textarea");
    copyElement.style.position = 'fixed';
    copyElement.style.opacity = '0';
    copyElement.textContent =link;
    var body = document.getElementById('editFormModal');
    body.appendChild(copyElement);
    copyElement.select();
    document.execCommand("copy");
    body.removeChild(copyElement);
    showSimpleToast();   
  };

  showPublishConfirm = function (data, username, ev) {
    $scope.url = data.slug
    div_string = "<div style='text-align: center'><md-button aria-label='Copy' class='md-fab md-ink-ripple md-button md-accent' style='width: 40px; height: 40px' ng-click='copyToClipboard("+"\""+$scope.url+"\""+")'><a data-remote='true'><md-tooltip class='custom-tooltip' md-delay='0' md-direction='top' style='z-index: 1054'>Copy link</md-tooltip><md-icon style='vertical-align: baseline !important'><i class='material-icons' style='color: white'>link</i></md-icon></a></md-button><md-button aria-label='Facebook' class='md-icon-button' layout-align='center center' style='padding: 0px !important; margin: 0px 10px 0px 10px !important'><a target='_blank' ng-click='' href="+ "\""+ "https://www.facebook.com/dialog/share?app_id=" + $scope.facebook_key + "&display=popup&href=" + $scope.url + "\"" +"><md-tooltip class='custom-tooltip' md-delay='0' md-direction='top' style='z-index: 1054'>Facebook</md-tooltip><img style='width: 100%' src='https://s3.us-east-2.amazonaws.com/thecurativ-master/facebook.png' alt='Facebook'></a></md-button><md-button aria-label='Tweeter' class='md-icon-button' layout-align='center center' style='padding: 0px !important; margin: 0px 10px 0px 10px !important'><a target='_blank' ng-click='' href="+ "\""+ "https://twitter.com/intent/tweet?url=" + $scope.url + "\"" +"><md-tooltip class='custom-tooltip' md-delay='0' md-direction='top' style='z-index: 1054'>Twitter</md-tooltip><img style='width: 100%' src='https://s3.us-east-2.amazonaws.com/thecurativ-master/twitter.png' alt='Twitter'></a></md-button></div>"    
    confirm = $mdDialog.confirm({
      onComplete: function afterShowAnimation() {
            var $dialog = angular.element(document.querySelector('md-dialog'));            
            var div = angular.element(div_string);
            divblock = $compile(div)($scope);            
            var $actionsSection = $dialog.find('md-dialog-content');
            var $actionsButtonSection = $dialog.find('md-dialog-actions');
            var $cancelButton = $actionsButtonSection.children()[0];
            $cancelButton.remove();
            $actionsSection.append(divblock);            
            var $confirmButton = $actionsButtonSection.children()[0];
            angular.element($confirmButton).addClass('md-raised');
        }
    }).title('You have successfully Published your board!').textContent('Share your board with others, or return to your profile by clicking Finish below.').ariaLabel('Lucky day').targetEvent(ev).ok('Finish').cancel('Share!');
    $mdDialog.show(confirm).then(function() {
      InitiateMixpanelPublishEvent(JSON.parse(data.data), username);
    }, function() {
      InitiateMixpanelPublishEvent(JSON.parse(data.data), username);
    });        
  };

  $scope.updateForm = function (user_id, text, username, ev) {
    $scope.checkFormValidation(true);
    $scope.checkDraftValidation(true);
    $http({
      method: 'POST',
      url: 'update_form.json',
      data: {secure_id: $scope.secure_id, user_id: user_id, text: text, forms: $scope.newFormLinks, title: $scope.formTitle, dsc: $scope.formDsc, sub_header: $scope.formSubheader}
    }).then(function successCallback(response) {
      data = response.data;
      $scope.facebook_key = data.key
      if (text == "draft") {        
        InitiateMixpanelDraftEvent(JSON.parse(data.data), username);
      } else {
        showPublishConfirm(data, username, ev)
      };        
    },function errorCallback(response) {
    });
  };

  $scope.checkFormValidation = function (value) {
    if (value == true) {
      return true;
    } else {
      if ($scope.formTitle == '') {
        return true;
      };
      
      if (($scope.newFormLinks[0].title == null) && ($scope.newFormLinks[1].title == null) && ($scope.newFormLinks[2].title == null) && ($scope.newFormLinks[3].title == null) && ($scope.newFormLinks[4].title == null)) {
        return true;
      };

      return false;
    };    
  };

  $scope.checkDraftValidation = function (value) {
    if (value == true) {
      return true;
    } else {      
      if (($scope.newFormLinks[0].title == null) && ($scope.newFormLinks[1].title == null) && ($scope.newFormLinks[2].title == null) && ($scope.newFormLinks[3].title == null) && ($scope.newFormLinks[4].title == null) && ($scope.formTitle == '')) {
        return true;
      };

      return false;
    }; 
  };
}]);