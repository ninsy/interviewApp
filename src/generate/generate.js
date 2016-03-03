'use strict';

angular
  .module('interviewApp')
  .config('generateConfig', generateConfig)
  .controller('GenerateCtrl', GenerateController );

generateConfig.$inject = ['$stateProvider'];
GenerateController.$inject = [];
generateAuthCheck.$inject = ['Auth'];

function GenerateController() {

}

function generateConfig($stateProvider) {
  $stateProvider.state("generate", {
      url: "/generate",
      templateUrl: "generate/generate.html",
      controller: "GenerateCtrl",
      controllerAs: "generator",
      resolve: {
        'currentUser': generateAuthCheck
      }
  })
}

function generateAuthCheck(Auth) {
   return Auth.$requireAuth();
}
