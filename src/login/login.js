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

  var login = this,
      formData = {
        email: login.loginForm.email,
        pass: login.loginForm.pass
      }

  login.submit = submit;
  login.reset = reset;

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
  UserModel.login(formData)
  .then(onSuccess)
  .catch(onError)
  .finally(onCompletion)
}
function onCompletion() {
  login.reset();
}
function onError(error) {
  login.error = error.reason;
}
function onSuccess(result) {
  $state.go("boards");
}
  function register() {
    UserModel.register(formData)
      .then(logIn)
      .catch(onError)
      .finally(onCompletion)
  }





}
