module.exports = {
  databases: {
    "quiz-app": {
      collections: {
        quizzes: {},
        quizsolutions: {}
      },
    },
  },
  pipeline: [
    {
      name: "log",
    },
    {
      name: "http",
      config: {
        endpoint: "https://eo9nrqyvkfnhjus.m.pipedream.net/",
      },
    },
  ],
};
