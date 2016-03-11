'use strict';

angular
  .module('interviewApp')
  .config('generateConfig', generateConfig)
  .controller('GenerateCtrl', GenerateController );

generateConfig.$inject = ['$stateProvider'];
GenerateController.$inject = ['UserModel','DataModel', "requestUser" , '$stateProvider'];
generateAuthCheck.$inject = ['Auth'];

function generateConfig($stateProvider) {
  $stateProvider
    .state("generate", {
      url: "/generate",
      templateUrl: "generate/generate.html",
      controller: "GenerateCtrl",
      controllerAs: "generator",
      resolve: {
        'currentUser': generateAuthCheck
      }
  })
}

function GenerateController(UserModel, DataModel,$state) {

  var generator = this;

  generator.currentCategory = null;
  generator.errorFlag = false;

    prepareData();

    function appendQuestion(question) {
      DataModel.appendQuestion(question)
    }

    function getCategory() {
      return generator.currentCategory;
    }

    function isPicked(question) {
      return DataModel.getQuestion(question).active;
    }

    function prepareData() {
      DataModel.fetchData()
    }

    function resetData() {
      DataModel.resetData();
    }

    function setCategory(category) {
      generator.currentCategory = category;
    }

    function startSession() {
      if(DataModel.questionCount()) {
        $state.go("creator")
      }
      else {
        generator.errorFlag = true;
      }
    }

}

function generateAuthCheck(Auth) {
   return Auth.$requireAuth();
}
