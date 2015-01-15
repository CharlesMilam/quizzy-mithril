(function () {

  window.QuizzyApp = {}

  // view-model
  QuizzyApp.vm = (function() {
    var vm = {}

    vm.init = function() {
      // list of quizzes
      vm.quizzes = m.prop(quizzes[0])
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
          m("div", [
            m("label", QuizzyApp.vm.quizzes().question),
            m("br"),
            m("div", [
              QuizzyApp.vm.quizzes().responses.map(function(resp, index) {
                return m("tr", [
                    m("td", [
                      m("input[type=radio]", {checked: false}),
                    ]),
                    m("td", [
                      m("label", QuizzyApp.vm.quizzes().responses[index])
                    ]),
                  ])
              })
            ] )
          ])
        ])
      ])
  }

  // the data
  var quizzes = [{
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