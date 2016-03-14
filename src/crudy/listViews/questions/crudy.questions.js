angular
  .module("interviewApp")
  .controller("questionsCtrl", questionsController)

questionsController.$inject = ["CrudyModel", "mgcrea.ngStrap"];

function questionsController(CrudyModel, $modal) {

  var queCtrl = this;

  queCtrl.addQuestion = addQuestion;
  queCtrl.editQuestion = editQuestion;

  function addQuestion() {
    showCategoryModal();
  }

  function editQuestion(question) {
    CrudyModel.setCurrentQuestion(question);
    showQuestionModal();
  }

  function deleteQuestion(question) {
    CrudyModel.deleteResource(question)
  }

  function showQuestionModal() {
    QuestionModal.$promise.then(QuestionModal.show);
  };

  function hideQuestionModal() {
    QuestionModal.$promise.then(QuestionModal.hide);
  };


  queCtrl.QuestionModal = $modal({
      show: true,
      templateUrl: "src/crudy/modals/question/question.html",
      controller: "CategoryModalCtrl",
      controllerAs: "categoryModal",
      locals: {
        "CrudyModel": CrudyModel,
        "possibleCategories": DataModel.userData['userCategories']
      }
  })

}
