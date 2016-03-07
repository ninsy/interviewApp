(function() {

  angular
    .module("interviewApp")
    .controller("CrudyCtrl", CrudyController)
    .filter("byName", nameFilter)
    .filter("byCategory", categoryFilter)

   CrudyController.$inject = ["$scope", "DataModel","UserModel", "mgcrea.ngStrap"];

  function nameFilter() {
      return function(input, chars) {
        if(!chars.match(/^\w+$/) || !chars.length){
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

      })
      return toReturn;
    }
  }

  function CrudyController($scope, DataModel, UserModel, $modal) {

    var crudy = $scope;

    crudy.currentCategory = null;
    crudy.currentQuestion = null;

    crudy.setCurrentCategory = function(cat) {
      crudy.currentCategory = cat;
    }

    crudy.setCurrentQuestion = function(q) {
      crudy.currentQuestion = q;
    }

    crudy.QuestionModal = $modal({
        show: true,
        template: "./modals/question/question.html",
        controller: "CategoryModalCtrl",
        controllerAs: "categoryModal",
        locals: {
          "currentQuestion": crudy.currentQuestion
        }
    })

    crudy.CategoryModal = $modal({
        show: true,
        template: "./modals/category/category.html",
        controller: "QuestionModalCtrl",
        controllerAs: "questionModal",
        locals: {
          "currentCategory": crudy.currentCategory
        }
    })


    crudy.showCategoryModal = function() {
      CategoryModal.$promise.then(CategoryModal.show);
    };

    crudy.hideCategoryModal = function() {
      CategoryModal.$promise.then(CategoryModal.hide);
    };

    crudy.showQuestionModal = function() {
      QuestionModal.$promise.then(QuestionModal.show);
    };

    crudy.hideQuestionModal = function() {
      QuestionModal.$promise.then(QuestionModal.hide);
    };

    crudy.deleteResource = function(resource) {

    }


    crudy.finishEditing = function() {
      var changedQuestions = [];
      var changedCategories = [];
      // TODO: Dla kontrollera crudy, tablica picked questions zawiera pytania, ktore ulegly edycji,
      //       wtedy mozna porownac to samo pytanie w tablicy userQuestions z pytaniem pickedQuestions,
      //       jesli sie roznia, to wloz to tablicy changedQuestions, ktora zostanie potem przeslana do firebase
      if(DataModel.pickedQuestions) {
        for(pickedQuestion in DataModel.pickedQuestions) {

        }
      }

    }

    return {

    }

  }

})();
