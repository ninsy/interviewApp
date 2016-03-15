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
        'currentUser': generateAuthCheck,
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
  generator.appendQuestion = appendQuestion;
  generator.isPicked = isPicked;

  generator.stuff = {}; // COPIED DATA MEANT FOR UI REASONS

    prepareData();


    function appendQuestion(question) {
      DataModel.appendQuestion(question)
    }

    function isPicked(question) {
      return DataModel.getQuestion(question).active;
    }

    function getCategory() {
      return generator.currentCategory
    }

    function prepareData() {
       DataModel.fetchData()
        .then(function(parsedData) {
          generator.stuff['categories'] = parsedData.cats;
          generator.stuff['questions'] = parsedData.questions;
        })
    }

    function resetData() {
      DataModel.resetData();
    }

    function setCategory(catID) {
      console.log(catID);
      generator.currentCategory = catID;
    }

    function startSession() {
      if(DataModel.questionCount()) {
        $state.go("summary")
      }
    }

    function toggleActivity(question) {
      console.log(question)
      if(question.marked) {
         question.marked = false;
         DataModel.detachQuestion(question);
      }
      else {
        question.marked = true;
        DataModel.appendQuestion(question);
      }
    }

}

function generateAuthCheck(Auth) {
   return Auth.$requireAuth();
}
