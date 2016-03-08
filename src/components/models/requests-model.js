'use strict';

angular
  .module("interview.components")
  .factory("requestQuestionsService", requestQuestionsService)
  .factory("requestCategoriesService", requestCategoriesService)
  .factory("requestUser", requestUser)

requestUser.$inject = ["ngResource", "FIREBASE_URI"];
requestQuestionsService.$inject = ["ngResource", "FIREBASE_URI"];
requestCategoriesService.$inject = ["ngResource", "FIREBASE_URI"];

function requestUser($resource, FIREBASE_URI) {

  var user = $resource(FIREBASE_URI + "/users/:user" + ".json", {user: '@user'});
  return user;
}

function requestQuestionsService($resource, FIREBASE_URI) {

// TODO: Jak wyglada request bez podania question????
  var questions = $resource(FIREBASE_URI + "/users/:userID/questions/:questionID" + ".json", {userID: '@userID', questionID: "@questionID" }, {
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
