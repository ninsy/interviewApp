(function() {
  'use strict';

  angular
    .module("interview.components")
    .factory("requestUser", requestUser)
    .factory("requestQuestionsService", requestQuestionsService)
    .factory("requestCategoriesService", requestCategoriesService)

  requestUser.$inject = ["$resource", "FIREBASE_URI"];
  requestQuestionsService.$inject = ["$resource", "FIREBASE_URI"];
  requestCategoriesService.$inject = ["$resource", "FIREBASE_URI"];

  function requestUser($resource, FIREBASE_URI) {

    var user = $resource(FIREBASE_URI + "users/:userID" + ".json", {userID: '@userID'});
    return user;
  }

  function requestQuestionsService($resource, FIREBASE_URI) {

  // TODO: Jak wyglada request bez podania question????
    var questions = $resource(FIREBASE_URI + "users/:userID/questions/:questionID" + ".json", {userID: '@userID', questionID: "@questionID" }, {
      updateQuestion: {
        method: "PUT",
        url: FIREBASE_URI + "users/:user/questions/:questionID" + ".json"
      },

    });

    return questions;
  }

  function requestCategoriesService($resource, FIREBASE_URI) {

    var categories = $resource(FIREBASE_URI + "users/:userID/categories/:categoryID" + ".json", {user: "@userID", category: "@categoryID"}, {
      updateCategory: {
        method: "PUT",
        url: FIREBASE_URI + "users/:user/categories/:categoryID" + ".json"
      }
    });

    return categories;
  }

}());
