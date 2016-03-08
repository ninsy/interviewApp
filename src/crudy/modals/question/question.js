(function() {

  "use strict";

  angular
    .module("interviewApp")
    .controller("QuestionModalCtrl", QuestionController);

  QuestionController.$inject = ["requestQuestionsService", "DataModel", "currentQuestion"]

  function QuestionController(requestQuestionsService, DataModel, currentQuestion) {

      var questionModal = this;


      questionModal.panels = [];

      questionModal.selectedIcons = [];
      questionModal.icons = [];

      function initIcons() {
        DataModel.userData["userCategories"].forEach(function(userCat) {
          questionModal.icons.push(userCat);
        })
      }

      initIcons();

      return {

      }

  }

})();
