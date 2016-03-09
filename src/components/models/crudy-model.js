

(function() {

  "use strict";

  // TODO: dont use pickedQuestions/Categories for both crudy and session operations

  angular
  .module("interview.components")
  .factory('CrudyModel', CrudyModel)

  CrudyModel.$inject = ["DataModel", "UserModel", "requestQuestionsService", "requestCategoriesService"];

  function CrudyModel(DataModel, UserModel, requestQuestionsService, requestCategoriesService ) {

    var data = {

    },
    currentCategory = null,
    currentQuestion = null,
    newResources = [],
    accessedResourced = []; // tablica dla rzeczy, ktore zostaly poddane edycji, ale

    return data;

    function sendCategories() {
        var changedCategories = [],
          userCats = UserModel.UserData["userCategories"];

        DataModel.pickedCategories.forEach(function(pickedCat) {
          for(catId in userCats) {
            if(catId === pickedCat.id && userCats[catId] == pickedCat.name) {
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

    // SPRAWDZIC POPRAWNOSC DZIALANIA
    // CHECK FOR DIFFERENCES MOZNA SPROBOWAC UZYC NA KAZDYM STOPNIU, EW WYWOLAC REKURSYWNIE
    function checkDifferences(userCats, editedCats) {

      var greater = null, lesser = null, userCatsLen, editedCatsLen;

      if(Object.prototype.toString.call(userCats) === '[object Array]') {
        userCatsLen = userCats.length;
        editedCatsLen = editedCats.length;
      }
      else if(Object.prototype.toString.call(userCats) === "[object Object]") {
        userCatsLen = Object.keys(userCats).length;
        editedCatsLen = Object.keys(editedCats).length;
      }
      else throw new Error('Wrong type passed');

      if(editedCatsLen >= userCatsLen) {
        greater = editedCats;
        lesser = userCats
      }
      else {
        greater = userCats;
        lesser = editedCats;
      }

      Array.prototype.forEach.call(greater, function(el, i) {
        if(el !== lesser[i]) return false;
      })
      return true;
    }

    function iterateThrough(userQuestions) {

      userQuestions.forEach(function(el, i) {
        accessedResourced
      })
    }

    function sendQuestions() {

      // TODO: ULTRA WAZNE!!!
      // Dodatkowo funcka iterateThrough, ktora przeleci po kazdym potencjalnie zmienionym pytaniu,
      // dla kazdego tego pytania sprawdzi czy sa roznice funkcja checkDifferences

      var userQuestions = UserModel.UserData["userQuestions"],
        changedQuestions = [];

                if(pickedQ[prop] !== qId[prop]) {
                  changedQuestions.push(pickedQ);
                  //break;
                }


        if(changedQuestions.length > 0) {
            changedQuestions.forEach(function(changedQ) {
              requestQuestionsService.updateQuestion({user: UserModel.getCurrentUser, question: changedQ.id});
            });
        }
    }

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

    crudy.setCurrentCategory = function(cat) {
      crudy.currentCategory = cat;
    }

    crudy.setCurrentQuestion = function(q) {
      crudy.currentQuestion = q;
    }

    crudy.appendResource = function(resource) {
      crudy.newResources.push(resource);
    }

    crudy.markAsEdited = function(resource) {
      if(resource.hasOwnProperty("selfCategories")) {
        DataModel.pickedQuestions.push(resource);
      }
      else  {
        DataModel.pickedCategories.push(resource);
      }
    }

  }

})();
