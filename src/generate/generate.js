'use strict';

angular
  .module('interviewApp')
  .config('generateConfig', generateConfig)
  .controller('GenerateCtrl', GenerateController );

generateConfig.$inject = ['$stateProvider'];
GenerateController.$inject = ['UserModel','DataModel','requestCategoriesService', "requestQuestionsService", "requestUser" , '$stateProvider'];
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

function GenerateController(UserModel, DataModel,requestCategoriesService, requestQuestionsService ,requestUser,$state) {

  var generator = this;

  generator.currentCategory = null;
  generator.errorFlag = false;


    function prepareData() {
      generator.data = requestUser.get({user: UserModel.getCurrentUser()})
    }

    generator.setCategory = function(category) {
      generator.currentCategory = category;
    }

    generator.getCategory = function() {
      return generator.currentCategory;
    }

    generator.appendQuestion = function(question) {
      DataModel.appendQuestion(question)
    }

    generator.resetData = function() {
      DataModel.resetData();
    }

    generator.isPicked = function(question) {
      return DataModel.isPickedQuestion(question)
    }

    generator.startSession = function() {
      if(DataModel.questionCount()) {
        $state.go("creator")
      }
      else {
        // TODO: jesli flaga na true, ustaw ng-messege pod przyciskiem done
        generator.errorFlag = true;
      }
    }

    return {
      setCategory: setCategory,
      getCategory: getCategory,
      appendQuestion: appendQuestion,
      resetData: resetData,
      isPicked: isPicked
    }
}

function generateAuthCheck(Auth) {
   return Auth.$requireAuth();
}
