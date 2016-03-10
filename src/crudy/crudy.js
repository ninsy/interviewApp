(function() {

  // TODO: oddzielic funkcjonalnosc zwiazana z przechowywaniem info od funkcji interfejsu
  // TODO: przekazywac do modali currentCategory/Question, pamietac o zerowaniu tych wartosci koniecznie bo inaczej kapa


  angular
    .module("interviewApp")
    .config("CrudyConfig", CrudyConfig)
    .controller("CrudyCtrl", CrudyController)
    .filter("byName", nameFilter)
    .filter("byCategory", categoryFilter)

   CrudyController.$inject = ["CrudyModel", "DataModel", "UserModel", "requestCategoriesService", "requestQuestionsService", "mgcrea.ngStrap"];
   CrudyConfig.$inject = ['$stateProvider', "DataModel"];
   checkData.$inject = ["UserModel"];
   checkAuth.$inject = ['Auth'];

  function nameFilter() {
      return function(input, chars) {
        if(!chars.match(/^\w+$/) || chars.length === 0){
          return input
        }
        return input.substr(0, chars.length) === chars.trim().toLowerCase();
      }
  }

  function categoryFilter() {
    return function(input, category) {

      var toReturn = [];

      angular.forEach(input, function(question) {
        for(reference in question.selfCategories) {
            if(category === reference) {
              toReturn.push(question);
              break;
            }
        }
      });
      return toReturn;
    }
  }

  function CrudyConfig($stateProvider) {

    $stateProvider
      .state("crudy", {
        url: "/crudy",
        templateUrl: "crudy/crudy.html",
        controller: "CrudyController",
        controllerAs: "crudy",
        resolve: {
          "CurrentUser": checkAuth,
          "UserData": checkData
        }
      })
  }

  function checkAuth(Auth) {
    return Auth.$requireAuth();
  }

  function checkData(DataModel) {
    return DataModel.UserData !== null;
  }


  function CrudyController(CrudyModel, DataModel, UserModel, requestCategoriesService, requestQuestionsService, $modal) {

    var crudy = this;

    crudy.displayCategories = false;
    crudy.displayQuestions = true;

    crudy.toggleView = function() {
      if(crudy.displayCategories) {
        crudy.displayCategories = false;
        crudy.displayQuestions = true;
      }
      else {
        crudy.displayCategories = true;
        crudy.displayQuestions = false;
      }
    }

    crudy.QuestionModal = $modal({
        show: true,
        templateUrl: "src/crudy/modals/question/question.html",
        controller: "CategoryModalCtrl",
        controllerAs: "categoryModal",
        locals: {
          "CrudyModel": CrudyModel,
          "possibleCategories": DataModel.userData['userCategories']
        }
    })

    crudy.CategoryModal = $modal({
        show: true,
        templateUrl: "src/crudy/modals/category/category.html",
        controller: "QuestionModalCtrl",
        controllerAs: "questionModal",
        locals: {
          "CrudyModel": CrudyModel
        }
    })

    crudy.addQuestion = function() {
      showCategoryModal();
    }

    crudy.editQuestion = function(question) {
      CrudyModel.setCurrentQuestion(question);
      showCategoryModal();
    }

    function showCategoryModal() {
      CategoryModal.$promise.then(CategoryModal.show);
    };

    function hideCategoryModal() {
      CategoryModal.$promise.then(CategoryModal.hide);
    };

    crudy.showQuestionModal = function() {
      QuestionModal.$promise.then(QuestionModal.show);
    };

    crudy.hideQuestionModal = function() {
      QuestionModal.$promise.then(QuestionModal.hide);
    };


    crudy.finishSession = function() {

      CrudyModel.sendStuff();
      $state.go("generate");
    }

    return crudy;

  }

})();
