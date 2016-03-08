(function() {

  "use strict";

  angular
    .module("interviewApp")
    .controller("CategoryModalCtrl", CategoryController);

  CategoryController.$inject = ["DataModel"]

  function CategoryController() {

      var categoryModal = this;

      categoryModal.addCategory = function(isValid) {
        if(isValid) {
          // TODO: Jesli nie podam parametru questions, request bedzie mial forme user/questions?

        }
      }


      // TODO: do tablicy DataModel.pickedCategories dodawac nowe obiekty, majace key: ID edytowanej kategorii oraz value: nazwa kategorii po edycji, \
      // tak zeby potem mozna sprwdzac otrzymane z firebase kategorie z kategoriami, ktore ulegly edycji
      categoryModal.editResource = function() {
        if(categoryModal.isEditingCategory) {

        }
        else if(categoryModal.isEditingQuestion) {

        }
      }

  }

})();
