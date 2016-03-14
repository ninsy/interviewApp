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
      getQuestion: getQuestion,
      resetData: resetData
    },
      pickedQuestions = [],  //  TABLICA UZYWANA JEDYNIE PODCZAS TWORZENIA SESJI ORAZ JEJ TRWANIA
      userData = {
        userCategories: [],
        userQuestions: []
      };

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


    // TODO: Upewnic sie kolejnosci zwracania, czy zawsze zwraca tak samo
    function preParse(responseData) {
      var fetchedQuestions = responseData[1],
          fetchedCategories = responseData[0],
          newItemTemplate = {
                marked: false,
                id: 0,
                data: {}
          }

          _.forEach(fetchedQuestions, function(questionData, questionKeyID) {
            newItemTemplate.id = questionKeyID;
            newItemTemplate.data = questionData;
            userData["userQuestions"].push(newItemTemplate)
          });

          _.forEach(fetchedCategories, function(categoryData, categoryKeyID) {
            newItemTemplate.id = categoryKeyID;
            newItemTemplate.data = categoryData;
            userData["userCategories"].push(newItemTemplate)
          })
    }


    // TODO: Czy ta funkcja wewnatrz dziala jak promise?
    // TODO: koniecznie sprawsdzic, w jakim formacie zwroci te dane - MUSI BYC TABLICA OBIEKTOW


    // TODO: TUTAJ SIE SYPIE!!!
    function fetchData() {
      var req = requestUser.query({user: UserModel.getCurrentUser()});
      req.$promise.then(preParse);
    }

    function appendQuestion(question) {
      /// TODO: format picked question: {marked: ..., id: ...., data: ....}
      question.marked = true;
      pickedQuestions.append(question);
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

    function getQuestion(question) {
      return _.find(pickedQuestions, function(pq) {
        return question.id === pq.id;
      })
    }

    function resetData() {
      pickedQuestions.length = 0;
    }

  }

}());
