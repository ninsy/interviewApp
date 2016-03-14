"use strict";

angular
  .module("interview.components")
  .factory("UserModel", UserModel)

UserModel.$inject = ["Auth", "$state"];

function UserModel(Auth) {


  var service = {
    logout: logout,
    register: register,
    login: login,
    setCurrentUser: setCurrentUser,
    getCurrentUser: getCurrentUser
  },
    currentUser = null;

  return service;


    function getCurrentUser() {
      return currentUser;
    }

    function setCurrentUser(user) {
      currentUser = user;
    }

    function login(user) {
      return Auth.$authWithPassword({
          email: user.email,
          pass: user.pass
        }, function(error, authData) {
        if(error) {
          currentUser = null;
          console.log("Failed to authenticate", error);
          return error;
        }
        else {
          currentUser = authData.uid;
          console.log('Logged as: ', currentUser)
        }
      })
    }

    function register(user) {
      return Auth.$createUser({
          email: user.email,
          pass: user.pass
        }, function(error, authData) {
        if(error) {
          console.log("Failed to register", error);
          return error;
        }
        else {
          console.log('Logged as: ', currentUser)
          return login(user.email, user.pass);
        }
      })
    }

    function logout() {
      Auth.$unauth();
      // TODO: POWODOWALO CIRCULAR DEPENDENCY
      // DataModel.resetData();
      // DataModel.userData = null;
      currentUser = null;
    }

}
