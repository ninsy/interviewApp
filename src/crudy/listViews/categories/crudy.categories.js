angular
  .module("interviewApp")
  .controller("categoriesCtrl", questionsController)

questionsController.$inject = ["CrudyModel"];

function questionsController(CrudyModel) {

  var catCtrl = this;

  catCtrl.showCategoryModal = showCategoryModal;
  catCtrl.hideCategoryModal = hideCategoryModal;

  function addCategory() {
    showCategoryModal();
  }

  function editCategory(question) {
    CrudyModel.setCurrentQuestion(question);
    showCategoryModal();
  }

  function showCategoryModal() {
    CategoryModal.$promise.then(CategoryModal.show);
  };

  function hideCategoryModal() {
    CategoryModal.$promise.then(CategoryModal.hide);
  };


  catCtrl.CategoryModal = $modal({
      show: true,
      templateUrl: "src/crudy/modals/category/category.html",
      controller: "QuestionModalCtrl",
      controllerAs: "questionModal",
      locals: {
        "CrudyModel": CrudyModel
      }
  })

}
