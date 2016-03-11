(function() {

  "use strict";

  // TODO: dont use pickedQuestions/Categories for both crudy and session operations

  angular
  .module("interview.components")
  .factory('CrudyModel', CrudyModel)

  CrudyModel.$inject = ["DataModel", "UserModel", "requestQuestionsService", "requestCategoriesService"];

  function CrudyModel(DataModel, UserModel, requestQuestionsService, requestCategoriesService ) {

    var data = {
      sendStuff: sendStuff,
      appendResource: appendResource,
      markAsEdited: markAsEdited,
      setCurrentCategory: setCurrentCategory,
      setCurrentQuestion: setCurrentQuestion
    },
    currentCategory = null,
    currentQuestion = null,
    newResources = [],
    accessedQuestions = [],
    accessedCategories = [],
    editedQuestions = [],
    editedCategories = [];

    return data;

    function sendStuff() {
      postResources();
      checkForChanges();
      updateResources();
      resetData();
    }

    function resetData() {
      setCurrentCategory(null);
      setCurrentQuestion(null);
      newResources.length = 0;
      accessedQuestions.length = 0;
      accessedCategories.length = 0;
      editedQuestions.length = 0;
      editedCategories.length = 0;
    }

    function deleteResource(resource) {
      if(resource.hasOwnProperty("selfCategories")) {
        requestQuestionsService.delete({userID: UserModel.getCurrentUser, questionID: resource["id"]})
      }
      else  {
        requestCategoriesService.delete({userID: UserModel.getCurrentUser, categoryID: resource["id"]})
      }
    }

    function postResources() {
      newResources.forEach(function(newRes) {
        if(newRes.hasOwnProperty("selfCategories")) {
          requestQuestionsService.save({userID: UserModel.getCurrentUser}, newRes);
        }
        else {
          requestCategoriesService.save({userID: UserModel.getCurrentUser}, newRes);
        }
      })
    }

    function updateResources() {
      if(editedCategories.length > 0) {
        editedCategories.forEach(function(changedCat) {
          requestCategoriesService.updateCategory({user: UserModel.getCurrentUser, categoryID: changedCat["id"]}, changedCat["data"]);
        });
      }
      if(editedQuestions.length > 0) {
        editedQuestions.forEach(function(changedQ) {
          requestQuestionsService.updateQuestion({user: UserModel.getCurrentUser, questionID: changedQ['id']}, changedQ["data"]);
        });
      }
    }

    function checkForChanges() {
      if(accessedCategories.length > 0) {
        iterateThrough(UserModel.UserData["userCategories"], accessedCategories)
      }
      if(accessedQuestions.length > 0) {
        iterateThrough(UserModel.UserData["userQuestions"], accessedQuestions)
      }
    }

    function compareItems(uItemId, aItemId, uItem, aItem) {
      if(uItemId === aItemId) {
        if(_.isEqual(uItem, aItem) === false) {
          return true
        }
      }
      return false;
    }

    // TODO: POWINNO POPRAWNIE WRZUCAC DO TABLICY OBJEKTY, Z JEDNYM PROPERTY (idPytania), KTOREGO WARTOSCIA JEST ODPOWIADAJACY OBIEKT PYTANIA
    //       CHODZI O TO_BE_PUSHED
    function iterateThrough(userStuff, accessedStuff) {

      _.forEach(accessedStuff, function(userItemId, userItem) {
        _.forEach(userStuff, function(accessedItemId, accessedItem) {

          if(compareItems(userItemId, accessedItemId, userItem , accessedItem)) {

            var toBePushed = {
              id: accessedItemId,
              data: accessedItem
            };

            if(accessedItem.hasOwnProperty("selfCategories")) {
              editedQuestions.push(toBePushed);
            }
            else {
              editedCategories.push(toBePushed);
            }
            return;
          }

        });
      });
    }

    // TODO: Po wprowadzeniu preParsingu, teraz powinno mozna tak bez problemu zrobic.
    function setCurrentCategory(cat) {
      // currentCategory["id"] = Object.keys(cat)[0];
      // currentCategory["data"] = cat;
      currentCategory = angular.copy(cat)
    }

    // TODO: Kluczem jest ID, sprawdzic, czy poprawnie przypisywane
    function setCurrentQuestion(q) {
    //   currentQuestion["id"] = Object.keys(q)[0];
    //   currentQuestion["data"] = q;
    }

    function appendResource(resource) {
      if(resource.hasOwnProperty("selfCategories")) {
        resource["recentlyHasBeen"] = 1;
        resource["sessionsAgo"] = 0;
      }
      newResources.push(resource);
    }

    function markAsEdited(resource) {

      var toBePushed = { };

      if(resource.hasOwnProperty("selfCategories")) {
        toBePushed["id"] = currentQuestion["id"];
      }
      else  {
        toBePushed["id"] = currentCategory["id"];
      }
      toBePushed["data"] = resource["data"];
      accessedQuestions.push(resource);
      setCurrentQuestion(null);
    }

  }

})();
