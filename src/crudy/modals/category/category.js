(function() {

  "use strict";

  angular
    .module("interviewApp")
    .controller("CategoryModalCtrl", CategoryController);

  CategoryController.$inject = ["CrudyModel"]

  function CategoryController(CrudyModel) {

      var categoryModal = this;

      categoryModal.formCategory = {
        description: ''
      }

      // dodaj do tablicy
      function resetForm() {
        categoryModal.formCategory.description = ''
      }

      //  TODO: jesli stateFlag, zainicjuj forma wlasciwosciami przekazanego pytania
      function initForm() {
        if(CurrentCategory) {
          categoryModal.formQuestion.description = currentQuestion.description;
        }
      }

      categoryModal.finish = function(isValid) {
        if(isValid && CrudyModel.currentCategory) {
          CrudyModel.markAsEdited(categoryModal.formCategory)
        }
        else if(isValid && !CrudyModel.CurrentCategory) {
          CrudyModel.appendResource(categoryModal.formCategory);
        }
        resetForm();
      }

      InitForm();


      return {
        finish: finish
      }

  }

})();
