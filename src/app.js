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

  MainController.$inject = ['UserModel','DataModel', "$state", "Auth"];
  appConfig.$inject = ["$urlRouterProvider"];
  runner.$inject = ["$rootScope", "$state"];

  function runner($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if(error === "AUTH_REQUIRED") {
        $state.go("login");
      }
    })
  }


  function appConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise("generate");
  }

  function MainController(UserModel, DataModel, $state, Auth) {
    var main = this;

    main.checkState = checkState;
    main.changeState = changeState;
    main.logout = logout;

    main.auth = Auth;
    main.currentUser = null;

    function checkState(routeName) {
      return $state.includes(routeName);
    }

    function changeState(destination) {
      DataModel.resetData("STATE_CHANGE");
      if(!main.checkState(destination)) {
        $state.go(destination);
      }
    }

    function logout() {
      UserModel.logout();
      DataModel.resetData("LOGOUT");
      $state.go("login");
    }

    main.auth.$onAuth(function (authData) {
      if(authData) {
        main.currentUser = authData.uid;
        UserModel.setCurrentUser(authData.uid);
      }
      else {
        main.currentUser = null;
        UserModel.setCurrentUser(null);
      }
    })
  }


})();
