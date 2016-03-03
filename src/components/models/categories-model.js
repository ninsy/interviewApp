'use strict';

angular
  .module("interview.components")
  .service("categoriesModel", categoriesModel)

categoriesModel.$inject = ["$http", "$q", "ngResource", "FIREBASE_URI", "SECRET"];

function categoriesModel($http, $q, $resource, FIREBASE_URI , SECRET) {
  
}
