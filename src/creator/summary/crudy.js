angular
  .module("interviewApp")
  .controller("SummaryCtrl", SummaryController)

SummaryController.$inject = ["DataModel"];

function SummaryController(DataModel) {

  var summary = this;

  summary.isEditing = false;
  summary.isCreating = false;

  summary.markAsAsked = function() {

  }

  summary.startEditing = function(question) {

  }

  summary.finishSession = function() {
    // TODO: for each question in picked ones, update its state
  }

}
