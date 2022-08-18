export default {
  user1: {
    email: "esmart234@yahoo.com",
    password: "Skiddo1234#$",
    confirmPassword: "Skiddo1234#$",
  },
  user2: {
    email: "esmart234@gmail.com",
    password: "Skiddo1234#$",
    confirmPassword: "Skiddo1234#$",
  },
  edit: {
    question: "Temperature can be measured in?",
    options: ["Kelvin", "Fahrenheit", "Gram", "Celsius", "Liters"],
    answer: ["Kelvin", "Fahrenheit", "Celsius"],
    type: "multipleAns",
  },
  emptyString: {
    question: "Temperature can be measured in?",
    options: ["", "Fahrenheit", "Gram", "Celsius", "Kelvin"],
    answer: ["Kelvin", "Fahrenheit", "Celsius"],
    type: "multipleAns",
  },
  unUniqueOpts: {
    question: "Temperature can be measured in?",
    options: ["Kelvin", "Fahrenheit", "Gram", "Celsius", "Celsius"],
    answer: ["Kelvin", "Fahrenheit", "Celsius"],
    type: "multipleAns",
  },
  unUniqueAns: {
    question: "Temperature can be measured in?",
    options: ["Kelvin", "Fahrenheit", "Gram", "Celsius", "Liters"],
    answer: ["Kelvin", "Kelvin", "Celsius"],
    type: "multipleAns",
  },
  lessOpts: {
    question: "Temperature can be measured in?",
    options: ["Celsius", "Liters"],
    answer: ["Kelvin", "Fahrenheit", "Celsius"],
    type: "multipleAns",
  },
  badType: {
    question: "Temperature can be measured in?",
    options: ["Kelvin", "Fahrenheit", "Gram", "Celsius", "Liters"],
    answer: ["Kelvin", "Fahrenheit", "Celsius"],
    type: "singleAns",
  },
  quiz: {
    title: "first test quiz",
    questions: [
      {
        answer: ["René Descartes"],
        options: [
          "Baruch Spinoza",
          "Denis Diderot",
          "René Descartes",
          "Andre Descartes",
          "George Diderot",
        ],
        question:
          "Which philosopher famously said 'One cannot conceive anything so strange and so implausible that it has not already been said by one philosopher or another'?",
        type: "singleAns",
      },
      {
        answer: ["Obelus"],
        options: [
          "Gibberish",
          "Donkey Engine",
          "Obelus",
          "Taradiddle",
          "Caret",
        ],
        question: "Which word is defined as 'the symbol ÷'?",
        type: "singleAns",
      },
      {
        answer: ["English", "Node"],
        options: ["Idris", "English", "Javascript", "Node", "Python"],
        question: "Which of these is not a programming language?",
        type: "multipleAns",
      },
      {
        answer: ["Katharine Hepburn"],
        options: [
          "Katharine Hepburn",
          "Glenn Close",
          "Vivien Leigh",
          "Katharine Close",
          "Angela Lansbury",
        ],
        question:
          "Which actress played the role of Rose Sayer in The African Queen?",
        type: "singleAns",
      },
      {
        answer: ["Love in the Time of Cholera"],
        options: [
          "Portnoy's Complaint",
          "Love in the Time of Cholera",
          "Pale Fire",
          "Tinker",
          "Love in Tokyo",
        ],
        question: "Which book contains the character 'Florentino Ariza'?",
        type: "singleAns",
      },
      {
        answer: ["Queensboro Bridge"],
        options: [
          "Manhattan Bridge",
          "Hudson Bridge",
          "Angela Lansbury",
          "Brooklyn Bridge",
          "Queensboro Bridge",
        ],
        question:
          "Which Bridge Features On The Poster To The Woody Allen Film Manhattan?",
        type: "singleAns",
      },
      {
        answer: ["The Pretenders"],
        options: [
          "The Pogues",
          "The Pretenders",
          "Getters",
          "Def Leppard",
          "Journey",
        ],
        question: "Chrissie Hynde was in which early eighties group?",
        type: "singleAns",
      },
      {
        answer: ["Blur"],
        options: ["Level 42", "Blur", "Our Lady Peace", "Ray", "Feeder"],
        question: "Which band includes 'Damon Albarn'?",
        type: "singleAns",
      },
      {
        answer: ["Daniel Day-Lewis"],
        options: [
          "Daniel Day-Lewis",
          "Peter O'Toole",
          "Bush Wayne",
          "Sidney Poitier",
          "Robert De Niro",
        ],
        question:
          "Which actor played the role of William 'Bill the Butcher' Cutting in Gangs of New York?",
        type: "singleAns",
      },
      {
        answer: ["Niger–Congo"],
        options: ["Uralic", "Arena", "Turkic", "Niger–Congo", "Austroasiatic"],
        question: "The language 'Yoruba' belongs to which language family?",
        type: "singleAns",
      },
    ],
  },
  solution: {
    solution: [
      {
        answer: [""],
        id: "62fa33c0deb8ba88afdbb2f8",
      },
      {
        answer: ["Obelus"],
        id: "62fa33c0deb8ba88afdbb2f9",
      },
      {
        answer: ["English", "Node"],
        id: "62fa33c0deb8ba88afdbb2fa",
      },
      {
        answer: ["Katharine Hepburn"],
        id: "62fa33c0deb8ba88afdbb2fb",
      },
      {
        answer: ["Love in the Time of Cholera"],
        id: "62fa33c0deb8ba88afdbb2fc",
      },
      {
        answer: ["Queensboro Bridge"],
        id: "62fa33c0deb8ba88afdbb2fd",
      },
      {
        answer: ["The Pretenders"],
        id: "62fa33c0deb8ba88afdbb2fe",
      },
      {
        answer: ["Blur"],
        id: "62fa33c0deb8ba88afdbb2ff",
      },
      {
        answer: ["Daniel Day-Lewis"],
        id: "62fa33c0deb8ba88afdbb300",
      },
      {
        answer: ["Niger–Congo"],
        id: "62fa33c0deb8ba88afdbb301",
      },
    ],
  },
};
