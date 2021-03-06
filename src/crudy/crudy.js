(function() {

  // TODO: oddzielic funkcjonalnosc zwiazana z przechowywaniem info od funkcji interfejsu
  // TODO: przekazywac do modali currentCategory/Question, pamietac o zerowaniu tych wartosci koniecznie bo inaczej kapa


  angular
    .module("interviewApp")
    .config(CrudyConfig)
    .controller("CrudyCtrl", CrudyController)
    .filter("byName", nameFilter)
    .filter("byCategory", categoryFilter)

   CrudyController.$inject = ["CrudyModel", "DataModel"];
   CrudyConfig.$inject = ['$stateProvider'];
   checkData.$inject = ["DataModel"];
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
        controller: "CrudyCtrl",
        controllerAs: "crudy",
        resolve: {
          "CurrentUser": checkAuth,
          "userData": checkData
        }
      })
        .state("crudy.categories", {
          url: "/categories",
          templateUrl: "crudy/listViews/categories/crudy.categories.html",
          controller: "categoriesCtrl",
          controllerAs: "catCtrl"
        })
        .state("crudy.questions", {
          url:"/questions",
          templateUrl: "crudy/listViews/questions/crudy.questions.html",
          controller: "questionsCtrl",
          controllerAs: "queCtrl"
        })
  }

  function checkAuth(Auth) {
    return Auth.$requireAuth();
  }

  function checkData(DataModel) {
    return DataModel.UserData !== null;
  }


  function CrudyController(CrudyModel, DataModel) {

    var crudy = this;

    crudy.finishSession = finishSession;

    function finishSession() {
      CrudyModel.sendStuff();
      $state.go("generate");
    }

  }

})();
