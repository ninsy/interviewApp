"use strict";

angular
  .module("interview.components")
  .factory("Auth", authFirebase)

authFirebase.$inject = ['$firebaseAuth', 'FIREBASE_URI']

function authFirebase($firebaseAuth, FIREBASE_URI) {

  var ref = new Firebase(FIREBASE_URI);
  return $firebaseAuth(ref);
  
}
