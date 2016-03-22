'use strict';

angular
  .module('interviewApp')
  .config(generateConfig)
  .controller('GenerateCtrl', GenerateController )
  .filter('categoryFilter', categoryFilter)

generateConfig.$inject = ['$stateProvider'];
GenerateController.$inject = ['UserModel','DataModel', "$state"];
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

function categoryFilter() {

  return function(questions, categoryID) {

    var toReturn = [];

    _.forEach(questions, function(question, key) {
      _.forEach(question['data'].selfCategories, function(state, id) {
        if(state && id === categoryID) {
          toReturn.push(question);
        }
      });
    });

    return toReturn;
  }
}

function GenerateController(UserModel, DataModel,$state) {

  var generator = this;

  generator.currentCategory = null;

  generator.startSession = startSession;
  generator.toggleActivity = toggleActivity;
  generator.setCategory = setCategory;
  generator.getCategory = getCategory;
  generator.resetData = resetData;

  generator.stuff = {}; // COPIED DATA MEANT FOR UI REASONS

    prepareData();


    function getCategory() {
      return generator.currentCategory
    }

    function prepareData(flag) {
        DataModel.fetchData()
        .then(function(parsedData) {
          generator.stuff['categories'] = parsedData.cats;
          generator.stuff['questions'] = parsedData.questions;
        })
    }

    function resetData() {
      DataModel.resetData('RESET_QUESTIONS');
    }

    function setCategory(catID) {
      generator.currentCategory = catID;
    }

    function startSession() {
      if(DataModel.questionCount()) {
        console.log("Len: " + DataModel.questionCount());
        DataModel.resetData("STATE_CHANGE");
        $state.go("summary")
      }
    }

    function toggleActivity(question) {
      console.log("gonna enter " + question.data.description);
      if(question.marked === true) {
         DataModel.detachQuestion(question);
      }
      else if(question.marked === false) {
        DataModel.appendQuestion(question);
      }
        console.log("picked: " + DataModel.getPicked())
    }

}

function generateAuthCheck(Auth) {
   return Auth.$requireAuth();
}
