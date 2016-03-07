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

  var user = $resource(FIREBASE_URI + "/users/:user", {user: '@user'});
  return user;
}

function requestQuestionsService($resource, FIREBASE_URI) {

  var questions = $resource(FIREBASE_URI + "/users/:user/questions/:question", {user: '@user', question: "@question" }, {
    updateQuestions: {
      method: "PUT"
    }
  });

  return questions;
}

function requestCategoriesService($resource, FIREBASE_URI) {

  var categories = $resource(FIREBASE_URI + "users/:user/categories/:category", {user: "@user", category: "@category"}, {
    updateCategories: {
      method: "PUT"
    }
  });

  return categories;
}
