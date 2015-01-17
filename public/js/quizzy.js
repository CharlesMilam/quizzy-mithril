(function () {
  // the app
  window.QuizzyApp = {}

  //a question
  QuizzyApp.question = function(data) {
    this.id = m.prop(data.id)
    this.question = m.prop(data.question)
    this.responses = m.prop(data.responses)
    this.answer = m.prop(data.answer)
  }

  // various properties needed for stats 
  QuizzyApp.stats = function(args) {
    this.user = m.prop(args.user)
    this.userResponses = m.prop(args.userResponses)
    this.corrects = m.prop(args.corrects)
    this.highScore = m.prop(args.highScore)
  }

  // view-model
  QuizzyApp.vm = (function() {
    var vm = {}

    vm.init = function() {
      // list of questions
      vm.questions = data
      // quiz stats
      vm.stats = new QuizzyApp.stats({userResponses: [], user: "", corrects: [], highScore: 0})
    }

    // determine correct answers based on user's responses
    vm.checkResponses = function(e) {
      var correct = 0
      // TODO: refactor to use map and reduce
      vm.questions.forEach (function (question) {
        vm.stats.userResponses().forEach (function (resp) {
          if (question.id == resp.question && question.answer == resp.resp) {
            console.log("success")
            correct++
            vm.stats.corrects().push(
              {
                questionId: question.id,
                user: vm.stats.user()
              }
            )
          }
        })
        // is the number correct a new high score
        if (correct > vm.stats.highScore()) {
          vm.stats.highScore(correct)
        }
        // generate the stats
        var correctAnswers = vm.generateStats()
      })
      // reset quiz values for next round TODO: make it work
      //vm.resetQuiz()
    }
    // generates stats
    vm.generateStats = function() {
      return vm.stats.corrects().length
    }
    // resets the quiz
    vm.resetQuiz = function() {
      console.log("in reset")
      vm.user("")
      vm.userResponses = []
      vm.stats = []
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
        //m("input", {onchange: m.withAttr("value", todo.vm.description), value: todo.vm.description()})
        m("input", {id: "userName", placeHolder: "Enter name here", onchange: m.withAttr("value", QuizzyApp.vm.stats.user), value: QuizzyApp.vm.stats.user()}),
        m("br"),
        m("div", QuizzyApp.vm.questions.map(quizView)),
        m("button", {onclick: QuizzyApp.vm.checkResponses.bind(QuizzyApp.vm, "checking responses")}, "Anwer Me!"),
        m("br"),
        m(".statsContainer", [
          m("label", "High Score: "),
          m("label", QuizzyApp.vm.stats.highScore()),
          m("br"),
          m("label", "Correct Answers: "),
          m("label", QuizzyApp.vm.generateStats())
        ]) // statsContainer ends
      ]) // body ends
    ]) // html ends

    // helper function to generate a question and its responses
    function quizView (question) {
      return [
        m("label", question.question),
        question.responses.map(function(resp, index) {
          return [
            m("tr", [
              m("td", [
                m("input[type=radio]", {onchange: getResponses.bind(this, {question: question.id, resp: index}), name: "response-" + question.id, id: question.id}),
              ]),
              m("td", [
                m("label", question.responses[index])
              ]),
            ]),
          ]
        }),
       m("br")
      ]
    }

    // helper function to gather user's responses
    function getResponses (resp) {
      QuizzyApp.vm.stats.userResponses().push(resp)
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