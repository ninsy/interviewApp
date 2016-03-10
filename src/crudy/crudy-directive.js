angular
  .module('interviewApp')
  .directive('categories', categoryDirective)
  .directive('questions', questionsDirective)

categoryDirective.$inject = [];
questionsDirective.$inject = [];

function categoryDirective() {
  return {
    restrict: "E",
    templateUrl: "src/crudy/crudy.categories.html"
  }
}

function questionsDirective() {

}
