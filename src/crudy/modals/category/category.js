(function() {

  "use strict";

  angular
    .module("interviewApp")
    .controller("CategoryModalCtrl", CategoryController);

  CategoryController.$inject = ["requestCategoriesService, DataModel"]

  function CategoryController() {

      var categoryModal = this;

      categoryModal.createResource = function(isValid) {
        if(isValid) {
          // TODO: Jesli nie podam parametru questions, request bedzie mial forme user/questions?
          requestQuestionsService.save({user: User.getCurrentUser}, categoryModal.newQuestionForm);
        }
      }


      categoryModal.editResource = function() {
        if(categoryModal.isEditingCategory) {

        }
        else if(categoryModal.isEditingQuestion) {

        }
      }

  }

})();
