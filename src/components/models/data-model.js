
(function() {
  
  'use strict';

  angular
  .module("interview.components")
  .factory("dataModel", dataModel)

  dataModel.$inject = ["UserModel", "requestUser"];


  function dataModel(UserModel, requestUser) {

    // Sprawdzic jak to jesst instancjonowane, ew. var service - this;
    var data = {};

    data.pickedQuestions = [];
    data.pickedCategories = [];
    data.userData = {};


    // TODO: Czy ta funkcja wewnatrz dziala jak promise?
    data.fetchData = function() {
      requestUser.query({user: UserModel.getCurrentUser}, function(data) {
        // TODO: koniecznie sprawsdzic, w jakim formacie zwroci te dane
        data.userData["userQuestions"] = data[0];
        serice.userData["userCategories"] = data[1];
      });
    }

    data.appendQuestion = function(question) {
      data.pickedQuestions.append(question);
    }

    data.detachQuestion = function(question) {
      _.remove(data.pickedQuestions, function(pq) {
        return question === pq;
      })
    }

    data.getQuestion = function(question) {
      return _.find(data.pickedQuestions, function(pq) {
        return question === pq;
      })
    }

    data.questionCount = function() {
      return data.pickedQuestions.length;
    }


    data.isPickedQuestion = function(question) {
      return _.find(data.pickedQuestions, function(q) {
        return q === question;
      })
    };

    data.resetData = function() {
      data.pickedQuestions.length = 0;
      data.pickedCategories.length = 0;
    }

    return data;

    // Sprawdzic czy tak to dziala poprawnie
    // return  {
    //   fetchData: fetchData,
    //   appendQuestion: appendQuestion,
    //   detachQuestion: detachQuestion,
    //   getQuestion: getQuestion,
    //   questionCount: questionCount,
    //   isPickedQuestion: isPickedQuestion,
    //   resetData: resetData
    // }

  }

}());
