(function() {

  'use strict';

  angular
  .module("interview.components")
  .factory("DataModel", DataModel)

  DataModel.$inject = ["UserModel", "requestUser"];


  function DataModel(UserModel, requestUser) {

    var data = {
      fetchData: fetchData,
      appendQuestion: appendQuestion,
      detachQuestion: detachQuestion,
      questionCount: questionCount,
      resetData: resetData,
      getPicked: getPicked
    },//  TABLICA UZYWANA JEDYNIE PODCZAS TWORZENIA SESJI ORAZ JEJ TRWANIA
      userData = {
        userCategories: [],
        userQuestions: []
      };

      var pickedQuestions = [];

    return data;

      // USER_DATA - EFEKT PREPARSINGU:
      //
      // {
      //   categories: [
      //     {
      //       marked: true,
      //       id: 14322,
      //       data: {
      //         description: ...
      //       }
      //     }
      //   ],
      //   questions: [
      //     {
      //       marked: true,
      //       id: 1231,
      //       data: {
      //         selfCats: {
      //           id1: true,
      //           id2: false
      //         },
      //         options: [ ... ]
      //       }
      //     },
      //     {
      //       marked: false..
      //       ...
      //     }
      //   ]
      // }
    // RESPONSE:
    // [
    //   {
    //     id1: "algo",
    //     id2: "front",
    //     ...
    //   },
    //   {
    //     id1: { selfCats, desc, ...},
    //     id2: { selfCats, desc, ... }
    //     ...
    //   }
    // ]


    function preParse(responseData) {

      // TODO: Ustawiac klase sygnalizujaca brak danych
      if(responseData === null) {
        return;
      }

      resetFechtedData();

      var userDataObject = responseData[UserModel.getCurrentUser()],
        userFetchedCategories = userDataObject["categories"],
        userFetchedQuestions = userDataObject["questions"],
        newItemTemplate = {
              marked: false,
              id: 0,
              data: {}
        }

        _.forEach(userFetchedCategories, function(categoryData, categoryKeyID) {
          newItemTemplate.id = categoryKeyID;
          newItemTemplate.data = categoryData;
          userData["userCategories"].push(newItemTemplate)
          newItemTemplate = {
                marked: false,
                id: 0,
                data: {}
          }
        })

          _.forEach(userFetchedQuestions, function(questionData, questionKeyID) {
            newItemTemplate.id = questionKeyID;
            newItemTemplate.data = questionData;
            userData["userQuestions"].push(newItemTemplate)
            newItemTemplate = {
                  marked: false,
                  id: 0,
                  data: {}
            }
          });


        return getParsedData();
    }

    function getParsedData() {
      return {
        cats: userData["userCategories"],
        questions: userData["userQuestions"]
      }
    }

    // TODO: Czy ta funkcja wewnatrz dziala jak promise?
    // TODO: koniecznie sprawsdzic, w jakim formacie zwroci te dane - MUSI BYC TABLICA OBIEKTOW


    function fetchData() {
        var req = requestUser.get({user: UserModel.getCurrentUser()});
        return req.$promise.then(preParse);
    }


    function getPicked(question) {
      if(arguments.length === 0) {
        return pickedQuestions;
      }
      else {
        return _.find(pickedQuestions, function(pq) {
          return pq.id === question.id;
        })
      }
     }

    function appendQuestion(question) {
      /// TODO: format picked question: {marked: ..., id: ...., data: ....}
      console.log("got " + question);
      question.marked = true;
      pickedQuestions.push(question);
      console.log("After push: " + pickedQuestions)
    }


    // TODO: ZWERYFIKOWAC POPRAWNE DZIALANIE
    function detachQuestion(question) {
      question.marked = false;
      _.remove(pickedQuestions, function(pq) {
        return question.id === pq.id;
      })
    }

    function questionCount() {
      return pickedQuestions.length;
    }

    // TODO: MARKED STATE USED ONLY FOR UI STUFF
    function resetMarkedState() {
      _.forEach(userData["userQuestions"], function(q) {
        q.marked = false;
      })
    }

    function resetFechtedData() {
      userData.userQuestions.length = 0;
      userData.userCategories.length = 0;
    }

    function resetData(flag) {
      switch(flag) {
        case "LOGOUT":
          resetFechtedData();
          break;
        case "RESET_QUESTIONS":
        case "STATE_CHANGE":
          resetMarkedState()
          break;
      }
    }

  }

}());
