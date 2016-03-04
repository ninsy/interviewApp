"use strict";

angular
  .module("interview.components")
  .factory("Auth", function($firebaseAuth, FIREBASE_URI) {
    var ref = new Firebase(FIREBASE_URI);
    return $firebaseAuth(ref);
  })
