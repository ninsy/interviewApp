"use strict";

angular
  .module("interview.components")
  .service("UserModel", UserModel)

userModel.$inject = ["Auth"];

function UserModel(Auth) {
  var service = this;


    service.currentUser = null;

    service.getCurrentUser = function() {
      return currentUser;
    }

    service.setCurrentUser = function(user) {
      currentUser = user;
    }

    service.login = function(user) {
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

    service.register = function(user) {
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
          return service.login(user.email, user.pass);
        }
      })
    }

    service.logout = function() {
      Auth.$unauth();
      currentUser = null;
    }

    return {
      logout: logout,
      register: register,
      login: login,
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser
    }

}
