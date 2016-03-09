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
    return DataModel.UserData !== null && DataModel.pickedQuestions.length === 0 &&DataModel.pickedCategories.length === 0;
  }

  function sendCategories() {
      var changedCategories = [],
        userCats = UserModel.UserData["userCategories"];

      DataModel.pickedCategories.forEach(function(pickedCat) {
        for(catId in userCats) {
          if(catId === pickedCat.id && userCats[catId] === pickedCat.name) {
            changedCategories.push(pickedCat);
            break;
          }
        }
      });

      if(changedCategories.length > 0) {
          changedCategories.forEach(function(changedCat) {
            requestCategoriesService.updateCategory({user: UserModel.getCurrentUser, category: changedCat.id});
          });
      }
  }

  function sendQuestions() {

    var changedQuestions = [],
      userQuestions = UserModel.UserData["userQuestions"];

s

      if(changedQuestions.length > 0) {
          changedQuestions.forEach(function(changedQ) {
            requestQuestionsService.updateQuestion({user: UserModel.getCurrentUser, question: changedQ.id});
          });
      }
  }

    // TODO: Proste sprawdzenie po property - wczesniej koncept z enkapsulacja w innym obiekcie, ktory bylby oznaczony, ze jest kategoria/pytaniem
  function createResources() {
    crudy.newResources.forEach(function(newRes) {
      if(newRes.hasOwnProperty("selfCategories")) {
        requestQuestionsService.save({userID: UserModel.getCurrentUser, questionID: newRes.id}, newRes);
      }
      else {
        requestCategoriesService.save({userID: UserModel.getCurrentUser, categoryID: newRes.id}, newRes);
      }
    })
  }

  function CrudyController(CrudyModel, DataModel, UserModel, requestCategoriesService, requestQuestionsService, $modal) {

    var crudy = this;


    crudy.setCurrentCategory = function(cat) {
      crudy.currentCategory = cat;
    }

    crudy.setCurrentQuestion = function(q) {
      crudy.currentQuestion = q;
    }

    crudy.appendResource = function(resource) {
      crudy.newResources.push(resource);
    }

    // TODO: Proste sprawdzenie po property - wczesniej koncept z enkapsulacja w innym obiekcie, ktory bylby oznaczony, ze jest kategoria/pytaniem
    crudy.markAsEdited = function(resource) {
      if(resource.hasOwnProperty("selfCategories")) {
        DataModel.pickedQuestions.push(resource);
      }
      else  {
        DataModel.pickedCategories.push(resource);
      }
    }

    crudy.QuestionModal = $modal({
        show: true,
        templateUrl: "src/crudy/modals/question/question.html",
        controller: "CategoryModalCtrl",
        controllerAs: "categoryModal",
        locals: {
          "appendResource": crudy.appendResource,
          "markAsEdited": crudy.markAsEdited,
          "currentQuestion": crudy.currentQuestion,
          "possibleCategories": DataModel.userData['userCategories']
        }
    })

    crudy.CategoryModal = $modal({
        show: true,
        templateUrl: "src/crudy/modals/category/category.html",
        controller: "QuestionModalCtrl",
        controllerAs: "questionModal",
        locals: {
          "appendResource": crudy.appendResource,
          "markAsEdited": crudy.markAsEdited,
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


    // TODO: wywolywane jest tutaj, nie w finishSession, nie wymaga wywolywania okna modalnego, wiec nacisniecie powoduje odrazu wywolanie requesta
    crudy.deleteResource = function(resource) {
      if(resource.hasOwnProperty("selfCategories")) {
        requestQuestionsService.delete({userID: UserModel.getCurrentUser, questionID: resource})
      }
      else  {
        requestCategoriesService.delete({userID: UserModel.getCurrentUser, categoryID: resource})
      }
    }


    crudy.finishSession = function() {

      // TODO: Dla kontrollera crudy, tablica picked questions zawiera pytania, ktore ulegly edycji,
      //       wtedy mozna porownac to samo pytanie w tablicy userQuestions z pytaniem pickedQuestions,
      //       jesli sie roznia, to wloz to tablicy changedQuestions, ktora zostanie potem przeslana do firebase
      if(crudy.newResources.length > 0) createResources();
      if(DataModel.pickedCategories.length > 0) sendCategories();
      if(DataModel.pickedQuestions.length > 0) sendQuestions();
      DataModel.resetData();
      crudy.currentCategory = null;
      crudy.currentQuestion = null;
      $state.go("generate");
    }

    return crudy;
    // return {
    //   // finishSession: finishSession,
    //   // deleteResource: deleteResource,
    //   // showCategoryModal: showCategoryModal,
    //   // showQuestionModal: showQuestionModal,
    //   // setCurrentQuestion: setCurrentQuestion,
    //   // setCurrentCategory: setCurrentCategory
    // }

  }

})();
