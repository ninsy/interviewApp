'use strict';

angular
  .module("interviewApp")
  .config(summaryConfig)
  .controller("SummaryCtrl", summaryController);

summaryConfig.$inject = ['$stateProvider'];
summaryController.$inject = ["UserModel", 'DataModel', "requestQuestionsService", "QUESTIONS_CONST"];
summaryAuthCheck.$inject = ['Auth'];
checkPickedAmount.$inject = ['DataModel']

function summaryConfig($stateProvider) {
  $stateProvider
    .state("summary", {
      url: "/summary",
      templateUrl: "summary/summary.html",
      controller: "SummaryCtrl",
      controllerAs: "summary",
      resolve: {
        'currentUser': summaryAuthCheck,
      }
    })
}

function checkPickedAmount(DataModel) {
  return DataModel.questionCount() > 0;
}

function summaryController(UserModel,  DataModel, requestQuestionsService, QUESTIONS_CONST) {

  var summary = this;

  summary.filterQuestions = filterQuestions;
  summary.finishSession = finishSession;
  summary.updateState = updateState;

  summary.chosenCategories = [];

  filterCategories();

  function filterQuestions() {
    return _.filter(DataModel.pickedQuestions, function(q) {
      return q.marked;
    })
  }

  function filterCategories() {

    console.log("picked: " + DataModel.getPicked());
    console.log("len: " + DataModel.questionCount())

       _.forEach(DataModel.getPicked(), function(q) {
          var currentQselfCats = q.data['selfCategories'];
          console.log("Now on : " + q.id);
          for(var singleSelfCat in currentQselfCats) {
            console.log(singleSelfCat + " " + currentQselfCats[singleSelfCat] );
            // summary.chosenCategories.push();
          }
    })

    console.log("Chosen cats: " + summary.chosenCategories);

    var categoryNames = Object.keys(summary.chosenCategories).sort();
    console.log(categoryNames);


  }

    // TODO: TUTAJ MUSI BYC PROMISE, INACZEJ DOSZLOBY DO SYTUACJI, GDZIE REQUESTY BYLYBY WYKONYWANE, A STATE JUZ ZMIENILBY SIE NA GENERATE
  function finishSession() {

    var filtered = filterQuestions(),
      questionCount = 0,
      reqCount = filtered.length;

    updateState(filtered);

    if(questionCount === reqCount) {
      $state.go("generate");
    }
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

function summaryAuthCheck(Auth) {
  return Auth.$requireAuth();
}
