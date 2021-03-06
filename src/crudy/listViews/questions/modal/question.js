(function() {

  "use strict";

  angular
    .module("interviewApp")
    .controller("QuestionModalCtrl", QuestionController);

  QuestionController.$inject = ["CrudyModel", "possibleCategories"]

  function QuestionController(CrudyModel, possibleCategories) {

      var questionModal = this;

      // TODO: Tablice z AKTYWNYMI opcjami/kategoriami, sam obiekt przesylany przez request
      // TODO: do currentQuestion - dowiazac informacje z tego forma
      questionModal.formQuestion = {
          description: "",
          selfCategories: [],
          options: [],
        };

      // TODO: TAblice z wzystkimi mozliwymi opcjami/kategoriami
      questionModal.selectSelfCatIcons = [];
      questionModal.optionsDropdown = [];

      // TODO: Iteruj po tablicy wszystkich kategorii zawartych w pytaniach uzytkownika,
      //      jesli przeslane pytanie zawiera i-ta kategorie, dodaj do "selfCategories" ktory jest modelem dla zaznaczonych pytatn
      // TODO: Jesli chodzi o options, dodaje do obu tablic, poniewaz wyswietla wszystkie aktualne opcje dodane przez usera,
      //       nastepnie mozliwosc odhaczania
      function initIcons() {
        possibleCategories.forEach(function(cat) {
          if(CrudyModel.currentQuestion.selfCategories.indexOf(cat)>-1) {
            questionModal.formQuestion["selfCategories"].push(cat);
          }
          questionModal.selectSelfCatIcons.push({
            value: cat.name,
            label: "> " + cat.name
          });
        });
        CrudyModel.currentQuestion.options.forEach(function(option) {
          questionModal.formQuestion["options"].push(option);
          questionModal.optionsDropdown.push({
            text: option,
            active: true
          });
        })
      }

      // dodaj do aktywnej tablicy do przeslania
      function addOption(optionText) {
        questionModal.formQuestion["options"].push(optionText);
      }

      function detachOption(optionText) {
        var index = questionModal.formQuestion["options"].indexOf(optionText)
        if(index > -1) {
          questionModal.formQuestion["options"].splice(index, 1);
        }
      }

      function resetForm() {
        questionModal.formQuestion.description = ''
        questionModal.formQuestion.selfCategories.length = 0
        questionModal.formQuestion.options.length = 0
      }

      function initForm() {
        if(CrudyModel.currentQuestion) {
          questionModal.formQuestion.description = CrudyModel.currentQuestion["data"].description;
          questionModal.formQuestion.selfCategories = CrudyModel.currentQuestion["data"].selfCategories;
          questionModal.formQuestion.options = CrudyModel.currentQuestion["data"].options;
        }
      }

      questionModal.toggleOptionActivity = function(option) {
        if(!option.hasOwnProperty('active')) {
          option.active = true;
          addOption(option.text)
        }
        else {
          option.active = false;
          detachOption(option.text)
        }
      }

      questionModal.createNewOption = function(isValidOption) {
        // TODO: Tworzy nowa opcje do ikon oraz dodaje do formowych pytan, ustawia jako active
        if(isValidOption) {
          var optionObjectLiteral = {
            active: true,
            text: questionModal.newOption
          }
          questionModal.optionsDropdown.push(optionObjectLiteral);
          addOption(optionObjectLiteral.text);
          questionModal.newOption = '';
        }
      }

      questionModal.finish = function(isValid) {
        if(isValid && questionModal.currentQuestion) {
          CrudyModal.markAsEdited(questionModal.formQuestion);
        }
        else if(isValid && !questionModal.currentQuestion) {
          CrudyModal.appendResource(questionModal.formQuestion);
        }
        // TODO: Sprawdzic czy to zamknie
        this.hide();
        resetForm();
      }

      InitForm();
      initIcons();


      return {
        finish: finish,
        createNewOption: createNewOption,
        toggleOptionActivity: toggleOptionActivity
      }

  }

})();
