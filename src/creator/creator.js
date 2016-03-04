'use strict';

angular
  .module("interviewApp")
  .config('creatorConfig', creatorConfig)
  .controller("CreatorCtrl", creatorController);

creatorConfig.$inject = ['$stateProvider'];
creatorController.$inject = ["UserModel", 'DataModel', "requestQuestionsService", "QUESTIONS_CONST"];
creatorAuthCheck.$inject = ['Auth'];

function creatorConfig($stateProvider) {
  $stateProvider
    .state("creator", {
      url: "/creator",
      templateUrl: "/creator/creator.html",
      controller: "CreatorCtrl",
      controllerAs: "creator",
      resolve: {
        'currentUser': creatorAuthCheck
      }
    })
    .state("crudy", {
      url:"/creator/crudy",
      templateUrl: "/creator/crudy/crudy.html",
      controller: "CrudyCtrl",
      controllerAs: "crudy",
      resolve: {
        "currentUser": creatorAuthCheck,
        'pickedQuestions': checkLength
      }
    })
}

function creatorController(UserModel,  DataModel, requestQuestionsService, QUESTIONS_CONST) {

  var creator = this;

  creator.isEditing = false;
  creator.isCreating = false;

  creator.markAsAsked = function(question) {

    
    // when clicked markAsAsked - disable its button to markAsAsked
    // possible redundancy
    var markedQuestion = DataModel.getQuestion(question);
    markedQuestion.recentlyHasBeen = Math.min(markedQuestion.sessionsAgo * QUESTIONS_CONST, 1);
    if(markedQuestion.recentlyHasBeen !== 1) {
      markedQuestion.sessionsAgo += 1;
    }
    else {
      markedQuestion.sessionsAgo = 0;
    }
    requestQuestionsService.updateQuestion({user: UserModel.getCurrentUser(), question: markedQuestion }, markedQuestion);
  }

  creator.startEditing = function(question) {

  }

  creator.finishSession = function() {
    // TODO: for each question in picked ones, update its state
  }
}

function checkLength(DataModel) {
  if(!DataModel.questionCount()) {
    return "NO_QUESTIONS";
  }
}

function authCheck(Auth) {
  return Auth.$requireAuth();
}
