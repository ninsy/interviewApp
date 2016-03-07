(function() {

  "use strict";

  angular
    .module("interviewApp")
    .controller("QuestionModalCtrl", QuestionController);

  QuestionController.$inject = ["requestQuestionsService", "DataModel", "currentQuestion"]

  function QuestionController(requestQuestionsService, DataModel, currentQuestion) {

      var questionModal = this;

      questionModal.dropdown = [];
      questionModal.panels = [];

      function DropdownItem(active, text, click) {
        this.active = active;
        this.text = text ? text : "Empty item";
        this.click = click;
      }

      function initDropdown() {

        for(category in DataModel.userData["userCategories"]) {


          // TODO: Could use select insead.
          var ddItem = new DropdownItem(false, category.name, function() {

            if(category.name in question.questionForm.categories) {
              questionModal.questionForm.categories[category] = true;
              this.active = true;
            }
            else {
              questionModal.questionForm.categories[category] = false;
              this.active = false;
            }
          });

          questionModal.dropdown.push(ddItem);
        }

      }

      questionModal.createQuestion = function(isValid) {
        if(isValid) {
          // TODO: Jesli nie podam parametru questions, request bedzie mial forme user/questions?
          requestQuestionsService.save({user: User.getCurrentUser}, questionModal.newQuestionForm);
        }
      }


      questionModal.editQuestion = function() {
        if(questionModal.isEditingCategory) {

        }
        else if(questionModal.isEditingQuestion) {

        }
      }

      initDropdown();

      return {

      }

  }

})();
