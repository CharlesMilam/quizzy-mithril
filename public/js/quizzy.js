(function () {

  window.QuizzyApp = {}

  //the app
  QuizzyApp.quiz = function(data) {
    this.id = m.prop(data.id)
    this.question = m.prop(data.question)
    this.responses = m.prop(data.responses)
    this.answer = m.prop(data.answer)
  }

  // view-model
  QuizzyApp.vm = (function() {
    var vm = {}

    vm.init = function() {
      // list of questions
      vm.questions = data
    }

    vm.userResponses = []
    vm.user = m.prop("")
    vm.stats = []
    vm.highScore = 0

    vm.checkResponses = function(e) {
      console.log("in check responses")
      console.log(e)
      var correct = 0
      vm.questions.forEach (function (question) {
        vm.userResponses.forEach (function (resp) {
          console.log(question.id)
          console.log(resp.question)
          console.log(question.answer)
          console.log(resp.resp)
          console.log(vm.user())

          if (question.id == resp.question && question.answer == resp.resp) {
            console.log("success")
            correct++
            vm.stats.push({questionId: question.id,
              user: vm.user()
            })
          }
        })
        if (correct > vm.highScore) {
              vm.highScore = correct
          }
        var correctAnswers = vm.generateStats()
        console.log("stats")
        console.log(vm.stats)
        console.log(vm.highScore)
        console.log(correctAnswers)
      })
    }

    vm.generateStats = function() {
      var correctAnswers = vm.stats.length
      return correctAnswers
    }

    return vm
  }())

  // the controller
  QuizzyApp.controller = function() {
    QuizzyApp.vm.init()


  }

  // the view
  QuizzyApp.view = function() {
    return m("html", [
      m("body", [
        //{onchange: m.withAttr("value", todo.vm.description),
        m("input", {id: "userName", placeHolder: "Enter name here", onchange: m.withAttr("value", QuizzyApp.vm.user), value: QuizzyApp.vm.user()}),
        m("br"),
        m("div", QuizzyApp.vm.questions.map(quizView)),
        m("button", {onclick: QuizzyApp.vm.checkResponses.bind(QuizzyApp.vm, "checking responses")}, "Anwer Me!"),
        m("br"),
        m(".statsContainer", [
          m("label", "High Score: "),
          m("label", QuizzyApp.vm.highScore),
          m("br"),
          m("label", "Correct Answers: "),
          m("label", QuizzyApp.vm.generateStats())
        ]) // statsContainer ends
      ]) // body ends
    ]) // html ends

    function quizView (quiz) {
      return [
        m("label", quiz.question),
        quiz.responses.map(function(resp, index) {
          return [
            m("tr", [
              m("td", [
                m("input[type=radio]", {onchange: getResponses.bind(this, {question: quiz.id, resp: index}), name: "response-" + quiz.id, id: quiz.id}),
              ]),
              m("td", [
                m("label", quiz.responses[index])
              ]),
            ]),
          ]
        }),
       m("br")
      ]
    }

    function getResponses (resp) {
      // var userResponses = []
      QuizzyApp.vm.userResponses.push(resp)
      console.log("in get responses")
      console.log(QuizzyApp.vm.userResponses)
    }
  }

  // the data
  var data = [{
              id: 100,
              question: "How much wood would a woodchuck chuck?",
              responses: [
                                  "3",
                                  "42",
                                  "An inordinate amount",
                                  "You woodchucks get away from my wood pile!"
                                  ],
              answer: 1
          },
          {
              id: 101,
              question: "If it looks like a duck, and quacks like a duck?",
              responses: [
                                  "It's a duck",
                                  "Aflac!",
                                  "42",
                                  "You woodchucks get away from my wood pile!"
                                  ],
              answer: 2
          },
          {
              id: 102,
              question: "Knock, knock?",
              responses: [
                                  "42",
                                  "Who's there?",
                                  "Dave?",
                                  "Dave's not here!"
                                  ],
              answer: 0
          },
          {
              id: 103,
              question: "Which is not one of the three laws of robotics?",
              responses: [
                                  "A robot may not injure a human being or, through inaction, allow a human being to come to harm.",
                                  "A robot must obey orders given it by human beings except where such orders would conflict with the First Law.",
                                  "A robot must protect its own existence as long as such protection does not conflict with the First or Second Law.",
                                  "Destroy all humans!"
                                  ],
              answer: 3
          }
      ]
})()