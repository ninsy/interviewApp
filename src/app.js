'use strict';

// Declare app level module which depends on views, and components
angular.module('interviewApp', [
  'ui.router',
  'firebase',
  "interview.components",
  'ngResource',
  "mgcrea.ngStrap"
])
  .constant("FIREBASE_URI", "https://jinterviewapp.firebaseio.com/")
  .constant("QUESTIONS_CONST", 0.123)
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/generate");

    $stateProvider
      .state("login", {
        url: "/login",
        templateUrl: "login/login.html",
        controller: "LoginCtrl",
        controllerAs: "login"
      })
      .state("generate", {
        url: "/generate",
        templateUrl: "generate/generate.html",
        controller: "GenerateCtrl",
        controllerAs: "generator",
        resolve: {
          'currentUser': ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }
      })
      .state("creator", {
        url: "/creator",
        templateUrl: "creator/creator.html",
        controller: "CreatorCtrl",
        controllerAs: "creator",
        resolve: {
          'currentUser': ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }
      });
    }
  })
  .run(function($rootScope, $state) {
    $rootScope.on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if(error === "AUTH_REQUIRED") {
        $state.go("/login");
      }
    })
  })
