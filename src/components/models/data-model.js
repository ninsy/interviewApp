'use strict';

angular
  .module("interview.components")
  .factory("dataModel", dataModel)
  .factory("requestsModel", RequestsModel)

categoriesModel.$inject = ["UserModel", "ngResource", "FIREBASE_URI"];


function dataModel(requestsModel) {

  var service = this;

  service.pickedQuestions = [];


  service.appendQuestion = function(question) {
    service.pickedQuestions.append(question);
  }

  service.detachQuestion = function(question) {
    _.remove(service.pickedQuestions, function(pq) {
      return question === pq;
    })
  }

  service.getQuestion = function(question) {
    return _.find(service.pickedQuestions, function(pq) {
      return question === pq;
    })
  }

  service.questionCount = function() {
    return service.pickedQuestions.length;
  }


  service.isPickedQuestion = function(question) {
    return _.find(service.pickedQuestions, function(q) {
      return q === question;
    })
  };

  service.resetData = function() {
    service.pickedQuestions.length = 0;
  }

  return  {
    appendQuestion: appendQuestion,
    detachQuestion: detachQuestion,
    resetData: resetData
  }

}
