'use strict';

angular
  .module("interviewApp")
  .config('creatorConfig', creatorConfig)
  .controller("CreatorCtrl", creatorController);

creatorConfig.$inject = ['$stateProvider'];
creatorController.$inject = [];
creatorAuthCheck.$inject = ['Auth'];

function creatorConfig($stateProvider) {
  $stateProvider
    .state("creator", {
      url: "/creator",
      templateUrl: "creator/creator.html",
      controller: "CreatorCtrl",
      controllerAs: "creator",
      resolve: {
        'currentUser': authCheck
      }
    })
}

function creatorController() {

}

function authCheck(Auth) {
  return Auth.$requireAuth();
}
