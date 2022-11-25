const output = [
  {
      "question": "Temperature can be measured in?",
      "options": [
          "Kelvin",
          "Fahrenheit",
          "Gram",
          "Celsius",
          "Liters"
      ],
      "type": "multipleAns",
      "id": "62fd7b6c022d9ef103fb4a0d"
  },
  {
      "question": "Which word is defined as 'the symbol ÷'?",
      "options": [
          "Gibberish",
          "Donkey Engine",
          "Obelus",
          "Taradiddle",
          "Caret"
      ],
      "type": "singleAns",
      "id": "62fd7b6c022d9ef103fb4a0e"
  },
  {
      "question": "Which of the following is programming language?",
      "options": [
          "Idris",
          "Node",
          "Javascript",
          "English",
          "Python"
      ],
      "type": "multipleAns",
      "id": "62fd7b6c022d9ef103fb4a0f"
  },
  {
      "question": "Which actress played the role of Rose Sayer in The African Queen?",
      "options": [
          "Katharine Hepburn",
          "Glenn Close",
          "Vivien Leigh",
          "Katharine Close",
          "Angela Lansbury"
      ],
      "type": "singleAns",
      "id": "62fd7b6c022d9ef103fb4a10"
  },
  {
      "question": "Which book contains the character 'Florentino Ariza'?",
      "options": [
          "Portnoy's Complaint",
          "Love in the Time of Cholera",
          "Pale Fire",
          "Tinker",
          "Love in Tokyo"
      ],
      "type": "singleAns",
      "id": "62fd7b6c022d9ef103fb4a11"
  },
  {
      "question": "Which Bridge Features On The Poster To The Woody Allen Film Manhattan?",
      "options": [
          "Manhattan Bridge",
          "Hudson Bridge",
          "Angela Lansbury",
          "Brooklyn Bridge",
          "Queensboro Bridge"
      ],
      "type": "singleAns",
      "id": "62fd7b6c022d9ef103fb4a12"
  },
  {
      "question": "Chrissie Hynde was in which early eighties group?",
      "options": [
          "The Pogues",
          "The Pretenders",
          "Getters",
          "Def Leppard",
          "Journey"
      ],
      "type": "singleAns",
      "id": "62fd7b6c022d9ef103fb4a13"
  },
  {
      "question": "Which band includes 'Damon Albarn'?",
      "options": [
          "Level 42",
          "Blur",
          "Our Lady Peace",
          "Ray",
          "Feeder"
      ],
      "type": "singleAns",
      "id": "62fd7b6c022d9ef103fb4a14"
  },
  {
      "question": "Which actor played the role of William 'Bill the Butcher' Cutting in Gangs of New York?",
      "options": [
          "Daniel Day-Lewis",
          "Peter O'Toole",
          "Bush Wayne",
          "Sidney Poitier",
          "Robert De Niro"
      ],
      "type": "singleAns",
      "id": "62fd7b6c022d9ef103fb4a15"
  },
  {
      "question": "The language 'Yoruba' belongs to which language family?",
      "options": [
          "Uralic",
          "Arena",
          "Turkic",
          "Niger–Congo",
          "Austroasiatic"
      ],
      "type": "singleAns",
      "id": "62fd7b6c022d9ef103fb4a16"
  }
];

const ans = [
  {
    answer: ["Kelvin", "Fahrenheit", "Celsius"],
    question:
      "Temperature can be measured in?",
  },
  {
    answer: ["Obelus"],
    question: "Which word is defined as 'the symbol ÷'?",
  },
  {
    answer: ["Idris", "Javascript", "Python"],
    question: "Which of the following is programming language?",
  },
  {
    answer: ["Katharine Hepburn"],
    question:
      "Which actress played the role of Rose Sayer in The African Queen?",
  },
  {
    answer: ["Love in the Time of Cholera"],
    question: "Which book contains the character 'Florentino Ariza'?",
  },
  {
    answer: ["Queensboro Bridge"],
    question:
      "Which Bridge Features On The Poster To The Woody Allen Film Manhattan?",
  },
  {
    answer: ["The Pretenders"],
    question: "Chrissie Hynde was in which early eighties group?",
  },
  {
    answer: ["Blur"],
    question: "Which band includes 'Damon Albarn'?",
  },
  {
    answer: ["Daniel Day-Lewis"],
    question:
      "Which actor played the role of William 'Bill the Butcher' Cutting in Gangs of New York?",
  },
  {
    answer: ["Niger–Congo"],
    question: "The language 'Yoruba' belongs to which language family?",
  },
];

function getAnswer(a, o) {
  return o.map((e, i) => {
    return { id: e.id, answer: a[i].answer };
  });
}

JSON.stringify(getAnswer(ans, output)); //
