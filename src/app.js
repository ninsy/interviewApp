'use strict';

angular
  .module('interviewApp')
  .constant("FIREBASE_URI", "https://jinterviewapp.firebaseio.com/")
  .constant("QUESTIONS_CONST", 0.123)
  .constant("SECRET", "dm7UA3n8qJoKgMedLtNnfidrBzB0p4n0yqhVa6jt")
  .config("appConfig", appConfig)
  .run('runner', runner)

interviewApp.$inject = ['ui.router', 'firebase', "interview.components", 'ngResource', "mgcrea.ngStrap"];
appConfig.$inject = ["$urlRouterProvide"];
runner.$inject = ["$rootScope", "$state"];

function appConfig($urlRouterProvider) {
  $urlRouterProvider.otherwise("/generate");
}

function runner($rootScope, $state) {
  $rootScope.on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    event.preventDefault();
    if(error === "AUTH_REQUIRED") {
      $state.go("/login");
    }
  })
}
