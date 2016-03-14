(function() {
  'use strict';

  angular
    .module('interviewApp')
    .config(loginConfig )
    .controller('LoginCtrl',  loginController);

  loginConfig.$inject = ['$stateProvider'];
  loginController.$inject = ["UserModel", "$state"];

  function loginConfig($stateProvider) {
    $stateProvider
      .state("login", {
        url: "/login",
        templateUrl: "login/login.html",
        controller: "LoginCtrl",
        controllerAs: "login"
      })
  }

  function loginController(UserModel, $state) {

    var login = this;


    login.submit = submit;
    login.reset = reset;
    login.error = '';

    function submit(isValid) {

      if(isValid) {

        if(login.loginForm.register) {
          register();
        }
        else {
          logIn();
        }
      }

    }

    function reset() {
      login.loginForm.email = ''
      login.loginForm.pass = ''
      login.loginForm.register = false;
    }

  ////////////////////////////////////////////////////////////
  function logIn() {

    UserModel.login(login.loginForm)
    .then(onSuccess)
    .catch(onError)
    .finally(onCompletion)
  }
  function onCompletion() {
    login.reset();
  }
  function onError(error) {
    switch(error.code) {
      case "INVALID_USER":
        login.error = "	The specified user account does not exist.";
        break;
      case "INVALID_PASSWORD":
        login.error = "The specified user account password is incorrect."
        break;
      case "EMAIL_TAKEN":
        login.error = "The new user account cannot be created because the specified email address is already in use.";
        break;
      case "NETWORK_ERROR":
        login.error = "An error occurred while attempting to contact the authentication server.";
        break;
    }
    console.log(error.code);
  }
  function onSuccess(result) {
    $state.go("generate");
  }
    function register() {
      UserModel.register(login.loginForm)
        .then(logIn)
        .catch(onError)
        .finally(onCompletion)
    }

  }

}());
