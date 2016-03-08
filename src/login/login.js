'use strict';

angular
  .module('interviewApp')
  .config('LoginConfig', loginConfig )
  .controller('LoginCtrl',  loginController);

loginConfig.$inject = ['$stateProvider'];
loginController.$inject = ["UserModel, $state"];

function loginConfig($stateProvider) {
  $stateProvider
    .state("login", {
      url: "/login",
      templateUrl: "./login.js",
      controller: "LoginCtrl",
      controllerAs: "login"
    })
}

function loginController() {
  var login = this;

  var formData = {
    email: login.loginForm.email,
    pass: login.loginForm.pass
  }

  function register() {
    UserModel.register(formData)
      .then(logIn)
      .catch(onError)
      .finally(onCompletion)
  }

  function logIn() {
    UserModel.login(formData)
      .then(onSuccess)
      .catch(onError)
      .finally(onCompletion)
  }

  function onSuccess(result) {
    $state.go("boards");
  }

  function onError(error) {
    login.error = error.reason;
  }

  function onCompletion() {
    login.reset();
  }

  login.submit = function(isValid) {
    if(isValid) {

      if(login.loginForm.register) {
        register();
      }
      else {
        logIn();
      }
    }
  }

  login.reset = function() {
    login.loginForm.email = ''
    login.loginForm.pass = ''
    login.loginForm.register = false;
  }
}
