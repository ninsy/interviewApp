'use strict';

angular
  .module("interviewApp")
  .config('summaryConfig', creatorConfig)
  .controller("SummaryCtrl", creatorController);

creatorConfig.$inject = ['$stateProvider'];
creatorController.$inject = ["UserModel", 'DataModel', "requestQuestionsService", "QUESTIONS_CONST"];
creatorAuthCheck.$inject = ['Auth'];

function creatorConfig($stateProvider) {
  $stateProvider
    .state("creator", {
      url: "/creator",
      templateUrl: "/creator/creator.html",
      controller: "SummaryCtrl",
      controllerAs: "summary",
      resolve: {
        'currentUser': creatorAuthCheck
      }
    })
}

function creatorController(UserModel,  DataModel, requestQuestionsService, QUESTIONS_CONST) {

  var summary = this;

  summary.filterQuestions = filterQuestions;
  summary.finishSession = finishSession;
  summary.markAsAsked = markAsAsked;
  summary.updateState = updateState;


  function filterQuestions() {
    return _.filter(DataModel.pickedQuestions, function(q) {
      return q.marked;
    })
  }

    // TODO: TUTAJ MUSI BYC PROMISE, INACZEJ DOSZLOBY DO SYTUACJI, GDZIE REQUESTY BYLYBY WYKONYWANE, A STATE JUZ ZMIENILBY SIE NA GENERATE
  function finishSession() {

    var filtered = filterQuestions(),
      questionCount = 0,s
      reqCount = filtered.length;

    updateState(filtered);
    if(questionCount === reqCount) {
      $state.go("/generate");
    }

  }

  function markAsAsked(question) {
    DataModel.getQuestion(question)
  }

  function updateState(markedQuestions) {

    markedQuestions.forEach(function(markedQ) {

      markedQ.recentlyHasBeen = Math.min(markedQ.sessionsAgo * QUESTIONS_CONST, 1);
      if(markedQ.recentlyHasBeen !== 1) {
        markedQ.sessionsAgo += 1;
      }
      else {
        markedQ.sessionsAgo = 0;
      }
      var req = requestQuestionsService.updateQuestion({user: UserModel.getCurrentUser(), questionID: markedQ["id"] }, markedQ["data"]);
      req.$promise
        .catch(function(error) {
          console.error(error.message);
        })
        .finally(function() {
          questionCount++;
        });

    });
  }

}

function authCheck(Auth) {
  return Auth.$requireAuth();
}
