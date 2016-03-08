'use strict';

angular
  .module("interview.components")
  .factory("dataModel", dataModel)

dataModel.$inject = ["UserModel", "requestUser"];


function dataModel(UserModel, requestUser) {

  var service = this;

  service.pickedQuestions = [];
  service.pickedCategories = [];
  service.userData = {};

  // TODO: Czy ta funkcja wewnatrz dziala jak promise?
  service.fetchData = function() {
    requestUser.query({user: UserModel.getCurrentUser}, function(data) {
      // TODO: koniecznie sprawdzic, w jakim formacie zwroci te dane
      service.userData["userQuestions"] = data[0];
      serice.userData["userCategories"] = data[1];
    });
  }

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
    service.pickedCategories.length = 0;
  }

  return  {
    prepareData: prepareData,
    appendQuestion: appendQuestion,
    detachQuestion: detachQuestion,
    resetData: resetData
  }

}
