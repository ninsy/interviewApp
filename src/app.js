(function() {
  'use strict';

  angular
    .module('interviewApp', [
      'ui.router',
      'firebase',
      'ngResource',
      'interview.components',
      "ngMessages",
      'mgcrea.ngStrap'
    ])
    .controller("MainCtrl", MainController)
    .constant("FIREBASE_URI", "https://jinterviewapp.firebaseio.com/")
    .constant("QUESTIONS_CONST", 0.123)
    .config(appConfig)
    .run(runner)

  MainController.$inject = ['UserModel', "$state", "Auth"];
  appConfig.$inject = ["$urlRouterProvider"];
  runner.$inject = ["$rootScope", "$state"];

  function appConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise("/generate");
  }

  function MainController(UserModel, $state, Auth) {
    var main = this,
      currentUser = false;

    main.auth = Auth;


    main.logout = function() {
      UserModel.logout();
      $state.go("login");
    }

    main.auth.$onAuth(function (authData) {
      if(authData) {
        currentUser = true;
        UserModel.setCurrentUser(authData.uid);
      }
      else {
        currentUser = true;
        UserModel.setCurrentUser(null);
      }
    })
  }

  function runner($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if(error === "AUTH_REQUIRED") {
        currentUser = false;
        
        $state.go("login");
      }
    })
  }

})();
